import React, { useState } from 'react';
import { Layout, Button, Image, Typography } from 'antd';
import './AppHeader.css'; // Importamos nuestros nuevos estilos
import { useTranslation } from 'react-i18next';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader: React.FC = () => {

    const { t, i18n } = useTranslation();

    const currentLanguage = i18n.language;

    const toggleLanguage = () => {
        const newLanguage = currentLanguage.startsWith('es') ? 'en' : 'es';
        i18n.changeLanguage(newLanguage);
    };

    return (
        <Header className="app-header">
            <div className="app-header-container">
                <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="header-logo">
                        <Image
                            width={75}
                            src="/images/logo.png"
                            preview={false}
                            alt="VisaGovAssist Logo"
                            className='header-logo-img'
                        />
                        <div style={{ color: 'white', fontWeight: 'bold'}} className='headerText'>
                            VisaGovAssist
                        </div>
                    </div>
                </a>
                
                <Button onClick={toggleLanguage}>
                    {currentLanguage.startsWith('es') ? t('header_button_en') : t('header_button_es')}
                </Button>
            </div>
        </Header >
    );
};

export default AppHeader;