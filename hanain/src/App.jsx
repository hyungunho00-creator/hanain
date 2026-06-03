import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import QAPage from './pages/QAPage'
import QATagPage from './pages/QATagPage'
import PartnerPage from './pages/PartnerPage'
import ConsultPage from './pages/ConsultPage'
import AdminPage from './pages/AdminPage'
import PhlorotanninPage from './pages/PhlorotanninPage'
import LearnPage from './pages/LearnPage'
import EasyHealthPage from './pages/EasyHealthPage'
import BusinessCardPage from './pages/BusinessCardPage'
import CommunityPage from './pages/CommunityPage'
import CommunityWritePage from './pages/CommunityWritePage'
import CommunityPostPage from './pages/CommunityPostPage'
import QuestionDetailPage from './pages/QuestionDetailPage'
import QuestionWritePage from './pages/QuestionWritePage'
import CategoryPage from './pages/CategoryPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import InfoRoomPage from './pages/InfoRoomPage'
import PartnerShopPackagePage from './pages/PartnerShopPackagePage'
import CopyrightPage from './pages/CopyrightPage'
import GlossaryPage from './pages/GlossaryPage'
import ComparePage from './pages/ComparePage'
import SafetyPage from './pages/SafetyPage'
import ResearchTimelinePage from './pages/ResearchTimelinePage'
import InsightsHubPage from './pages/InsightsHubPage'
import InsightPostPage from './pages/InsightPostPage'
import ScrollToTop from './components/common/ScrollToTop'
import { PartnerProvider } from './context/PartnerContext'
import { AuthProvider } from './context/AuthContext'
import PartnerArchiveShell from './components/partner/PartnerArchiveShell'

function AppInner() {
  return (
    <AuthProvider>
      <PartnerProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <PartnerArchiveShell position="top" />
          <main className="flex-1" style={{ paddingBottom: 'var(--partner-sticky-offset, 0px)' }}>
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

              <Route path="/insights" element={<InsightsHubPage />} />
              <Route path="/insights/:slug" element={<InsightPostPage />} />
            </Routes>
          </main>
          <PartnerArchiveShell position="bottom" />
          <Footer />
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


