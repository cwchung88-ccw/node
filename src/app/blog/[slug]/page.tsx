import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostData, getSortedPostsData } from "../../../lib/posts";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  if (posts.length === 0) {
    return [{ slug: "initial-empty-post" }];
  }
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#A5C3F9]/20 via-[#E9F0FD] to-[#D5E1F9]/30 text-neutral-800 font-sans selection:bg-blue-100 pb-16">
      {/* 1. 상단 미니 포털 헤더 */}
      <header className="bg-white/85 backdrop-blur-md border-b border-neutral-200/50 sticky top-0 z-50 py-3.5 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 1.62-.51 3.12-1.38 4.39z" fill="#0078D4"/>
            </svg>
            <span className="text-lg font-black tracking-tight text-neutral-900">
              seongnam<span className="text-blue-600 font-medium">start</span>
            </span>
          </Link>

          <Link
            href="/blog"
            className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors duration-200 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-2 rounded-full shadow-sm"
          >
            &larr; 블로그 목록으로 돌아가기
          </Link>
        </div>
      </header>

      {/* 2. 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-3xl border border-neutral-200/50 shadow-md p-6 md:p-10 space-y-6">
          {/* 포스트 메타 */}
          <div className="space-y-3 border-b border-neutral-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {post.category}
              </span>
              <span className="text-xs font-bold text-neutral-400">
                {post.date}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex gap-1.5 pt-1">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* 블로그 본문 (Markdown Rendering with Prose) */}
          <div className="prose prose-neutral max-w-none leading-relaxed text-sm md:text-base text-neutral-700 font-medium">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* 목록으로 돌아가기 버튼 */}
          <div className="pt-6 border-t border-neutral-100 flex justify-end">
            <Link
              href="/blog"
              className="py-3 px-8 text-center text-sm font-bold text-neutral-500 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors duration-300 shadow-sm"
            >
              목록으로
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
