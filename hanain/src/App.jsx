import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import { PartnerProvider } from './context/PartnerContext'
import { AuthProvider } from './context/AuthContext'
import PartnerArchiveShell from './components/partner/PartnerArchiveShell'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const QAPage = lazy(() => import('./pages/QAPage'))
const QATagPage = lazy(() => import('./pages/QATagPage'))
const PartnerPage = lazy(() => import('./pages/PartnerPage'))
const ConsultPage = lazy(() => import('./pages/ConsultPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const PhlorotanninPage = lazy(() => import('./pages/PhlorotanninPage'))
const LearnPage = lazy(() => import('./pages/LearnPage'))
const EasyHealthPage = lazy(() => import('./pages/EasyHealthPage'))
const BusinessCardPage = lazy(() => import('./pages/BusinessCardPage'))
const CommunityPage = lazy(() => import('./pages/CommunityPage'))
const CommunityWritePage = lazy(() => import('./pages/CommunityWritePage'))
const CommunityPostPage = lazy(() => import('./pages/CommunityPostPage'))
const QuestionDetailPage = lazy(() => import('./pages/QuestionDetailPage'))
const QuestionWritePage = lazy(() => import('./pages/QuestionWritePage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const InfoRoomPage = lazy(() => import('./pages/InfoRoomPage'))
const PartnerShopPackagePage = lazy(() => import('./pages/PartnerShopPackagePage'))
const CopyrightPage = lazy(() => import('./pages/CopyrightPage'))
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'))
const ComparePage = lazy(() => import('./pages/ComparePage'))
const SafetyPage = lazy(() => import('./pages/SafetyPage'))
const ResearchTimelinePage = lazy(() => import('./pages/ResearchTimelinePage'))
const InsightsHubPage = lazy(() => import('./pages/InsightsHubPage'))
const InsightPostPage = lazy(() => import('./pages/InsightPostPage'))
const ArchiveDemoPage = lazy(() => import('./pages/ArchiveDemoPage'))

function PageFallback() {
  return (
    <div className="min-h-[45vh] flex items-center justify-center px-6 text-sm text-gray-500">
      페이지를 불러오는 중입니다.
    </div>
  )
}

function AppInner() {
  const location = useLocation()
  const isShopPackageRoute = /^\/p\/[^/]+\/shop-package(?:\/|$)/.test(location.pathname)

  return (
    <AuthProvider>
      <PartnerProvider>
        <div className="min-h-screen flex flex-col">
          {!isShopPackageRoute && <Navbar />}
          {!isShopPackageRoute && <PartnerArchiveShell position="top" />}
          <main className="flex-1" style={{ paddingBottom: isShopPackageRoute ? '0px' : 'var(--partner-sticky-offset, 0px)' }}>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/qa" element={<QAPage />} />
                <Route path="/partner" element={<PartnerPage />} />
                <Route path="/consult" element={<ConsultPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/phlorotannin" element={<PhlorotanninPage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/easy" element={<EasyHealthPage />} />

                {/* Partner card + partner-preserving archive */}
                <Route path="/p/:partnerSlug" element={<BusinessCardPage />} />
                <Route path="/p/:partnerSlug/home" element={<HomePage />} />
                <Route path="/p/:partnerSlug/easy" element={<EasyHealthPage />} />
                <Route path="/p/:partnerSlug/qa" element={<QAPage />} />
                <Route path="/p/:partnerSlug/qa/tag/:tag" element={<QATagPage />} />
                <Route path="/p/:partnerSlug/q/:slug" element={<QuestionDetailPage />} />
                <Route path="/p/:partnerSlug/category/:slug" element={<CategoryPage />} />
                <Route path="/p/:partnerSlug/blog" element={<BlogPage />} />
                <Route path="/p/:partnerSlug/blog/:slug" element={<BlogPostPage />} />
                <Route path="/p/:partnerSlug/insights" element={<InsightsHubPage />} />
                <Route path="/p/:partnerSlug/insights/:slug" element={<InsightPostPage />} />
                <Route path="/p/:partnerSlug/consult" element={<ConsultPage />} />
                <Route path="/p/:partnerSlug/partner" element={<PartnerPage />} />
                <Route path="/p/:partnerSlug/phlorotannin" element={<PhlorotanninPage />} />
                <Route path="/p/:partnerSlug/learn" element={<LearnPage />} />
                <Route path="/p/:partnerSlug/question/write" element={<QuestionWritePage />} />
                <Route path="/p/:partnerSlug/inforoom" element={<InfoRoomPage />} />
                <Route path="/p/:partnerSlug/shop-package" element={<PartnerShopPackagePage />} />
                <Route path="/p/:partnerSlug/shop-package/:token" element={<PartnerShopPackagePage />} />
                <Route path="/p/:partnerSlug/glossary" element={<GlossaryPage />} />
                <Route path="/p/:partnerSlug/copyright" element={<CopyrightPage />} />
                <Route path="/p/:partnerSlug/safety" element={<SafetyPage />} />
                <Route path="/p/:partnerSlug/research-timeline" element={<ResearchTimelinePage />} />
                <Route path="/p/:partnerSlug/compare/:slug" element={<ComparePage />} />

                <Route path="/community" element={<CommunityPage />} />
                <Route path="/community/write" element={<CommunityWritePage />} />
                <Route path="/community/edit/:postId" element={<CommunityWritePage />} />
                <Route path="/community/post/:postId" element={<CommunityPostPage />} />

                <Route path="/inforoom" element={<InfoRoomPage />} />

                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />

                <Route path="/q/:slug" element={<QuestionDetailPage />} />
                <Route path="/qa/tag/:tag" element={<QATagPage />} />
                <Route path="/question/write" element={<QuestionWritePage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />

                <Route path="/copyright" element={<CopyrightPage />} />
                <Route path="/glossary" element={<GlossaryPage />} />

                <Route path="/compare/:slug" element={<ComparePage />} />
                <Route path="/safety" element={<SafetyPage />} />
                <Route path="/research-timeline" element={<ResearchTimelinePage />} />
                <Route path="/archive-demo" element={<ArchiveDemoPage />} />

                <Route path="/insights" element={<InsightsHubPage />} />
                <Route path="/insights/:slug" element={<InsightPostPage />} />
              </Routes>
            </Suspense>
          </main>
          {!isShopPackageRoute && <PartnerArchiveShell position="bottom" />}
          {!isShopPackageRoute && <Footer />}
        </div>
      </PartnerProvider>
    </AuthProvider>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppInner />
    </Router>
  )
}

export default App
