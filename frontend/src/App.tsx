import React, { useState } from "react";
import { Layout, Typography, theme, Button, Image, List, Space } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import "./styles/App.css";
import MultiStepForm from "./components/MultiStepForm/MultiStepForm";
import { loadStripe } from "@stripe/stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { ToastContainer } from "react-toastify";

// Make sure to replace this with your actual publishable key
const stripePromise = loadStripe("pk_test_YOUR_STRIPE_PUBLISHABLE_KEY");
const queryClient = new QueryClient();

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Link } = Typography;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // State to control whether the landing page or the form is shown
  const [isFormStarted, setIsFormStarted] = useState(false);

  const checklistItems = [
    "You are visiting for a maximum of 90 days.",
    "You are traveling exclusively for business, transit, or pleasure.",
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#001529",
            padding: "0 24px",
          }}
        >
          <div
            className="logo"
            style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}
          >
            <Image
              width={200}
              src="/images/logo.png"
              preview={false}
              alt="ESTA Logo"
              style={{ margin: "24px 0" }}
            />
          </div>
          {/* <Space style={{ marginLeft: "auto" }}>
            <Button>Spanish</Button>
          </Space> */}
        </Header>

        <Content className="main-content">
          <div
            className="form-container"
            style={{
              background: colorBgContainer,
              borderRadius: 8,
              marginTop: 24,
            }}
          >
            {/* Conditional Rendering: Show landing page or form */}
            {!isFormStarted ? (
              // --- LANDING PAGE VIEW ---
              <div className="landing-content">
                <Title level={2} style={{ marginBottom: 0 }}>
                  ESTA Authorization
                </Title>
                <Title level={4} type="secondary" style={{ marginTop: 0 }}>
                  Electronic System for Travel Authorization
                </Title>

                <Image
                  width={200}
                  src="/images/esta-img.png" // Using a sample image
                  preview={false}
                  alt="ESTA Logo"
                  style={{ margin: "24px 0" }}
                />

                <Paragraph>
                  Welcome, you are entitled to an Electronic Entry Permit to the
                  United States.
                </Paragraph>

                <Title level={4}>If you apply, make sure:</Title>
                <List
                  dataSource={checklistItems}
                  renderItem={(item) => (
                    <List.Item className="checklist-item">
                      <CheckCircleFilled className="check-icon" /> {item}
                    </List.Item>
                  )}
                  style={{
                    maxWidth: 450,
                    margin: "0 auto 24px auto",
                    textAlign: "left",
                  }}
                />

                {/* <Paragraph>
                  Need to stay longer than 90 days? <Link href="#">Apply for a B1/B2 permit</Link> (embassy visit required)
                </Paragraph> */}

                <Button
                  type="primary"
                  size="large"
                  onClick={() => setIsFormStarted(true)}
                  className="start-button"
                >
                  Applicant Information
                </Button>
              </div>
            ) : (
              // --- FORM VIEW ---
              <>
                <Title
                  level={2}
                  style={{ textAlign: "center", marginBottom: 24 }}
                >
                  ESTA U.S. VISA PROCESSING
                </Title>
                <Paragraph style={{ textAlign: "center", marginBottom: 40 }}>
                  Welcome, you are entitled to an Electronic Entry Permit to the
                  United States.
                  <br />
                  <br />
                  <span style={{ fontWeight: "bold" }}>
                    If you apply, make sure:
                  </span>
                  <List
                    dataSource={checklistItems}
                    renderItem={(item) => (
                      <List.Item className="checklist-item">
                        <CheckCircleFilled className="check-icon" /> {item}
                      </List.Item>
                    )}
                    style={{
                      maxWidth: 450,
                      margin: "0 auto 24px auto",
                      textAlign: "left",
                    }}
                  />
                </Paragraph>

                <Elements stripe={stripePromise}>
                  <MultiStepForm />
                </Elements>
              </>
            )}
          </div>
        </Content>

        <Footer
          className="main-footer"
          style={{ backgroundColor: "#0A2540", color: "white" }}
        >
          <div
            style={{
              marginBottom: "16px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            GovAssist
          </div>
          <Typography.Paragraph
            style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "10px" }}
          >
            Disclaimer: GovAssist is not affiliated with any United States
            government agency or department. Costs for consulting services do
            NOT include any government application, medical examination, filing
            or biometric fees. This website does not provide legal advice and we
            are not a law firm. None of our customer service representatives are
            lawyers and they also do not provide legal advice. We are a private,
            internet-based travel and immigration consultancy provider dedicated
            to helping individuals travel to the United States. You may apply by
            yourself directly at travel.state.gov or at uscis.gov.
          </Typography.Paragraph>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap", // ✨ Añadido para responsividad
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              paddingTop: "16px",
              marginTop: "16px",
              gap: "16px", // ✨ Añadido para espaciado en móvil
            }}
          >
            <Typography.Text
              style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}
            >
              Copyright © 2016-2025 GovAssist, LLC All Rights Reserved
            </Typography.Text>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {/* <Typography.Link
                href="#"
                style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}
              >
                Terms of Use
              </Typography.Link>
              <Typography.Link
                href="#"
                style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}
              >
                Terms of Service
              </Typography.Link>
              <Typography.Link
                href="#"
                style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}
              >
                Privacy Policy
              </Typography.Link>
              <Typography.Link
                href="#"
                style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}
              >
                Legal Disclaimer
              </Typography.Link>
              <Typography.Link
                href="#"
                style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}
              >
                Refund
              </Typography.Link> */}
            </div>
          </div>
        </Footer>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
