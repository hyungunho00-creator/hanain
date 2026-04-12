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
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import ScrollToTop from './components/common/ScrollToTop'
import { PartnerProvider } from './context/PartnerContext'
import { AuthProvider } from './context/AuthContext'
import { useRefTracking } from './hooks/useRefTracking'

// ref 추적 훅을 Router 내부에서 실행
function AppInner() {
  useRefTracking()
  return (
    <PartnerProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* 기존 페이지 */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/qa" element={<QAPage />} />
            <Route path="/partner" element={<PartnerPage />} />
            <Route path="/consult" element={<ConsultPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/phlorotannin" element={<PhlorotanninPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/easy" element={<EasyHealthPage />} />
            <Route path="/p/:slug" element={<PartnerLandingPage />} />

            {/* 신규: 인증 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButton />
      </div>
    </PartnerProvider>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </Router>
  )
}

export default App
