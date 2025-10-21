import React from 'react';
import { Layout, Typography, theme, List } from 'antd';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader/AppHeader';
import AppFooter from '../components/AppFooter/AppFooter';
import FloatingSupportButton from '../components/FloatingSupportButton/FloatingSupportButton';
import '../styles/App.css'; // Importa los estilos globales

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const RefundPolicyPage: React.FC = () => {
    const { t } = useTranslation();
    const { token: { colorBgContainer } } = theme.useToken();

    const refundRequestItems = [
        t('refund_policy_terms_li1'),
        t('refund_policy_terms_li2'),
        t('refund_policy_terms_li3'),
        t('refund_policy_terms_li4'),
        t('refund_policy_terms_li5'),
    ];

    const paymentMethodItems = [
        t('refund_fee_payment_methods_li1'),
        t('refund_fee_payment_methods_li2'),
        t('refund_fee_payment_methods_li3'),
        t('refund_fee_payment_methods_li4'),
        t('refund_fee_payment_methods_li5'),
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <AppHeader />

            <Content className="content-with-fixed-header">
                {/* Usamos form-container para consistencia de padding y fondo */}
                <div className="form-container" style={{ background: colorBgContainer, borderRadius: 8, marginTop: 24 }}>
                    <Title level={2}>{t('refund_title')}</Title>
                    <Paragraph type="secondary">{t('refund_last_modified')}</Paragraph>

                    <Paragraph>{t('refund_intro_p1')}</Paragraph>

                    <Title level={3}>{t('refund_policy_terms_title')}</Title>
                    <Paragraph>{t('refund_policy_terms_p1')}</Paragraph>
                    <Paragraph>{t('refund_policy_terms_p2')}</Paragraph>
                    <List
                        dataSource={refundRequestItems}
                        renderItem={(item) => <List.Item style={{border: 'none', paddingLeft: '20px'}}>• {item}</List.Item>}
                    />
                    <Paragraph>{t('refund_policy_terms_p3')}</Paragraph>

                    <Title level={3}>{t('refund_non_refundable_title')}</Title>
                    <Paragraph>{t('refund_non_refundable_p1')}</Paragraph>

                    <Title level={3}>{t('refund_chargebacks_title')}</Title>
                    <Paragraph>{t('refund_chargebacks_p1')}</Paragraph>
                    <Paragraph>{t('refund_chargebacks_p2')}</Paragraph>
                    <Paragraph>{t('refund_chargebacks_p3')}</Paragraph>

                    <Title level={3}>{t('refund_assurance_title')}</Title>
                    <Paragraph>{t('refund_assurance_p1')}</Paragraph>

                    <Title level={3}>{t('refund_satisfaction_title')}</Title>
                    <Paragraph>{t('refund_satisfaction_p1')}</Paragraph>
                    <Paragraph>{t('refund_satisfaction_p2')}</Paragraph>

                    <Title level={3}>{t('refund_not_covered_title')}</Title>
                    <Paragraph>{t('refund_not_covered_p1')}</Paragraph>
                    <Paragraph>{t('refund_not_covered_p2')}</Paragraph>

                    <Title level={3}>{t('refund_disclaimer_title')}</Title>
                    <Paragraph>{t('refund_disclaimer_p1')}</Paragraph>
                    <Paragraph>{t('refund_disclaimer_p2')}</Paragraph>

                    <Title level={3}>{t('refund_fee_details_title')}</Title>
                    <Title level={4}>{t('refund_fee_travel_docs_title')}</Title>
                    <Paragraph>{t('refund_fee_travel_docs_p1')}</Paragraph>
                    <Title level={4}>{t('refund_fee_payment_methods_title')}</Title>
                    <Paragraph>{t('refund_fee_payment_methods_p1')}</Paragraph>
                     <List
                        dataSource={paymentMethodItems}
                        renderItem={(item) => <List.Item style={{border: 'none', paddingLeft: '20px'}}>• {item}</List.Item>}
                    />
                    <Paragraph>{t('refund_fee_payment_methods_p2')}</Paragraph>
                    <Paragraph>{t('refund_fee_payment_methods_p3')}</Paragraph>
                    <Paragraph>{t('refund_fee_payment_methods_p4')}</Paragraph>
                    <Paragraph>{t('refund_fee_payment_methods_p5')}</Paragraph>
                    <Title level={4}>{t('refund_fee_handling_title')}</Title>
                    <Paragraph>{t('refund_fee_handling_p1')}</Paragraph>
                    {/* <Title level={4}>{t('refund_fee_credit_card_title')}</Title>
                    <Paragraph>{t('refund_fee_credit_card_p1')}</Paragraph> */}

                </div>
            </Content>

            <AppFooter />
            <FloatingSupportButton />
        </Layout>
    );
};

export default RefundPolicyPage;