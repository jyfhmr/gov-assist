import React from 'react';
import { Layout, Button, Image, Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './AppHeader.css';

const { Header } = Layout;

// Define los idiomas disponibles
const languages = [
    { key: 'en', label: 'English', countryCode: 'gb' },
    { key: 'es', label: 'Español', countryCode: 'es' },
    { key: 'fr', label: 'Français', countryCode: 'fr' },
    { key: 'de', label: 'Deutsch', countryCode: 'de' },
    { key: 'it', label: 'Italiano', countryCode: 'it' },
];

const AppHeader: React.FC = () => {
    const { t, i18n } = useTranslation();

    // Encuentra el objeto del idioma actual para mostrar su bandera y nombre
    const currentLanguage = languages.find(lang => i18n.language.startsWith(lang.key)) || languages[0];

    const handleLanguageChange: MenuProps['onClick'] = ({ key }) => {
        i18n.changeLanguage(key);
    };

    // Construye los items del menú para el Dropdown
    const menuItems: MenuProps['items'] = languages.map(lang => ({
        key: lang.key,
        label: (
            <Space>
                <img
                    src={`https://flagcdn.com/w20/${lang.countryCode.toLowerCase()}.png`}
                    alt={`${lang.label} flag`}
                    width="20"
                />
                {lang.label}
            </Space>
        ),
    }));

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
                        <div style={{ color: 'white', fontWeight: 'bold' }} className='headerText'>
                            {t('header_title')}
                        </div>
                    </div>
                </a>
                
                <Dropdown menu={{ items: menuItems, onClick: handleLanguageChange }}>
                    <Button type="primary">
                        <Space>
                            <img
                                src={`https://flagcdn.com/w20/${currentLanguage.countryCode.toLowerCase()}.png`}
                                alt={`${currentLanguage.label} flag`}
                                width="20"
                            />
                            {currentLanguage.label}
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </div>
        </Header >
    );
};

export default AppHeader;