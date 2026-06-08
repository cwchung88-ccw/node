const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

async function main() {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    console.error("Error: GEMINI_API_KEY is not defined in environment variables.");
    process.exit(1);
  }

  const localInfoPath = path.join(process.cwd(), "public/data/local-info.json");
  if (!fs.existsSync(localInfoPath)) {
    console.error("Error: local-info.json does not exist.");
    process.exit(1);
  }

  let localData;
  try {
    localData = JSON.parse(fs.readFileSync(localInfoPath, "utf8"));
  } catch (err) {
    console.error("Error parsing local-info.json:", err);
    process.exit(1);
  }

  const items = localData.items || [];
  if (items.length === 0) {
    console.log("등록된 공공서비스 정보가 없습니다.");
    return;
  }

  // [1단계] 최신 데이터 확인
  const targetItem = items[items.length - 1];
  const targetTitle = (targetItem.name || targetItem.title || "").trim();

  if (!targetTitle) {
    console.error("Error: 최신 항목에 name 또는 title 정보가 없습니다.");
    process.exit(1);
  }

  const postsDir = path.join(process.cwd(), "src/content/posts");
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const fileNames = fs.readdirSync(postsDir);
  let alreadyExists = false;

  for (const fileName of fileNames) {
    if (fileName.endsWith(".md")) {
      const fullPath = path.join(postsDir, fileName);
      try {
        const fileContent = fs.readFileSync(fullPath, "utf8");
        const parsed = matter(fileContent);
        const postTitle = (parsed.data.title || "").trim();
        if (postTitle === targetTitle) {
          alreadyExists = true;
          break;
        }
      } catch (err) {
        console.error(`Error reading or parsing post file ${fileName}:`, err);
      }
    }
  }

  if (alreadyExists) {
    console.log("이미 작성된 글입니다");
    return;
  }

  // [2단계] Gemini AI로 블로그 글 생성
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;

  const prompt = `아래 공공서비스 정보를 바탕으로 블로그 글을 작성해줘.

정보: ${JSON.stringify(targetItem, null, 2)}

아래 형식으로 출력해줘. 반드시 이 형식만 출력하고 다른 텍스트는 없이:
---
title: (친근하고 흥미로운 제목)
date: ${todayStr}
summary: (한 줄 요약)
category: 정보
tags: [태그1, 태그2, 태그3]
---

(본문: 800자 이상, 친근한 블로그 톤, 추천 이유 3가지 포함, 신청 방법 안내)

마지막 줄에 FILENAME: ${todayStr}-keyword 형식으로 파일명도 출력해줘. 키워드는 영문으로.`;

  let geminiOutputText = "";
  try {
    const res = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to call Gemini API: HTTP ${res.status}`);
    }

    const resJson = await res.json();
    geminiOutputText = resJson.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (err) {
    console.error("Error generating content from Gemini:", err);
    process.exit(1);
  }

  let text = geminiOutputText.trim();

  // FILENAME 추출
  const filenameMatch = text.match(/FILENAME:\s*([^\s\n\r]+)/i);
  let filename = "";
  if (filenameMatch) {
    filename = filenameMatch[1].trim();
    if (!filename.endsWith(".md")) {
      filename += ".md";
    }
    // Content에서 FILENAME 라인 제거
    text = text.replace(/FILENAME:\s*[^\n\r]+/gi, "");
  } else {
    filename = `${todayStr}-public-service.md`;
  }

  // Markdown 코드 블록 기호 제거
  let postContent = text.trim();
  if (postContent.startsWith("```")) {
    postContent = postContent.replace(/^```[a-zA-Z]*\n/, "").replace(/\n```$/, "");
  }
  postContent = postContent.trim();

  // [3단계] 파일 저장
  const finalPath = path.join(postsDir, filename);

  try {
    fs.writeFileSync(finalPath, postContent, "utf8");
    console.log(`성공적으로 블로그 글 생성 및 저장 완료: ${filename}`);
  } catch (err) {
    console.error("Error writing blog post file:", err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});
