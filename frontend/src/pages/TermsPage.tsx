import React from 'react';
import { Layout, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader/AppHeader';
import AppFooter from '../components/AppFooter/AppFooter';
import FloatingSupportButton from '../components/FloatingSupportButton/FloatingSupportButton';
import '../styles/App.css'; // Importa los estilos globales

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const TermsPage: React.FC = () => {
    const { t } = useTranslation();
    const { token: { colorBgContainer } } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <AppHeader />

            <Content className="content-with-fixed-header">
                {/* Usamos form-container para consistencia de padding y fondo */}
                <div className="form-container" style={{ background: colorBgContainer, borderRadius: 8, marginTop: 24 }}>
                    <Title level={2}>{t('terms_title')}</Title>
                    <Paragraph type="secondary">{t('terms_last_modified')}</Paragraph>

                    <Paragraph>{t('terms_p1')}</Paragraph>
                    <Paragraph>{t('terms_p2')}</Paragraph>
                    <Paragraph>{t('terms_p3')}</Paragraph>
                    <Paragraph>{t('terms_p4')}</Paragraph>

                    <Title level={4}>{t('terms_accuracy_title')}</Title>
                    <Paragraph>{t('terms_accuracy_p1')}</Paragraph>

                    <Title level={4}>{t('terms_esign_title')}</Title>
                    <Paragraph>{t('terms_esign_p1')}</Paragraph>

                    <Title level={4}>{t('terms_non_english_title')}</Title>
                    <Paragraph>{t('terms_non_english_p1')}</Paragraph>

                    <Title level={4}>{t('terms_liability_title')}</Title>
                    <Paragraph>{t('terms_liability_p1')}</Paragraph>

                    <Title level={4}>{t('terms_third_party_title')}</Title>
                    <Paragraph>{t('terms_third_party_p1')}</Paragraph>

                    <Title level={4}>{t('terms_future_products_title')}</Title>
                    <Paragraph>{t('terms_future_products_p1')}</Paragraph>

                    <Title level={4}>{t('terms_refund_title')}</Title>
                    <Paragraph>{t('terms_refund_p1')}</Paragraph>

                    <Title level={4}>{t('terms_governing_law_title')}</Title>
                    <Paragraph>{t('terms_governing_law_p1')}</Paragraph>

                    <Title level={4}>{t('terms_timing_claims_title')}</Title>
                    <Paragraph>{t('terms_timing_claims_p1')}</Paragraph>

                    <Title level={4}>{t('terms_arbitration_title')}</Title>
                    <Paragraph>{t('terms_arbitration_p1')}</Paragraph>
                    <Paragraph>{t('terms_arbitration_p2')}</Paragraph>

                    <Title level={4}>{t('terms_final_arbitration_title')}</Title>
                    <Paragraph>{t('terms_final_arbitration_p1')}</Paragraph>

                    <Title level={4}>{t('terms_class_action_title')}</Title>
                    <Paragraph>{t('terms_class_action_p1')}</Paragraph>

                    <Title level={4}>{t('terms_suspended_accounts_title')}</Title>
                    <Paragraph>{t('terms_suspended_accounts_p1')}</Paragraph>

                    <Title level={4}>{t('terms_filing_fees_title')}</Title>
                    <Paragraph>{t('terms_filing_fees_p1')}</Paragraph>

                    <Title level={4}>{t('terms_reviews_title')}</Title>
                    <Paragraph>{t('terms_reviews_p1')}</Paragraph>

                    <Title level={4}>{t('terms_force_majeure_title')}</Title>
                    <Paragraph>{t('terms_force_majeure_p1')}</Paragraph>

                    <Title level={4}>{t('terms_refuse_title')}</Title>
                    <Paragraph>{t('terms_refuse_p1')}</Paragraph>

                    <Paragraph>{t('terms_final_p1')}</Paragraph>

                </div>
            </Content>

            <AppFooter />
            <FloatingSupportButton />
        </Layout>
    );
};

export default TermsPage;