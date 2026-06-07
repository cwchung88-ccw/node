import Link from "next/link";
import { getSortedPostsData } from "../../lib/posts";

export default function BlogList() {
  const posts = getSortedPostsData();

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
            href="/"
            className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors duration-200 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-2 rounded-full shadow-sm"
          >
            &larr; 포털 홈으로 돌아가기
          </Link>
        </div>
      </header>

      {/* 2. 메인 영역 */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="space-y-6">
          <div className="border-b border-neutral-200 pb-5">
            <h1 className="text-3xl font-extrabold text-neutral-900">블로그</h1>
            <p className="text-sm text-neutral-500 mt-1.5 font-medium">성남시와 관련된 다양한 소식과 이야기를 전합니다.</p>
          </div>

          {posts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-md p-12 text-center">
              <span className="text-4xl">✍️</span>
              <h3 className="text-base font-bold text-neutral-700 mt-4">등록된 블로그 글이 없습니다.</h3>
              <p className="text-xs text-neutral-400 mt-1 font-medium">src/content/posts 폴더 아래에 .md 파일을 추가해 주세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="group bg-white border border-neutral-200/50 rounded-2xl p-5 flex flex-col justify-between shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="space-y-3 flex-1 flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                      <span className="text-xs font-bold text-neutral-400">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-neutral-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed font-medium mt-1 flex-1">
                      {post.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-neutral-400 text-xs font-semibold">
                    <div className="flex gap-1 flex-wrap">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-blue-600 group-hover:translate-x-1 transition-transform font-bold flex items-center gap-0.5">
                      더 보기 &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
