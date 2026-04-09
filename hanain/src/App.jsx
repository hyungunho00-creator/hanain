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
import ScrollToTop from './components/common/ScrollToTop'
import { PartnerProvider } from './context/PartnerContext'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PartnerProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
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
              <Route path="/p/:slug" element={<PartnerLandingPage />} />
            </Routes>
          </main>
          <Footer />
          <FloatingButton />
        </div>
      </PartnerProvider>
    </Router>
  )
}

export default App
