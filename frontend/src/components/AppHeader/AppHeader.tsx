import React, { useState } from 'react';
import { Layout, Button, Image, Typography } from 'antd';
import './AppHeader.css'; // Importamos nuestros nuevos estilos

const { Header } = Layout;
const { Text } = Typography;

const AppHeader: React.FC = () => {
    // Un estado simple para simular el cambio de idioma
    const [language, setLanguage] = useState('Español');

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'Español' ? 'English' : 'Español'));
    };

    return (
        <Header style={{
            backgroundColor: '#001529',
            padding: '24px 15px', // Padding consistente para móvil y escritorio
            height: 'auto' // Altura automática para que se ajuste en móvil
        }}>
            <div className="app-header-container">

                <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>

                    <div className="header-logo">
                        <Image
                            width={75} // Tamaño ajustado para el logo
                            src="/images/logo.png"
                            preview={false}
                            alt="VisaGovAssist Logo"
                        />
                        <p style={{ color: 'white', fontWeight: 'bold' }} className='headerText'>
                            VisaGovAssist
                        </p>
                    </div>

                </a>
                
                <Button onClick={toggleLanguage}>{language}</Button>
            </div>

        </Header >
    );
};

export default AppHeader;