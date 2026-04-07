import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingButton from './components/common/FloatingButton'
import HomePage from './pages/HomePage'
import QAPage from './pages/QAPage'
import PartnerPage from './pages/PartnerPage'
import ConsultPage from './pages/ConsultPage'
import AdminPage from './pages/AdminPage'
import PhlorotanninPage from './pages/PhlorotanninPage'
import LearnPage from './pages/LearnPage'
import EasyHealthPage from './pages/EasyHealthPage'
import ScrollToTop from './components/common/ScrollToTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/qa" element={<QAPage />} />
            <Route path="/partner" element={<PartnerPage />} />
            <Route path="/consult" element={<ConsultPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/phlorotannin" element={<PhlorotanninPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/easy" element={<EasyHealthPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButton />
      </div>
    </Router>
  )
}

export default App
