import React from 'react';
import { Layout, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Footer } = Layout;
const { Link } = Typography;

const AppFooter: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Footer className="main-footer" style={{ backgroundColor: "#0A2540", color: "white" }}>
            <div style={{ marginBottom: "16px", fontSize: "20px", fontWeight: "bold" }}>
                {t('header_title')}
            </div>
            <p style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>
                {t('footer_disclaimer')}
            </p>
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
                {/* Añadí margin: 0 para mejor alineación vertical */}
                <p style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px", margin: 0 }}>
                    {t('footer_copyright')}
                </p>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        justifyContent: "center",
                    }}
                >
                    <Link href="/terms-of-use" style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>{t('footer_terms_use')}</Link>
                    <Link href="/terms-of-service" style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>{t('footer_terms_service')}</Link>
                    <Link href="/privacy-policy" style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>{t('footer_privacy_policy')}</Link>
                    <Link href="/legal-disclaimer" style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>{t('footer_legal_disclaimer')}</Link>
                    <Link href="/refund-policy" style={{ color: "rgba(255, 255, 255, 0.65)", fontSize: "12px" }}>{t('footer_refund')}</Link>
                </div>
                {/* --- IMAGEN AÑADIDA AQUÍ --- */}
                <img
                    src="https://visa.govassist.com/images/ssl.png"
                    alt="SSL Secured"
                    style={{ height: "32px", width: "auto" }}
                />
                {/* --------------------------- */}
            </div>
        </Footer>
    );
};

export default AppFooter;