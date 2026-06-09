export const dynamic = "force-static";

import Link from "next/link";

export default function AboutPage() {
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

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors duration-200 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-2 rounded-full shadow-sm"
            >
              블로그
            </Link>
            <Link
              href="/"
              className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors duration-200 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-2 rounded-full shadow-sm"
            >
              &larr; 포털 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </header>

      {/* 2. 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-neutral-200/50 shadow-md p-8 md:p-12 space-y-10">
          
          {/* 타이틀 영역 */}
          <div className="text-center space-y-3 pb-8 border-b border-neutral-100">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold">
              <span>서비스 소개</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
              seongnam<span className="text-blue-600 font-semibold">start</span>를 소개합니다
            </h1>
            <p className="text-sm md:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed">
              성남시 및 경기도의 실시간 행사, 혜택, 복지 지원금 정보를 투명하고 빠르게 전달하는 커뮤니티형 포털 서비스입니다.
            </p>
          </div>

          {/* 본문 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 운영 목적 */}
            <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 space-y-3">
              <div className="text-3xl">🏠</div>
              <h3 className="text-lg font-extrabold text-neutral-900">지역 주민 생활 정보</h3>
              <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-medium">
                성남시 주민과 경기도민을 위한 실생활 밀착형 혜택, 행사, 복지 정보를 편리하게 수집하여 한눈에 볼 수 있도록 구성했습니다.
              </p>
            </div>

            {/* 데이터 출처 */}
            <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 space-y-3">
              <div className="text-3xl">🗄️</div>
              <h3 className="text-lg font-extrabold text-neutral-900">공공데이터포털 연동</h3>
              <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-medium">
                대한민국 공공데이터포털(data.go.kr)에서 제공하는 신뢰성 있는 공공서비스 API를 주기적으로 호출하여 최신 행정 및 지원 정보를 가져옵니다.
              </p>
            </div>

            {/* AI 콘텐츠 생성 */}
            <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-100/50 space-y-3">
              <div className="text-3xl">🤖</div>
              <h3 className="text-lg font-extrabold text-neutral-900">AI 콘텐츠 가공</h3>
              <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-medium">
                복잡한 공공서비스 정보를 사용자가 직관적으로 이해할 수 있도록 인공지능(AI) 기술을 통해 친근하고 명확한 어조의 블로그 글로 요약 및 생성합니다.
              </p>
            </div>

          </div>

          {/* 안내 및 고지사항 */}
          <div className="bg-neutral-50 rounded-2xl border border-neutral-200/60 p-6 space-y-4">
            <h4 className="text-sm font-bold text-neutral-800 flex items-center gap-1.5">
              <span>⚠️ 이용 시 유의사항</span>
            </h4>
            <ul className="text-xs md:text-sm text-neutral-600 space-y-2 list-disc list-inside leading-relaxed font-medium">
              <li>본 사이트의 블로그 콘텐츠는 인공지능(AI) 모델을 기반으로 자동 요약 및 편집되어 발행됩니다.</li>
              <li>데이터의 수집 시점 및 공공기관의 정책 변화에 따라 지원 조건이나 행사 세부 사항이 달라질 수 있습니다.</li>
              <li>중요한 신청이나 참여 전에는 제공된 원문 링크 및 소관 기관의 공식 안내를 반드시 재확인하시길 권장합니다.</li>
            </ul>
          </div>

          {/* 하단 단추 */}
          <div className="pt-6 border-t border-neutral-100 flex justify-center">
            <Link
              href="/"
              className="py-3.5 px-10 text-center text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors duration-300 shadow-md shadow-blue-500/20"
            >
              포털 메인으로 이동
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
