import React, { useState } from "react";
import { Layout, Typography, theme, Button, Image, List } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';
import "./styles/App.css";
import MultiStepForm from "./components/MultiStepForm/MultiStepForm";
import { loadStripe } from "@stripe/stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { ToastContainer } from "react-toastify";
import AppHeader from "./components/AppHeader/AppHeader";
import AppFooter from "./components/AppFooter/AppFooter";
import FloatingSupportButton from "./components/FloatingSupportButton/FloatingSupportButton";

const stripePromise = loadStripe("pk_test_51SIZ05AZKCfcZ9zqrfMPNFagU2g46m5Dz4ZbeEOVP4dEtQgWEgNeqSowl7ILhwijJqZChKzER1SRza0pkaxKY1Jy006dG9KCLx");
const queryClient = new QueryClient();

const { Content } = Layout;
const { Title, Paragraph, Link } = Typography;

const App: React.FC = () => {
    const { token: { colorBgContainer } } = theme.useToken();
    const [isFormStarted, setIsFormStarted] = useState(false);
    const { t } = useTranslation();

    const checklistItems = [
        t('landing_checklist_1'),
        t('landing_checklist_2'),
    ];

    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <Layout style={{ minHeight: "100vh" }}>

                <AppHeader />
                
                <Content className="content-with-fixed-header">
                    <div className="form-container" style={{ background: colorBgContainer, borderRadius: 8, marginTop: 24 }}>
                        {!isFormStarted ? (
                            <div className="landing-content">
                                <Title level={2} style={{ marginBottom: 0 }}>{t('landing_title_1')}</Title>
                                <Title level={4} type="secondary" style={{ marginTop: 0 }}>{t('landing_title_2')}</Title>
                                <Image width={200} src="/images/esta-img.png" preview={false} alt="ESTA Logo" style={{ margin: "24px 0" }}/>
                                <Paragraph>{t('landing_welcome')}</Paragraph>
                                <Title level={4}>{t('landing_assurance')}</Title>
                                <List
                                    dataSource={checklistItems}
                                    renderItem={(item) => (
                                        <List.Item className="checklist-item"><CheckCircleFilled className="check-icon" /> {item}</List.Item>
                                    )}
                                    style={{ maxWidth: 450, margin: "0 auto 24px auto", textAlign: "left" }}
                                />
                                <Paragraph>
                                    {t('landing_b1b2_prompt', { 0: <Link href="#">{t('landing_b1b2_link')}</Link> })}
                                </Paragraph>
                                <Button type="primary" size="large" onClick={() => setIsFormStarted(true)} className="start-button">
                                    {t('landing_start_button')}
                                </Button>
                            </div>
                        ) : (
                            <Elements stripe={stripePromise}>
                                <MultiStepForm />
                            </Elements>
                        )}
                    </div>
                </Content>

                <AppFooter />
                
                <FloatingSupportButton />
            
            </Layout>
        </QueryClientProvider>
    );
};

export default App;