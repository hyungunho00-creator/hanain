import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingButton from './components/common/FloatingButton'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import QAPage from './pages/QAPage'
import PartnerPage from './pages/PartnerPage'
import ConsultPage from './pages/ConsultPage'
import AdminPage from './pages/AdminPage'
import PhlorotanninPage from './pages/PhlorotanninPage'
import LearnPage from './pages/LearnPage'
import EasyHealthPage from './pages/EasyHealthPage'
import PartnerLandingPage from './pages/PartnerLandingPage'
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
import CopyrightPage from './pages/CopyrightPage'
import ScrollToTop from './components/common/ScrollToTop'
import { PartnerProvider } from './context/PartnerContext'
import { AuthProvider } from './context/AuthContext'

function AppInner() {
  return (
    <AuthProvider>
    <PartnerProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"              element={<LandingPage />} />
            <Route path="/home"          element={<HomePage />} />
            <Route path="/qa"            element={<QAPage />} />
            <Route path="/partner"       element={<PartnerPage />} />
            <Route path="/consult"       element={<ConsultPage />} />
            <Route path="/admin"         element={<AdminPage />} />
            <Route path="/phlorotannin"  element={<PhlorotanninPage />} />
            <Route path="/learn"         element={<LearnPage />} />
            <Route path="/easy"          element={<EasyHealthPage />} />
            <Route path="/p/:phone"      element={<BusinessCardPage />} />

            {/* 커뮤니티 */}
            <Route path="/community"                  element={<CommunityPage />} />
            <Route path="/community/write"            element={<CommunityWritePage />} />
            <Route path="/community/edit/:postId"     element={<CommunityWritePage />} />
            <Route path="/community/post/:postId"     element={<CommunityPostPage />} />

            {/* 정보방 */}
            <Route path="/inforoom"           element={<InfoRoomPage />} />
            <Route path="/p/:phone/inforoom"  element={<InfoRoomPage />} />

            {/* 블로그 */}
            <Route path="/blog"           element={<BlogPage />} />
            <Route path="/blog/:slug"     element={<BlogPostPage />} />

            {/* 건강 Q&A */}
            <Route path="/q/:slug"        element={<QuestionDetailPage />} />
            <Route path="/question/write" element={<QuestionWritePage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />

            {/* 저작권 안내 */}
            <Route path="/copyright"     element={<CopyrightPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButton />
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
