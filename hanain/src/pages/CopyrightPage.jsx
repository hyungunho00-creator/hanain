import { Link } from 'react-router-dom'
import { ShieldAlert, ChevronRight, Mail, Phone } from 'lucide-react'
import { usePartner } from '../context/PartnerContext'
import SEOHead from '../components/common/SEOHead'

export default function CopyrightPage() {
  const partner = usePartner()

  return (
    <>
      <SEOHead
        title="저작권 및 무단복제 금지 안내 | phlorotannin.com"
        description="phlorotannin.com의 콘텐츠, 카테고리 구조, 파트너 정보페이지 시스템, 자료실, 데이터베이스 구조 및 SEO 설계의 무단 복제·재가공·상업적 이용 금지 안내입니다."
        canonical="https://phlorotannin.com/copyright"
        keywords="phlorotannin 저작권,플로로탄닌 무단복제 금지,파트너 정보페이지 보호,영업비밀 보호,데이터베이스 보호"
      />

      <div className="min-h-screen bg-gray-50">
        {/* breadcrumb */}
        <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-teal-600">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-800 font-medium">저작권 및 무단복제 금지 안내</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-10">
          {/* Hero */}
          <header className="mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              <ShieldAlert className="w-3.5 h-3.5" />
              LEGAL NOTICE
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
              phlorotannin.com<br className="md:hidden" /> 저작권 및 무단복제 금지 안내
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
              본 사이트의 콘텐츠, 페이지 구성, 카테고리 구조, 파트너 정보페이지 시스템, 자료실,
              데이터베이스 구조 및 SEO 설계의 무단 복제·재가공·상업적 이용을 금지합니다.
            </p>
          </header>

          {/* 본문 카드 */}
          <article className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 space-y-6">

            {/* 사이트 정체성 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                1. 사이트 정체성
              </h2>
              <p className="text-[15px] md:text-base text-gray-700 leading-[1.85]">
                phlorotannin.com은 플로로탄닌, 감태추출물, 해양 폴리페놀, 건강정보, 병원정보,
                파트너 정보페이지를 중심으로 구성된 건강정보 플랫폼입니다.
              </p>
            </section>

            {/* 저작물 및 자산 범위 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                2. 보호 대상 (저작물·데이터베이스·영업상 자산)
              </h2>
              <p className="text-[15px] md:text-base text-gray-700 leading-[1.85] mb-3">
                본 사이트의 다음 사항 일체는 phlorotannin.com의 저작물, 데이터베이스 및 영업상 자산입니다.
              </p>
              <ul className="space-y-2 text-[15px] md:text-base text-gray-700">
                {[
                  '모든 콘텐츠 (Q&A, 블로그, 건강정보, 병원정보, 가이드 문서)',
                  '모든 문구, 이미지, 영상, 도식, 일러스트',
                  '페이지 구성과 UI/UX 레이아웃',
                  '카테고리 구조 및 내부링크 구조',
                  '파트너 정보페이지 시스템 (/p/:phone 구조 포함)',
                  '자료실 구성 및 다운로드 자료(전단지, 핸드북, 교육자료, 상담 스크립트, 영업자료)',
                  '데이터베이스 구조 및 데이터 스키마',
                  'SEO 설계 (제목·메타·구조화데이터·sitemap·URL 체계)',
                  '상담 연결 방식 및 파트너 코드 구조',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-teal-500 mt-1.5 flex-shrink-0">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 금지 행위 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                3. 금지 행위
              </h2>
              <p className="text-[15px] md:text-base text-gray-700 leading-[1.85] mb-3">
                사전 서면 동의 없이 본 사이트의 전부 또는 일부를 다음과 같이 사용하는 것을 금지합니다.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 md:p-5">
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-red-800">
                  {[
                    '복제', '캡처', '전재', '수정',
                    '편집', '배포', '재가공', '상업적 이용',
                    '유사 서비스 제작', '제3자 제공', '영업자료 활용', 'AI 학습자료 활용',
                    '크롤링', '데이터 수집', '유사 페이지 제작',
                  ].map(act => (
                    <span key={act} className="bg-white text-red-700 font-semibold px-2.5 py-1 rounded-md text-center text-xs md:text-sm border border-red-100">
                      {act}
                    </span>
                  ))}
                </ul>
              </div>
            </section>

            {/* 법적 조치 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                4. 법적 조치
              </h2>
              <p className="text-[15px] md:text-base text-gray-700 leading-[1.85]">
                위반 시 <strong className="text-gray-900">저작권법</strong>,
                <strong className="text-gray-900"> 부정경쟁방지 및 영업비밀보호에 관한 법률</strong>,
                <strong className="text-gray-900"> 개인정보보호법</strong> 등 관련 법령에 따라
                <strong className="text-red-700"> 게시중단 요청, 손해배상 청구, 형사 고소</strong> 등
                필요한 법적 조치를 취할 수 있습니다.
              </p>
            </section>

            {/* 자료 활용 절차 */}
            <section>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                5. 자료 활용을 원하실 경우
              </h2>
              <p className="text-[15px] md:text-base text-gray-700 leading-[1.85] mb-4">
                본 사이트의 자료를 활용하고자 하는 경우 <strong>반드시 사전 서면 동의</strong>를 받아야 합니다.
                아래 연락처로 사용 목적·범위·기간을 명시하여 문의 주시기 바랍니다.
              </p>
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 md:p-5 space-y-2">
                <div className="flex items-center gap-3 text-sm md:text-base text-gray-800">
                  <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="font-semibold">전화</span>
                  <a href={`tel:${partner.phone}`} className="text-teal-700 hover:underline">
                    {partner.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm md:text-base text-gray-800">
                  <Mail className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span className="font-semibold">문의</span>
                  <Link to="/consult" className="text-teal-700 hover:underline">
                    /consult 문의 페이지
                  </Link>
                </div>
              </div>
            </section>

            {/* 시행일 */}
            <section className="pt-4 border-t border-gray-100">
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                © 2026 phlorotannin.com. All rights reserved.<br />
                본 안내는 2026년 5월부로 시행되며, 사이트 운영 정책에 따라 수정될 수 있습니다.
              </p>
            </section>
          </article>

          <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-600 transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" />
              메인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
