const fs = require("fs");
const path = require("path");

async function main() {
  const publicDataApiKey = process.env.PUBLIC_DATA_API_KEY;
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!publicDataApiKey) {
    console.error("Error: PUBLIC_DATA_API_KEY is not defined in environment variables.");
    process.exit(1);
  }
  if (!geminiApiKey) {
    console.error("Error: GEMINI_API_KEY is not defined in environment variables.");
    process.exit(1);
  }

  const localInfoPath = path.join(process.cwd(), "public/data/local-info.json");
  let localData = { lastUpdated: "", items: [] };

  try {
    if (fs.existsSync(localInfoPath)) {
      localData = JSON.parse(fs.readFileSync(localInfoPath, "utf8"));
    }
  } catch (err) {
    console.error("Error reading local-info.json:", err);
    process.exit(1);
  }

  // 1단계: 공공데이터포털 API에서 데이터 가져오기
  const publicDataUrl = `https://api.odcloud.kr/api/gov24/v3/serviceList?page=1&perPage=20&returnType=JSON&serviceKey=${encodeURIComponent(publicDataApiKey)}`;

  let apiData;
  try {
    const res = await fetch(publicDataUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch public data: HTTP ${res.status}`);
    }
    apiData = await res.json();
  } catch (err) {
    console.error("Error fetching public data:", err);
    process.exit(1);
  }

  const items = apiData.data || [];
  if (items.length === 0) {
    console.log("공공데이터 결과가 비어 있습니다.");
    return;
  }

  // 필터링
  // 1. 서비스명, 서비스목적요약, 지원대상, 소관기관명 중 "성남" 포함 항목
  let filtered = items.filter((item) => {
    const fields = ["서비스명", "서비스목적요약", "지원대상", "소관기관명"];
    return fields.some((f) => item[f] && String(item[f]).includes("성남"));
  });

  // 2. "성남" 없으면 "경기" 포함 항목
  if (filtered.length === 0) {
    filtered = items.filter((item) => {
      const fields = ["서비스명", "서비스목적요약", "지원대상", "소관기관명"];
      return fields.some((f) => item[f] && String(item[f]).includes("경기"));
    });
  }

  // 3. "경기"도 없으면 전체 데이터 사용
  if (filtered.length === 0) {
    filtered = items;
  }

  // 2단계: 기존 데이터와 비교
  const existingNames = new Set(
    localData.items.map((item) => (item.name || item.title || "").trim())
  );

  const newItems = filtered.filter((item) => {
    const name = (item["서비스명"] || "").trim();
    return name && !existingNames.has(name);
  });

  if (newItems.length === 0) {
    console.log("새로운 데이터가 없습니다");
    return;
  }

  // 새 항목 1개 선택
  const targetItem = newItems[0];

  // 3단계: Gemini AI로 새 항목 1개만 가공
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;

  const prompt = `아래 공공데이터 1건을 분석해서 JSON 객체로 변환해줘. 형식:
{id: 숫자, name: 서비스명, category: '행사' 또는 '혜택', startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD', location: 장소 또는 기관명, target: 지원대상, summary: 한줄요약, link: 상세URL}
category는 내용을 보고 행사/축제면 '행사', 지원금/서비스면 '혜택'으로 판단해.
startDate가 없으면 오늘 날짜, endDate가 없으면 '상시'로 넣어.
반드시 JSON 객체만 출력해. 다른 텍스트 없이.

공공데이터:
${JSON.stringify(targetItem, null, 2)}`;

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

  let cleanedJsonText = geminiOutputText.trim();
  if (cleanedJsonText.startsWith("```")) {
    cleanedJsonText = cleanedJsonText.replace(/^```[a-zA-Z]*\n/, "").replace(/\n```$/, "");
  }
  cleanedJsonText = cleanedJsonText.trim();

  let processedItem;
  try {
    processedItem = JSON.parse(cleanedJsonText);
  } catch (err) {
    console.error("Failed to parse Gemini output as JSON. Output was:", geminiOutputText);
    process.exit(1);
  }

  // 기존 구조 호환을 위한 필드 추가 (Next.js 렌더링 지원)
  if (processedItem.name && !processedItem.title) {
    processedItem.title = processedItem.name;
  }
  if (processedItem.link && !processedItem.url) {
    processedItem.url = processedItem.link;
  }

  // 4단계: 기존 데이터에 추가
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  localData.lastUpdated = `${year}-${month}-${day}`;

  localData.items.push(processedItem);

  try {
    fs.writeFileSync(localInfoPath, JSON.stringify(localData, null, 2), "utf8");
    console.log(`성공적으로 추가 완료: ${processedItem.name || processedItem.title}`);
  } catch (err) {
    console.error("Error writing updated local-info.json:", err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});
