import Link from "next/link";
import localData from "../../public/data/local-info.json";
import AdBanner from "../components/AdBanner";

interface InfoItem {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  target: string;
  summary: string;
  url: string;
}

export default function Home() {
  const items = localData.items as InfoItem[];
  const lastUpdated = localData.lastUpdated;

  // 개별 아이템 매핑
  const event1 = items.find((x) => x.id === "event-1") || items[0];
  const event2 = items.find((x) => x.id === "event-2") || items[1];
  const event3 = items.find((x) => x.id === "event-3") || items[2];
  const benefit1 = items.find((x) => x.id === "benefit-1") || items[3];
  const benefit2 = items.find((x) => x.id === "benefit-2") || items[4];

  // 날짜 포맷팅 함수 (2026-04-05 -> 4월 5일)
  const formatDate = (dateStr: string) => {
    const [_, month, day] = dateStr.split("-");
    return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  };

  // 날짜 범위 표시 함수
  const formatPeriod = (start: string, end: string) => {
    if (start === end) {
      return formatDate(start);
    }
    return `${formatDate(start)} ~ ${formatDate(end)}`;
  };

  const event1Schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event1.title,
    "startDate": event1.startDate,
    "endDate": event1.endDate,
    "location": {
      "@type": "Place",
      "name": event1.location
    },
    "description": event1.summary
  };

  const event2Schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event2.title,
    "startDate": event2.startDate,
    "endDate": event2.endDate,
    "location": {
      "@type": "Place",
      "name": event2.location
    },
    "description": event2.summary
  };

  const event3Schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event3.title,
    "startDate": event3.startDate,
    "endDate": event3.endDate,
    "location": {
      "@type": "Place",
      "name": event3.location
    },
    "description": event3.summary
  };

  const benefit1Schema = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": benefit1.title,
    "description": benefit1.summary,
    "provider": {
      "@type": "GovernmentOrganization",
      "name": benefit1.location
    }
  };

  const benefit2Schema = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    "name": benefit2.title,
    "description": benefit2.summary,
    "provider": {
      "@type": "GovernmentOrganization",
      "name": benefit2.location
    }
  };

  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const hasAdsense = adsenseId && adsenseId !== "나중에_입력";

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#A5C3F9]/20 via-[#E9F0FD] to-[#D5E1F9]/30 text-neutral-800 font-sans selection:bg-blue-100 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(event1Schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(event2Schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(event3Schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(benefit1Schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(benefit2Schema) }}
      />
      
      {/* 1. 최상단 검색창 및 날씨 영역 */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 flex flex-col items-center gap-6 relative">
        {/* 둥근 검색바 */}
        <div className="w-full max-w-[650px] bg-white hover:bg-white/95 transition-all duration-200 shadow-md hover:shadow-lg rounded-full px-5 py-3.5 flex items-center justify-between border border-neutral-200/50">
          <div className="flex items-center gap-3.5 w-full">
            {/* 돋보기 아이콘 */}
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="성남시 생활정보 검색" 
              className="bg-transparent border-none outline-none w-full text-sm text-neutral-700 placeholder-neutral-400 font-medium"
            />
          </div>
          <div className="flex items-center gap-4 pl-3 border-l border-neutral-200">
            {/* 마이크 아이콘 */}
            <svg className="w-5 h-5 text-neutral-500 hover:text-neutral-700 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            {/* 코파일럿 모양 인공지능 아이콘 */}
            <div className="w-5 h-5 cursor-pointer bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold hover:scale-105 transition-transform duration-200">
              C
            </div>
          </div>
        </div>

        {/* 오른쪽 미니 날씨 칩 */}
        <div className="absolute right-4 top-10 hidden md:flex items-center gap-2.5 bg-white/70 backdrop-blur-md border border-white/80 py-1.5 px-4 rounded-full shadow-sm">
          <span className="text-xs font-bold text-neutral-600">성남시 분당구</span>
          <span className="text-xs font-black text-neutral-800">18°C</span>
          <span className="text-sm">☀️</span>
        </div>
      </div>

      {/* 2. 메인 MSN 스타일 콘텐츠 박스 */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl border border-white/60 shadow-lg p-6 md:p-8 space-y-6">
          
          {/* MSN 헤더 메뉴바 */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
            <div className="flex items-center gap-6">
              {/* 로고 */}
              <div className="flex items-center gap-2 cursor-pointer">
                {/* 나비 날개 형상의 SVG */}
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 1.62-.51 3.12-1.38 4.39z" fill="#0078D4"/>
                </svg>
                <span className="text-xl font-black tracking-tight text-neutral-900">
                  seongnam<span className="text-blue-600 font-medium">start</span>
                </span>
              </div>

              {/* 탭 네비게이션 */}
              <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                <span className="px-3.5 py-1.5 text-xs font-bold bg-blue-100 text-blue-700 rounded-full cursor-pointer shrink-0">발견하기</span>
                <span className="px-3.5 py-1.5 text-xs font-semibold text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 rounded-full cursor-pointer shrink-0 transition-colors duration-150">행사/축제</span>
                <span className="px-3.5 py-1.5 text-xs font-semibold text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 rounded-full cursor-pointer shrink-0 transition-colors duration-150">지원금/혜택</span>
                <span className="px-3.5 py-1.5 text-xs font-semibold text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 rounded-full cursor-pointer shrink-0 transition-colors duration-150">일자리/교육</span>
                <span className="px-3.5 py-1.5 text-xs font-semibold text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 rounded-full cursor-pointer shrink-0 transition-colors duration-150">날씨</span>
                <span className="px-3.5 py-1.5 text-xs font-semibold text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 rounded-full cursor-pointer shrink-0 transition-colors duration-150">시정소식</span>
                <Link href="/blog" className="px-3.5 py-1.5 text-xs font-semibold text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 rounded-full cursor-pointer shrink-0 transition-colors duration-150">블로그</Link>
                <Link href="/about" className="px-3.5 py-1.5 text-xs font-semibold text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 rounded-full cursor-pointer shrink-0 transition-colors duration-150">소개</Link>
              </nav>
            </div>

            {/* 피드 레이아웃 설정 버튼 */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button className="px-3.5 py-1.5 border border-neutral-200 hover:bg-neutral-50 rounded-full text-xs font-bold text-neutral-600 flex items-center gap-1.5 cursor-pointer">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                피드 레이아웃
              </button>
              <button className="px-3.5 py-1.5 border border-neutral-200 hover:bg-neutral-50 rounded-full text-xs font-bold text-neutral-600 flex items-center gap-1.5 cursor-pointer">
                ⚙️ 개인 설정
              </button>
            </div>
          </div>

          {/* MSN 카드 피드 그리드 (뉴스 레이아웃) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* [메인 영역: 카드 1] - 가로형 카드 (2열 넓이 차지) */}
            <div className="lg:col-span-2 bg-[#F8FAFC] border border-neutral-200/50 rounded-2xl p-5 flex flex-col md:flex-row gap-5">
              
              {/* 왼쪽: 큰 대표 이미지 뉴스 */}
              <Link href="/blog" className="flex-1 group flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-neutral-200 border border-neutral-200/40">
                    <img 
                      src="/images/spring_flower_festival.png" 
                      alt={event1.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-red-100 text-red-600 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">HOT</span>
                      <span className="text-xs font-bold text-neutral-600">성남시청 • {formatPeriod(event1.startDate, event1.endDate)}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-extrabold text-neutral-900 group-hover:text-blue-600 transition-colors duration-150 leading-snug">
                      "{event1.title}" 드디어 화려한 개막! 가족들과 가기 좋은 성남시 봄꽃 명소 안내
                    </h3>
                  </div>
                </div>
                <p className="mt-3 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                  {event1.summary}
                </p>
              </Link>

              {/* 오른쪽: 연계 텍스트 뉴스 리스트 */}
              <div className="w-full md:w-[260px] border-t md:border-t-0 md:border-l border-neutral-200/60 pt-4 md:pt-0 md:pl-4 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-3">주요 생활 정보</h4>
                  
                  <Link href="/blog" className="group block py-2 border-b border-neutral-100">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-bold text-neutral-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {event2.title}: 예비 창업가 특강 및 박람회 현장 모집 시작
                      </span>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">{event2.category}</span>
                    </div>
                  </Link>

                  <Link href="/blog" className="group block py-2 border-b border-neutral-100">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-bold text-neutral-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {event3.title}: 성남종합운동장에서 열리는 온가족 어린이 페스티벌
                      </span>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">{event3.category}</span>
                    </div>
                  </Link>

                  <Link href="/blog" className="group block py-2 border-b border-neutral-100">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-bold text-neutral-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {benefit1.title}: 만 19~34세 무주택 청년 월 최대 20만원 지원금 접수중
                      </span>
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded shrink-0">{benefit1.category}</span>
                    </div>
                  </Link>

                  <Link href="/blog" className="group block py-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-bold text-neutral-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {benefit2.title}: 첫째아 100만원 지원! 경기도 출산가구 혜택 요약
                      </span>
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded shrink-0">{benefit2.category}</span>
                    </div>
                  </Link>
                </div>

                <div className="text-[10px] text-neutral-400 pt-2 border-t border-neutral-100 font-medium">
                  최근 업데이트: {lastUpdated}
                </div>
              </div>
            </div>

            {/* [우측 상단: 카드 3] - 비디오형 뉴스 카드 (1열 차지) */}
            <Link href="/blog" className="group bg-[#F8FAFC] border border-neutral-200/50 rounded-2xl p-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-neutral-200 border border-neutral-200/40 flex items-center justify-center">
                  <img 
                    src="/images/startup_expo.png" 
                    alt={event2.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 shadow-md group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">EXPO</span>
                    <span className="text-xs font-bold text-neutral-600">판교테크밸리뉴스 • 11시간 전</span>
                  </div>
                  <h3 className="text-base font-extrabold text-neutral-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                    [현장 취재] 창업 꿈꾸는 청년들 다 모였다! "판교 청년 창업 박람회" 미래 유니콘 육성 특강 현장
                  </h3>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-200/60 flex items-center gap-4 text-neutral-400 text-xs font-semibold">
                <span className="flex items-center gap-1.5 hover:text-neutral-600">👍 94</span>
                <span className="flex items-center gap-1.5 hover:text-neutral-600">💬 8</span>
              </div>
            </Link>

            {/* [중앙 하단: 카드 4] - 정보/콘텐츠 카드 (1열 차지) */}
            <Link href="/blog" className="group bg-[#F8FAFC] border border-neutral-200/50 rounded-2xl p-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-neutral-200 border border-neutral-200/40">
                  <img 
                    src="/images/children_festival.png" 
                    alt={event3.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">FESTIVAL</span>
                    <span className="text-xs font-bold text-neutral-600">성남종합운동장</span>
                  </div>
                  <h3 className="text-base font-extrabold text-neutral-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                    온 가족이 다 함께 힐링! 성남시 어린이날 큰잔치, 무료 마술쇼와 풍선 아트 행사 프로그램
                  </h3>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-200/60 flex items-center gap-4 text-neutral-400 text-xs font-semibold">
                <span className="flex items-center gap-1.5 hover:text-neutral-600">👍 182</span>
                <span className="flex items-center gap-1.5 hover:text-neutral-600">💬 27</span>
              </div>
            </Link>

            {/* [우측 하단: 카드 5] - 날씨 카드 (2열 차지) */}
            <div className="lg:col-span-2 bg-gradient-to-b from-[#1C539A] to-[#123E75] text-white border border-[#123E75]/30 rounded-2xl p-5 flex flex-col justify-between shadow-md">
              <div className="space-y-4">
                {/* 헤더 날씨 정보 */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-blue-200 uppercase tracking-wider flex items-center gap-1.5">
                      🏠 성남시 분당구
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black">18°</span>
                      <span className="text-sm font-semibold text-blue-200">맑음</span>
                    </div>
                  </div>
                  <span className="text-4xl">☀️</span>
                </div>

                {/* 안내 문구 */}
                <div className="bg-blue-900/30 border border-blue-400/20 p-3 rounded-xl text-xs text-blue-100 leading-relaxed">
                  📢 내일 최고 기온이 5월 31일의 기록과 동일할 수 있습니다. 외출 시 가벼운 외투를 챙기세요.
                </div>
              </div>

              {/* 요일별 날씨 (가로형) */}
              <div className="grid grid-cols-5 gap-1.5 text-center mt-5 pt-4 border-t border-blue-400/20">
                <div className="space-y-1">
                  <div className="text-[10px] text-blue-200 font-bold">오늘</div>
                  <div className="text-lg">☀️</div>
                  <div className="text-[10px] font-bold">27°</div>
                  <div className="text-[9px] text-blue-300">16°</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-blue-200 font-bold">일</div>
                  <div className="text-lg">🌤️</div>
                  <div className="text-[10px] font-bold">28°</div>
                  <div className="text-[9px] text-blue-300">17°</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-blue-200 font-bold">월</div>
                  <div className="text-lg">☁️</div>
                  <div className="text-[10px] font-bold">26°</div>
                  <div className="text-[9px] text-blue-300">16°</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-blue-200 font-bold">화</div>
                  <div className="text-lg">☀️</div>
                  <div className="text-[10px] font-bold">29°</div>
                  <div className="text-[9px] text-blue-300">18°</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] text-blue-200 font-bold">수</div>
                  <div className="text-lg">🌤️</div>
                  <div className="text-[10px] font-bold">28°</div>
                  <div className="text-[9px] text-blue-300">18°</div>
                </div>
              </div>
            </div>

            {/* AdSense Banner */}
            {hasAdsense && (
              <div className="lg:col-span-3">
                <AdBanner />
              </div>
            )}

            {/* [우측 상단: 카드 2] - 비디오형 뉴스 카드 (1열 차지) */}
            <Link href="/blog" className="group bg-[#F8FAFC] border border-neutral-200/50 rounded-2xl p-5 flex flex-col justify-between">
              <div className="space-y-4">
                {/* 썸네일 이미지 및 비디오 재생 아이콘 오버레이 */}
                <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-neutral-200 border border-neutral-200/40 flex items-center justify-center">
                  <img 
                    src="/images/youth_housing_support.png" 
                    alt={benefit1.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  {/* 중앙의 재생 버튼 */}
                  <div className="absolute w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 shadow-md group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-blue-100 text-blue-600 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">VIDEO</span>
                    <span className="text-xs font-bold text-neutral-600">성남TV • 12시간 전</span>
                  </div>
                  <h3 className="text-base md:text-lg font-extrabold text-neutral-900 group-hover:text-blue-600 transition-colors leading-snug">
                    [영상 가이드] 신청 자격 총정리! 월 최대 20만원 받아가는 '청년 월세 지원금' 혜택 안내
                  </h3>
                </div>
              </div>

              {/* 피드 아래 소셜 버튼 */}
              <div className="mt-5 pt-3 border-t border-neutral-200/60 flex items-center gap-4 text-neutral-400 text-xs font-semibold">
                <span className="flex items-center gap-1.5 hover:text-neutral-600">
                  👍 152
                </span>
                <span className="flex items-center gap-1.5 hover:text-neutral-600">
                  👎 3
                </span>
                <span className="flex items-center gap-1.5 hover:text-neutral-600">
                  💬 14
                </span>
              </div>
            </Link>

            {/* [혜택 영역: 카드 6] - 가로형 혜택 카드 (2열 넓이 차지) */}
            <Link href="/blog" className="lg:col-span-2 group bg-[#F8FAFC] border border-neutral-200/50 rounded-2xl p-5 flex flex-col md:flex-row gap-5 justify-between">
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-blue-100 text-blue-600 font-black px-1.5 py-0.5 rounded uppercase tracking-wider">NEW</span>
                    <span className="text-xs font-bold text-neutral-600">경기도 • {benefit2.location}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-neutral-900 group-hover:text-blue-600 transition-colors duration-150 leading-snug">
                    {benefit2.title}: 첫째아 100만원, 둘째아 이상 150만원 출산축하금 신청 안내
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed font-medium">
                    {benefit2.summary}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-neutral-200/60 flex items-center justify-between text-neutral-400 text-xs font-semibold">
                  <span className="truncate">대상: {benefit2.target}</span>
                  <span className="text-blue-600 group-hover:translate-x-1 transition-transform font-bold flex items-center gap-0.5 shrink-0">
                    자세히 보기 &rarr;
                  </span>
                </div>
              </div>
              <div className="hidden md:block w-48 h-40 relative overflow-hidden rounded-xl bg-neutral-200 border border-neutral-200/40 shrink-0">
                <img 
                  src="/images/youth_housing_support.png" 
                  alt={benefit2.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
            </Link>
          </div>

        </div>
      </div>
      
    </div>
  );
}
