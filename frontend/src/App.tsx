import React from 'react';
import { Layout, Typography, theme } from 'antd';
import './styles/App.css';
import MultiStepForm from './components/MultiStepForm/MultiStepForm';
import { loadStripe } from '@stripe/stripe-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Elements } from '@stripe/react-stripe-js';
import { ToastContainer } from 'react-toastify';

const stripePromise = loadStripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY');

const queryClient = new QueryClient();

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Layout style={{ minHeight: '100vh' }}>
        {/* Header  dawdwad*/}
        <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#001529', padding: '0 24px' }}>
          <div className="logo" style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
            GovAssist
          </div>
        </Header>

        {/* Main Content Area */}
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: colorBgContainer, minHeight: 280, padding: 24, borderRadius: 8, marginTop: 24 }}>
            {/* Encabezado del formulario */}
            <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
              ESTA U.S. VISA PROCESSING
            </Typography.Title>
            <Typography.Paragraph style={{ textAlign: 'center', marginBottom: 40 }}>
              Welcome, you are entitled to an Electronic Entry Permit to United States.
              <br /><br />
              <span style={{ fontWeight: 'bold' }}>If you apply, make sure:</span>
            </Typography.Paragraph>

            {/* ✨ Usamos nuestro nuevo y robusto componente de formulario */}
            <Elements stripe={stripePromise}>
              <MultiStepForm />
            </Elements>

          </div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'left', backgroundColor: '#0A2540', color: 'white', padding: '24px 50px' }}>
          <div style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 'bold' }}>
            GovAssist
          </div>
          <Typography.Paragraph style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '12px' }}>
            Disclaimer: GovAssist is not affiliated with any United States government agency or department. Costs for consulting services do NOT include any government application, medical examination, filing or biometric fees. This website does not provide legal advice and we are not a law firm. None of our customer service representatives are lawyers and they also do not provide legal advice. We are a private, internet-based travel and immigration consultancy provider dedicated to helping individuals travel to the United States. You may apply by yourself directly at travel.state.gov or at uscis.gov.
          </Typography.Paragraph>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '16px', marginTop: '16px' }}>
            <Typography.Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '12px' }}>
              Copyright © 2016-2025 GovAssist, LLC All Rights Reserved
            </Typography.Text>
            <div style={{ display: 'flex', gap: '20px' }}>
              {/* <Typography.Link href="#" style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '12px' }}>Terms of Use</Typography.Link>
            <Typography.Link href="#" style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '12px' }}>Terms of Service</Typography.Link>
            <Typography.Link href="#" style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '12px' }}>Privacy Policy</Typography.Link>
            <Typography.Link href="#" style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '12px' }}>Legal Disclaimer</Typography.Link>
            <Typography.Link href="#" style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '12px' }}>Refund</Typography.Link> */}
            </div>
          </div>
        </Footer>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;