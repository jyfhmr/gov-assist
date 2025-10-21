import React from 'react';
import { Layout, Typography, Card, Button, List, Flex } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/AppHeader/AppHeader';
import AppFooter from '../components/AppFooter/AppFooter';
import FloatingSupportButton from '../components/FloatingSupportButton/FloatingSupportButton';
import TrustpilotReviews from '../components/TrustpilotReviews/TrustpilotReviews';

const { Content } = Layout;
const { Text } = Typography;

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

    const youtubeVideoId = 'ZC6UegStmto';
    const embedUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <AppHeader />
            <Content className="content-with-fixed-header" style={{ backgroundColor: '#f5f5f5' }}>
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <p className='titles'>{t('home_how_it_works_title')}</p>
                    <div className="video-responsive">
                        <iframe
                            width="560" // Ancho estándar de YouTube
                            height="315" // Altura estándar (relación 16:9)
                            src={embedUrl}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen // Permite pantalla completa
                        ></iframe>
                    </div>
                </div>

                <TrustpilotReviews />

                <div className="services-section" style={{ padding: '40px 20px', backgroundColor: 'white' }}>
                    <p className='titles'>{t('home_our_services_title')}</p>
                    <Flex justify="center" style={{ marginTop: '40px' }}>
                        <Card
                            className="service-card"
                            styles={{header:{fontSize:"36px"}}}
                            style={{ width: 350, textAlign: 'center', }}
                            headStyle={{ backgroundColor: '#001529', color: 'white', border: 0 }}
                            title={t('home_service_esta_title')}
                        >
                            <p className='bigger-titles'>{t('home_service_price')}</p>
                            <Text type="secondary" style={{textDecoration:"underline"}}>{t('home_service_subtitle')}</Text>
                            <RouterLink to="/form">
                                <Button type="primary" size="large" style={{ width: '100%', marginTop: 24, marginBottom: 24 , fontSize:"26px"}}>
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