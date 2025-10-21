import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../constants';

const { Title } = Typography;

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {

            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
                credentials: 'include', // Necesario para que el navegador guarde la cookie de sesión
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Credenciales inválidas');
            }

            // Guardamos la bandera en localStorage solo como indicador visual/UX,
            // la seguridad real depende de la cookie de sesión del backend.
            localStorage.setItem('isAdminLoggedIn', 'true');
            navigate('/admin');

        } catch (error) {
            message.error('Error al iniciar sesión: ' + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
            <Card style={{ width: 400 }}>
                <Title level={3} style={{ textAlign: 'center' }}>Admin Login</Title>
                <Form name="login" onFinish={onFinish} layout="vertical" autoComplete="off">
                    <Form.Item label="Usuario" name="username" rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Iniciar Sesión
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginPage;