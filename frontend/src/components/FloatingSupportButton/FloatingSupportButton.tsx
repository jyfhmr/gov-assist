import React from 'react';
import { FloatButton } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { SUPPORT_EMAIL } from '../../constants';

const FloatingSupportButton: React.FC = () => {
    const { t } = useTranslation();

    return (
        <FloatButton
            // El icono que se mostrará. CustomerServiceOutlined es perfecto para soporte.
            icon={<CustomerServiceOutlined style={{width:"120px"}}/>}

            // La acción que se ejecuta al hacer clic.
            href={`mailto:${SUPPORT_EMAIL}`}

            // El texto que aparece al pasar el mouse por encima.
            tooltip={t('floating_button_tooltip')}

            // 'primary' para que use el color principal de tu tema y destaque.
            type="primary"

            // Estilo opcional para asegurar que esté por encima de todo.
            style={{
                width: '60px',
                height: '60px',
                zIndex: 100,
                transform: "scale(1.1)"
            }}

        />
    );
};

export default FloatingSupportButton;