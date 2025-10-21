import React from 'react';
import { Layout, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader/AppHeader';
import AppFooter from '../components/AppFooter/AppFooter';
import FloatingSupportButton from '../components/FloatingSupportButton/FloatingSupportButton';
import '../styles/App.css'; // Importa los estilos globales

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const LegalDisclaimerPage: React.FC = () => {
    const { t } = useTranslation();
    const { token: { colorBgContainer } } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <AppHeader />

            <Content className="content-with-fixed-header">
                {/* Usamos form-container para consistencia de padding y fondo */}
                <div className="form-container" style={{ background: colorBgContainer, borderRadius: 8, marginTop: 24 }}>
                    <Title level={2}>{t('legal_disclaimer_title')}</Title>
                    {/* Puedes añadir una fecha si quieres con t('legal_disclaimer_last_modified') */}
                    
                    <Paragraph>{t('legal_disclaimer_1')}</Paragraph>
                    <Paragraph>{t('legal_disclaimer_2')}</Paragraph>
                    <Paragraph>{t('legal_disclaimer_3')}</Paragraph>
                    <Paragraph>{t('legal_disclaimer_4')}</Paragraph>
                    <Paragraph>{t('legal_disclaimer_5')}</Paragraph>
                    <Paragraph>{t('legal_disclaimer_6')}</Paragraph>
                    <Paragraph>{t('legal_disclaimer_7')}</Paragraph>
                    <Paragraph>{t('legal_disclaimer_8')}</Paragraph>

                </div>
            </Content>

            <AppFooter />
            <FloatingSupportButton />
        </Layout>
    );
};

export default LegalDisclaimerPage;