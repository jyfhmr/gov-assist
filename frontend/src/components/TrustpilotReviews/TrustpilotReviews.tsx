import React from 'react';
import { Carousel, Card, Typography, Tag, Rate, Space, Image, Flex } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next'; // Importa Trans
import './TrustpilotReviews.css'; // Importaremos un CSS para los estilos

const { Title, Paragraph, Text } = Typography;

// Datos de ejemplo basados en tu captura de pantalla
const reviewData = [
    { id: 1, author: 'Paola Del Muro', date: '1 day ago', rating: 5, title: 'Good response', text: 'Easy, fast response and understandable instructions.' },
    { id: 2, author: 'Gustavo', date: '1 day ago', rating: 5, title: 'Very easy & faster service', text: 'Very easy & faster service' },
    { id: 3, author: 'Fatmin', date: '1 day ago', rating: 5, title: 'Superbe service very hel...', text: 'Very professional and helpful' },
    { id: 4, author: 'Dominick', date: '2 days ago', rating: 5, title: 'Quick turnaround!', text: 'Easy online' },
    { id: 5, author: 'Michelle', date: '2 days ago', rating: 5, title: 'It\'s taking a long time to g...', text: 'It\'s taking a long time to get my passport' },
];

const TrustpilotReviews: React.FC = () => {
    const { t } = useTranslation();

    // Configuración responsiva para el carrusel
    const carouselSettings = {
        dots: false, // Oculta los puntos de navegación
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Default para escritorio
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1200, // Tablets grandes
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 992, // Tablets
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 768, // Móviles grandes
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        // Usamos un div wrapper principal
        <div className="review-component-wrapper">

            {/* --- SECCIÓN SUPERIOR DE TRUSTPILOT --- */}
            <div className="trustpilot-summary">
                <Paragraph>
                    <Trans
                        i18nKey="reviews_summary"
                        components={{ strong: <strong /> }}
                    />
                </Paragraph>
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Trustpilot_Logo_%282022%29.svg/640px-Trustpilot_Logo_%282022%29.svg.png" // Asegúrate de tener esta imagen
                    width={110}
                    preview={false}
                    alt="Trustpilot Logo"
                />
            </div>
            
            {/* --- CARRUSEL DE RESEÑAS --- */}
            <div className="review-carousel-wrapper">
                <Carousel {...carouselSettings} className="review-carousel">
                    {reviewData.map(review => (
                        <div key={review.id} className="review-slide">
                            <Card className="review-card">
                                <div>
                                    <Space direction="vertical" align="start">
                                        <Rate disabled defaultValue={review.rating} className="review-stars" />
                                        <Tag icon={<CheckCircleFilled />} color="success">
                                            {t('verified_review')}
                                        </Tag>
                                    </Space>
                                    <Title level={5} style={{ marginTop: 16 }}>{review.title}</Title>
                                    <Paragraph>{review.text}</Paragraph>
                                </div>
                                <Text type="secondary">{review.author}, {review.date}</Text>
                            </Card>
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* --- SECCIÓN INFERIOR DE ESTADÍSTICAS --- */}
            <Flex justify="center" gap="large" wrap="wrap" className="social-proof-stats">
                <Space className="proof-item" align="center" size="middle">
                    <CheckCircleFilled className="proof-icon" />
                    <Text strong>{t('social_proof_customers')}</Text>
                </Space>
                <Space className="proof-item" align="center" size="middle">
                    <CheckCircleFilled className="proof-icon" />
                    <Text strong>{t('social_proof_experience')}</Text>
                </Space>
                <Space className="proof-item" align="center" size="middle">
                    <CheckCircleFilled className="proof-icon" />
                    <Text strong>{t('social_proof_delivery')}</Text>
                </Space>
            </Flex>

        </div>
    );
};

export default TrustpilotReviews;