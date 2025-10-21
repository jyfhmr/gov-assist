import React from 'react';
import { Layout, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader/AppHeader';
import AppFooter from '../components/AppFooter/AppFooter';
import FloatingSupportButton from '../components/FloatingSupportButton/FloatingSupportButton';
import '../styles/App.css';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const PrivacyPolicyPage: React.FC = () => {
    const { t } = useTranslation();
    const { token: { colorBgContainer } } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <AppHeader />

            <Content className="content-with-fixed-header">
                <div className="form-container" style={{ background: colorBgContainer, borderRadius: 8, marginTop: 24 }}>
                    <Title level={2}>{t('privacy_title')}</Title>
                    <Paragraph type="secondary">{t('privacy_last_modified')}</Paragraph>

                    <Paragraph>{t('privacy_intro_p1')}</Paragraph>

                    <Title level={3}>{t('privacy_definitions_title')}</Title>
                    <Title level={4}>{t('privacy_def_personal_data_title')}</Title>
                    <Paragraph>{t('privacy_def_personal_data_p1')}</Paragraph>
                    <Title level={4}>{t('privacy_def_data_subject_title')}</Title>
                    <Paragraph>{t('privacy_def_data_subject_p1')}</Paragraph>
                    <Title level={4}>{t('privacy_def_processing_title')}</Title>
                    <Paragraph>{t('privacy_def_processing_p1')}</Paragraph>
                    <Title level={4}>{t('privacy_def_consent_title')}</Title>
                    <Paragraph>{t('privacy_def_consent_p1')}</Paragraph>

                    <Title level={3}>{t('privacy_info_collected_title')}</Title>
                    <Paragraph>{t('privacy_info_collected_p1')}</Paragraph>
                    <ul>
                        <li><Paragraph>{t('privacy_info_cat_identifiers')}</Paragraph></li>
                        <li><Paragraph>{t('privacy_info_cat_other')}</Paragraph></li>
                        <li><Paragraph>{t('privacy_info_cat_characteristics')}</Paragraph></li>
                        <li><Paragraph>{t('privacy_info_cat_internet')}</Paragraph></li>
                        <li><Paragraph>{t('privacy_info_cat_geolocation')}</Paragraph></li>
                        <li><Paragraph>{t('privacy_info_cat_audio_visual')}</Paragraph></li>
                        <li><Paragraph>{t('privacy_info_cat_professional')}</Paragraph></li>
                    </ul>
                    <Title level={4}>{t('privacy_info_personal_data_title')}</Title>
                    <Paragraph>{t('privacy_info_personal_data_p1')}</Paragraph>
                    <Title level={4}>{t('privacy_info_tech_title')}</Title>
                    <Paragraph>{t('privacy_info_tech_p1')}</Paragraph>
                    <Paragraph>{t('privacy_info_tech_p2')}</Paragraph>
                    <Paragraph>{t('privacy_info_tech_p3')}</Paragraph>
                    <Paragraph><a href="#">{t('privacy_disable_cookies')}</a></Paragraph> {/* Link needs actual functionality */}
                    <Title level={4}>{t('privacy_gdpr_email_title')}</Title>
                    <Paragraph>{t('privacy_gdpr_email_p1')}</Paragraph>
                    <Title level={5}>{t('privacy_gdpr_support_title')}</Title>
                    <Paragraph>{t('privacy_gdpr_support_p1')}</Paragraph>
                    <Paragraph>{t('privacy_gdpr_support_p2')}</Paragraph>
                    <Paragraph>{t('privacy_gdpr_support_p3')}</Paragraph>
                    <Title level={5}>{t('privacy_gdpr_billing_title')}</Title>
                    <Paragraph>{t('privacy_gdpr_billing_p1')}</Paragraph>
                    <Paragraph>{t('privacy_gdpr_billing_p2')}</Paragraph>
                    <Paragraph>{t('privacy_gdpr_billing_p3')}</Paragraph>
                    <Paragraph>{t('privacy_gdpr_billing_p4')}</Paragraph>
                    <Paragraph>{t('privacy_gdpr_billing_p5')}</Paragraph>
                    <Paragraph>{t('privacy_gdpr_consent_p1')}</Paragraph>

                    <Title level={3}>{t('privacy_how_we_use_title')}</Title>
                    <Title level={4}>{t('privacy_how_personal_data_title')}</Title>
                    <Paragraph>{t('privacy_how_personal_data_p1')}</Paragraph>
                    <ul>
                      <li><Paragraph>{t('privacy_how_personal_data_li1')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li2')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li3')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li4')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li5')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li6')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li7')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li8')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li9')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li10')}</Paragraph></li>
                    </ul>
                    <Paragraph>{t('privacy_how_personal_data_p2')}</Paragraph>
                    <Paragraph>{t('privacy_how_personal_data_p3')}</Paragraph>
                    <Paragraph>{t('privacy_how_personal_data_p4')}</Paragraph>
                     <ul>
                      <li><Paragraph>{t('privacy_how_personal_data_li11')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li12')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li13')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li14')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li15')}</Paragraph></li>
                      <li><Paragraph>{t('privacy_how_personal_data_li16')}</Paragraph></li>
                    </ul>
                    <Paragraph>{t('privacy_how_personal_data_p5')}</Paragraph>
                    <Title level={4}>{t('privacy_how_auto_collected_title')}</Title>
                    <Paragraph>{t('privacy_how_auto_collected_p1')}</Paragraph>
                    <Title level={4}>{t('privacy_how_protect_title')}</Title>
                    <Paragraph>{t('privacy_how_protect_p1')}</Paragraph>

                    <Title level={3}>{t('privacy_your_rights_title')}</Title>
                    <Paragraph>{t('privacy_your_rights_p1')}</Paragraph>

                    <Title level={3}>{t('privacy_other_websites_title')}</Title>
                    <Paragraph>{t('privacy_other_websites_p1')}</Paragraph>

                    <Title level={3}>{t('privacy_eu_info_title')}</Title>
                    <Paragraph>{t('privacy_eu_info_p1')}</Paragraph>
                    <Paragraph>{t('privacy_eu_adherence_p1')}</Paragraph>
                    <Paragraph>{t('privacy_eu_enforcement_p1')}</Paragraph>
                    <Title level={4}>{t('privacy_eu_lawful_basis_title')}</Title>
                    <Paragraph>{t('privacy_eu_lawful_basis_p1')}</Paragraph>
                    {/* Add table if needed */}
                    <Title level={4}>{t('privacy_eu_rights_title')}</Title>
                    <Paragraph>{t('privacy_eu_rights_p1')}</Paragraph>
                    <ul>
                        <li><Paragraph>{t('privacy_eu_rights_li1')}</Paragraph></li>
                        <li><Paragraph>{t('privacy_eu_rights_li2')}</Paragraph></li>
                        <li><Paragraph>{t('privacy_eu_rights_li3')}</Paragraph></li>
                    </ul>
                    <Paragraph>{t('privacy_eu_rights_p2')}</Paragraph>
                    <Paragraph>{t('privacy_eu_complaints_p1')}</Paragraph>
                    <Paragraph>{t('privacy_eu_jams_p1')}</Paragraph>
                    <Paragraph>{t('privacy_eu_arbitration_p1')}</Paragraph>
                    <Paragraph>{t('privacy_eu_arbitration_p2')}</Paragraph>
                    <Paragraph>{t('privacy_eu_dpa_p1')}</Paragraph>
                    <Paragraph>{t('privacy_eu_ico_address')}</Paragraph>
                    <Paragraph>{t('privacy_eu_hr_data_p1')}</Paragraph>

                    <Title level={3}>{t('privacy_websites_title')}</Title>
                    <Paragraph>{t('privacy_websites_p1')}</Paragraph>

                    <Title level={3}>{t('privacy_changes_title')}</Title>
                    <Paragraph>{t('privacy_changes_p1')}</Paragraph>

                    <Title level={3}>{t('privacy_children_title')}</Title>
                    <Paragraph>{t('privacy_children_p1')}</Paragraph>
                    <Paragraph>{t('privacy_children_p2')}</Paragraph>
                    <Paragraph>{t('privacy_children_p3')}</Paragraph>

                    <Title level={3}>{t('privacy_retention_title')}</Title>
                    <Paragraph>{t('privacy_retention_p1')}</Paragraph>

                    <Title level={3}>{t('privacy_oba_title')}</Title>
                    <Paragraph>{t('privacy_oba_p1')}</Paragraph>
                    <Paragraph>{t('privacy_oba_p2')}</Paragraph>

                    <Title level={3}>{t('privacy_california_title')}</Title>
                    <Paragraph>{t('privacy_california_p1')}</Paragraph>
                    <Paragraph>{t('privacy_california_p2')}</Paragraph>
                    <ul>
                        <li><Paragraph>{t('privacy_california_disclosure_li1')}</Paragraph></li>
                        <li><Paragraph>{t('privacy_california_disclosure_li2')}</Paragraph></li>
                        <li><Paragraph>{t('privacy_california_disclosure_li3')}</Paragraph></li>
                        <li><Paragraph>{t('privacy_california_disclosure_li4')}</Paragraph></li>
                    </ul>
                    <Paragraph>{t('privacy_california_p3')}</Paragraph>
                    <Paragraph>{t('privacy_california_categories_collected_title')}</Paragraph>
                    {/* Add lists if needed */}
                    <Paragraph>{t('privacy_california_categories_disclosed_title')}</Paragraph>
                    {/* Add lists if needed */}
                    <Paragraph>{t('privacy_california_p4')}</Paragraph>

                    <Title level={3}>{t('privacy_international_title')}</Title>
                    <Paragraph>{t('privacy_international_p1')}</Paragraph>
                    <Paragraph>{t('privacy_international_p2')}</Paragraph>
                    <Paragraph>{t('privacy_international_p3')}</Paragraph>
                    <Paragraph>{t('privacy_international_p4')}</Paragraph>
                    <Paragraph>{t('privacy_international_p5')}</Paragraph>
                    <Paragraph>{t('privacy_international_p6')}</Paragraph>
                    <Paragraph>{t('privacy_international_p7')}</Paragraph>

                    <Title level={3}>{t('privacy_contact_title')}</Title>
                    <Paragraph>{t('privacy_contact_p1')}</Paragraph>

                </div>
            </Content>

            <AppFooter />
            <FloatingSupportButton />
        </Layout>
    );
};

export default PrivacyPolicyPage;