import React from 'react';
import { Layout, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader/AppHeader';
import AppFooter from '../components/AppFooter/AppFooter';
import FloatingSupportButton from '../components/FloatingSupportButton/FloatingSupportButton';
import '../styles/App.css'; // Importa los estilos globales

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const TermsServicePage: React.FC = () => {
    const { t } = useTranslation();
    const { token: { colorBgContainer } } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <AppHeader />

            <Content className="content-with-fixed-header">
                <div className="form-container" style={{ background: colorBgContainer, borderRadius: 8, marginTop: 24 }}>
                    <Title level={2}>{t('tos_title')}</Title>
                    <Paragraph type="secondary">{t('tos_last_modified')}</Paragraph>

                    <Paragraph>{t('tos_p1')}</Paragraph>
                    <Paragraph>{t('tos_p2')}</Paragraph>
                    <Paragraph>{t('tos_p3')}</Paragraph>
                    <Paragraph>{t('tos_p4')}</Paragraph>

                    <Title level={4}>{t('tos_accuracy_title')}</Title>
                    <Paragraph>{t('tos_accuracy_p1')}</Paragraph>

                    <Title level={4}>{t('tos_esign_title')}</Title>
                    <Paragraph>{t('tos_esign_p1')}</Paragraph>

                    <Title level={4}>{t('tos_non_english_title')}</Title>
                    <Paragraph>{t('tos_non_english_p1')}</Paragraph>

                    <Title level={4}>{t('tos_liability_title')}</Title>
                    <Paragraph>{t('tos_liability_p1')}</Paragraph>

                    <Title level={4}>{t('tos_third_party_title')}</Title>
                    <Paragraph>{t('tos_third_party_p1')}</Paragraph>

                    <Title level={4}>{t('tos_future_products_title')}</Title>
                    <Paragraph>{t('tos_future_products_p1')}</Paragraph>

                    <Title level={4}>{t('tos_refund_title')}</Title>
                    <Paragraph>{t('tos_refund_p1')}</Paragraph>

                    <Title level={4}>{t('tos_governing_law_title')}</Title>
                    <Paragraph>{t('tos_governing_law_p1')}</Paragraph>

                    <Title level={4}>{t('tos_timing_claims_title')}</Title>
                    <Paragraph>{t('tos_timing_claims_p1')}</Paragraph>

                    <Title level={4}>{t('tos_arbitration_title')}</Title>
                    <Paragraph>{t('tos_arbitration_p1')}</Paragraph>
                    <Paragraph>{t('tos_arbitration_p2')}</Paragraph>

                    <Title level={4}>{t('tos_final_arbitration_title')}</Title>
                    <Paragraph>{t('tos_final_arbitration_p1')}</Paragraph>

                    <Title level={4}>{t('tos_class_action_title')}</Title>
                    <Paragraph>{t('tos_class_action_p1')}</Paragraph>

                    <Title level={4}>{t('tos_suspended_accounts_title')}</Title>
                    <Paragraph>{t('tos_suspended_accounts_p1')}</Paragraph>

                    <Title level={4}>{t('tos_filing_fees_title')}</Title>
                    <Paragraph>{t('tos_filing_fees_p1')}</Paragraph>

                    <Title level={4}>{t('tos_reviews_title')}</Title>
                    <Paragraph>{t('tos_reviews_p1')}</Paragraph>

                    <Title level={4}>{t('tos_force_majeure_title')}</Title>
                    <Paragraph>{t('tos_force_majeure_p1')}</Paragraph>

                    <Title level={4}>{t('tos_refuse_title')}</Title>
                    <Paragraph>{t('tos_refuse_p1')}</Paragraph>

                    <Paragraph>{t('tos_final_p1')}</Paragraph>

                </div>
            </Content>

            <AppFooter />
            <FloatingSupportButton />
        </Layout>
    );
};

export default TermsServicePage;