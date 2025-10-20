import React from 'react';
import { Layout, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Footer } = Layout;
const { Paragraph, Text, Link } = Typography;

const AppFooter: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Footer className="main-footer" style={{ backgroundColor: "#0A2540", color: "white" }}>
            <div style={{ marginBottom: "16px", fontSize: "20px", fontWeight: "bold" }}>
                {t('header_title')}
            </div>
            <Paragraph style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "10px" }}>
                {t('footer_disclaimer')}
            </Paragraph>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                    paddingTop: "16px",
                    marginTop: "16px",
                    gap: "16px",
                }}
            >
                <Text style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>
                    {t('footer_copyright')}
                </Text>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        justifyContent: "center",
                    }}
                >
                    {/* <Link href="#" style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>{t('footer_terms_use')}</Link>
                    <Link href="#" style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>{t('footer_terms_service')}</Link>
                    <Link href="#" style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>{t('footer_privacy_policy')}</Link>
                    <Link href="#" style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>{t('footer_legal_disclaimer')}</Link>
                    <Link href="#" style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>{t('footer_refund')}</Link> */}
                </div>
            </div>
        </Footer>
    );
};

export default AppFooter;