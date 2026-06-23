import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Film, MessageCircle, Search, Share2, Stethoscope } from 'lucide-react'
import SEOHead from '../components/common/SEOHead'
import { QA_TOTAL } from '../data/siteStats'

const FLOW = [
  {
    label: '질문 수집',
    title: '환자가 실제로 검색하는 문장으로 시작',
    desc: '예: “검사 결과는 정상인데 피곤한 이유”, “수술 전 무엇을 물어봐야 하나요”처럼 상담 전 검색어를 Q&A로 구조화합니다.',
    icon: Search,
  },
  {
    label: 'Q&A 자산',
    title: '짧은 답과 근거 있는 설명을 분리',
    desc: 'AI 검색이 답을 인식하기 쉽게 질문, 요약 답변, 자세한 설명, 참고 근거, 관련 태그를 한 페이지 안에 정리합니다.',
    icon: BookOpen,
  },
  {
    label: '블로그 확장',
    title: '하나의 질문을 긴 해설 글로 확장',
    desc: '병원 업종에서는 시술별, 증상별, 연령별, 검사별 글로 넓혀 검색면을 만들 수 있습니다.',
    icon: Stethoscope,
  },
  {
    label: '채널 배포',
    title: '카페·블로그·클립·유튜브로 재가공',
    desc: '같은 주제를 네이버 블로그, 카페, 짧은 영상, 유튜브 설명란으로 연결해 외부 신호를 만듭니다.',
    icon: Film,
  },
  {
    label: '상담 전환',
    title: '읽은 사람이 바로 문의할 수 있게 연결',
    desc: '전화, 문자, 파트너 명함, 상담 페이지로 연결해 검색 방문이 실제 상담 동선으로 이어지게 합니다.',
    icon: MessageCircle,
  },
]

const EXAMPLE_ROWS = [
  ['병원 Q&A', '눈밑 지방 재배치 후 멍은 얼마나 가나요?', '질문형 검색어 확보'],
  ['블로그', '회복 기간·주의사항·병원 선택 기준 정리', '긴 체류시간과 내부링크'],
  ['네이버 카페', '실제 상담 전 체크리스트 공유', '커뮤니티 신뢰 신호'],
  ['클립/쇼츠', '30초 회복 체크포인트 영상', '짧은 영상 유입'],
  ['문의 연결', '전화·문자·예약 문의 연결', '전환 동선'],
]

export default function ArchiveDemoPage() {
  const pageUrl = 'https://phlorotannin.com/archive-demo'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '건강정보 아카이브 운영 예시',
    url: pageUrl,
    description: 'Q&A, 블로그, 카페, 영상, 상담 동선을 연결하는 건강정보 아카이브 운영 예시입니다.',
    inLanguage: 'ko-KR',
    about: ['건강정보 아카이브', '병원 마케팅', 'Q&A 아카이브', '질문형 정보', '검색 구조'],
  }

  return (
    <>
      <SEOHead
        title="건강정보 아카이브 운영 예시 | 플로로탄닌"
        description="플로로탄닌닷컴의 Q&A·블로그·태그·영상·카페·상담 연결 구조를 병원 영업 예시로 설명하는 건강정보 아카이브 데모 페이지입니다."
        keywords="건강정보 아카이브, 병원 검색 구조, 질문형 정보, Q&A 아카이브, 병원 콘텐츠 마케팅"
        canonical={pageUrl}
        ogImage="https://phlorotannin.com/og-image.png"
        ogImageAlt="건강정보 아카이브 운영 예시와 Q&A 블로그 영상 상담 연결 구조"
        jsonLd={jsonLd}
      />

      <div className="pt-16 bg-white text-gray-950">
        <section className="border-b border-gray-200 bg-[#F7FAFC]">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gray-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                Search Asset Demo
              </span>
            </div>
            <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
              병원 영업에서 보여줄 수 있는 건강정보 아카이브 운영 예시
            </h1>
            <p className="mt-5 max-w-3xl text-[15px] leading-8 text-gray-600 md:text-base">
              플로로탄닌닷컴은 단일 랜딩페이지가 아니라 질문형 Q&A, 연구 블로그, 태그 아카이브,
              쉽게 배우기, 외부 채널 연결을 쌓는 구조입니다. 병원 업종에서는 이 구조를 시술별,
              증상별, 연령별, 검사별 아카이브로 바꿔 상담 전 검색 수요를 흡수할 수 있습니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/qa" className="inline-flex items-center gap-2 rounded-md bg-gray-950 px-5 py-3 text-sm font-bold text-white">
                Q&A 아카이브 보기 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/blog" className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-bold text-gray-800">
                연구 블로그 보기 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border border-gray-200 bg-white p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">현재 Q&A</p>
              <p className="mt-3 text-3xl font-black tabular-nums">{QA_TOTAL.toLocaleString()}개</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">공개 건강 Q&A를 기준으로 표시합니다.</p>
            </div>
            <div className="border border-gray-200 bg-white p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">검색 구조</p>
              <p className="mt-3 text-3xl font-black">13개</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">카테고리별 질문과 태그 아카이브를 연결합니다.</p>
            </div>
            <div className="border border-gray-200 bg-white p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">전환 동선</p>
              <p className="mt-3 text-3xl font-black">상담 연결</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">전화, 문자, 파트너 명함, 문의 페이지로 이어집니다.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
            <h2 className="text-2xl font-black tracking-tight">콘텐츠 하나가 정보 아카이브로 쌓이는 순서</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-5">
              {FLOW.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="border border-gray-200 bg-white p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <Icon className="h-5 w-5 text-gray-800" />
                      <span className="text-xs font-bold tabular-nums text-gray-400">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">{item.label}</p>
                    <h3 className="mt-2 text-base font-black leading-snug">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="text-2xl font-black tracking-tight">병원장에게 설명할 핵심 문장</h2>
              <p className="mt-4 text-[15px] leading-8 text-gray-600">
                “홈페이지는 예쁘게 만드는 것보다 방문자가 실제로 묻는 질문을 계속 쌓는 구조가 중요합니다.
                Q&A 하나가 블로그, 카페, 영상, 상담 동선으로 확장되면 병원 홈페이지가 단순 소개 페이지가 아니라
                건강정보 아카이브로 작동합니다.”
              </p>
              <div className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-5 text-sm leading-7 text-gray-700">
                플로로탄닌닷컴은 이 구조를 건강정보 소재로 운영한 예시입니다. 병원에는 같은 방식을
                진료과, 시술명, 증상, 회복 과정, 검사 결과, 병원 선택 기준으로 바꿔 적용합니다.
              </div>
            </div>

            <div className="overflow-hidden border border-gray-200">
              <div className="grid grid-cols-[0.8fr_1.4fr_1fr] bg-gray-950 px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white">
                <span>자산</span>
                <span>예시</span>
                <span>역할</span>
              </div>
              {EXAMPLE_ROWS.map((row) => (
                <div key={row[0]} className="grid grid-cols-[0.8fr_1.4fr_1fr] border-t border-gray-200 px-4 py-4 text-sm">
                  <span className="font-bold text-gray-900">{row[0]}</span>
                  <span className="text-gray-700">{row[1]}</span>
                  <span className="text-gray-500">{row[2]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-gray-950">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 text-white md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">Demo Flow</p>
              <h2 className="mt-2 text-2xl font-black">이 구조를 병원 업종으로 바꿔 보여줄 수 있습니다.</h2>
            </div>
            <Link to="/partner" className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-gray-950">
              파트너 참여 보기 <Share2 className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
