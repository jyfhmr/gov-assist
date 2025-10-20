import React from 'react';
import { Layout, Typography, Card, Button, List, Image, Flex, Rate } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader/AppHeader';
import AppFooter from '../components/AppFooter/AppFooter';
import FloatingSupportButton from '../components/FloatingSupportButton/FloatingSupportButton';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const HomePage: React.FC = () => {
    const { t } = useTranslation();

    const features = [
        t('home_feature_1'),
        t('home_feature_2'),
        t('home_feature_3'),
        t('home_feature_4'),
        t('home_feature_5'),
        t('home_feature_6'),
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <AppHeader />
            <Content className="content-with-fixed-header" style={{ backgroundColor: '#f5f5f5' }}>
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <Title level={2}>{t('home_how_it_works_title')}</Title>
                    <a href="https://https://www.youtube.com/watch?time_continue=4&v=ZC6UegStmto&embeds_referring_euri=https%3A%2F%2Fvisa.govassist.com%2F&source_ve_path=MjM4NTE.youtube.com" target="_blank" rel="noopener noreferrer">
                        <Image
                            width={'100%'}
                            style={{ maxWidth: '600px', cursor: 'pointer', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                            src="/images/video-thumbnail.webp" // Asegúrate de tener esta imagen en tu carpeta public/images
                            preview={false}
                            alt="How it works video thumbnail"
                        />
                    </a>
                </div>

                <div style={{ padding: '40px 20px' }}>
                    <Flex justify="center" gap="large" wrap>
                        {/* Simulación de reseñas de Trustpilot */}
                    </Flex>
                </div>

                <div className="services-section" style={{ padding: '40px 20px', backgroundColor: 'white' }}>
                    <Title level={2} style={{ textAlign: 'center' }}>{t('home_our_services_title')}</Title>
                    <Flex justify="center" style={{ marginTop: '40px' }}>
                        <Card
                            className="service-card"
                            style={{ width: 350, textAlign: 'center' }}
                            headStyle={{ backgroundColor: '#001529', color: 'white', border: 0 }}
                            title={t('home_service_esta_title')}
                        >
                            <Title level={1}>{t('home_service_price')}</Title>
                            <Text type="secondary">{t('home_service_subtitle')}</Text>
                            <RouterLink to="/form">
                                <Button type="primary" size="large" style={{ width: '100%', marginTop: 24, marginBottom: 24 }}>
                                    {t('home_start_now_button')}
                                </Button>
                            </RouterLink>
                            <List
                                dataSource={features}
                                renderItem={(item) => (
                                    <List.Item style={{ border: 'none', padding: '4px 0', textAlign: 'left' }}>
                                        <Text>✓ {item}</Text>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Flex>
                </div>
            </Content>
            <AppFooter />
            <FloatingSupportButton />
        </Layout>
    );
};

export default HomePage;