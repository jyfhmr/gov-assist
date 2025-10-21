import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import './styles/App.css';
import TermsPage from './pages/TermsPage';
import TermsServicePage from './pages/TermsServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import LegalDisclaimerPage from './pages/LegalDisclaimerPage';
import RefundPolicyPage from './pages/RefundPolicyPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<FormPage />} />

          {/** Sitios footer */}
          <Route path="/terms-of-use" element={<TermsPage />} />
          <Route path="/terms-of-service" element={<TermsServicePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/legal-disclaimer" element={<LegalDisclaimerPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;