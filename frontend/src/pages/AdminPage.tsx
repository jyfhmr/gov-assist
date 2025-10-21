import React, { useEffect, useState } from 'react';
import { Layout, Table, Typography, Tag, Image, Spin, Button, message, Empty, List as AntdList, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { ColumnsType } from 'antd/es/table';
import { LogoutOutlined, CheckCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined, ExclamationCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { GET_DATA_URL } from '../constants';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

// Función para obtener los datos
const fetchApplications = async (page = 1) => {
    // Asegúrate de que esta URL sea correcta para producción
    const response = await fetch( `${GET_DATA_URL}?page=${page}`, {
        credentials: 'include',
    });
    if (response.status === 401) throw new Error('Unauthorized');
    if (!response.ok) {
        const errorText = await response.text(); // Intenta leer el cuerpo del error si no es JSON
        throw new Error(`Network response was not ok: ${errorText}`);
    }

    const responseAsJson = await response.json()

    console.log("los datos",responseAsJson)

    return responseAsJson;
};

// --- Funciones Auxiliares de Renderizado ---
const renderBooleanTag = (value: any) => {
    if (value === true) return <Tag color="success" icon={<CheckCircleOutlined />}>Sí</Tag>;
    if (value === false) return <Tag color="error" icon={<CloseCircleOutlined />}>No</Tag>;
    return <Tag icon={<QuestionCircleOutlined />}>N/A</Tag>;
};

const renderEligibilityTag = (value: any) => {
    if (value === true) return <Tag color="warning" icon={<ExclamationCircleOutlined />}>Sí (Alerta)</Tag>;
    if (value === false) return <Tag color="default">No</Tag>;
    return <Tag icon={<QuestionCircleOutlined />}>N/A</Tag>;
}

const renderSimpleList = (list: any[], keyPrefix: string, renderItem: (item: any) => React.ReactNode) => {
    if (!list || list.length === 0) return <Tag>Ninguno</Tag>;
    return (
        <AntdList
            size="small"
            dataSource={list}
            renderItem={(item, index) => <AntdList.Item key={`${keyPrefix}-${index}`} style={{ padding: '2px 0', border: 'none' }}>{renderItem(item)}</AntdList.Item>}
            style={{ padding: 0 }}
        />
    );
};

const formatDateObject = (dateObj: { day?: number; month?: number; year?: string }) => {
    if (!dateObj || (!dateObj.day && !dateObj.month && !dateObj.year)) return '-';
    return `${dateObj.day || '??'}/${dateObj.month || '??'}/${dateObj.year || '????'}`;
};

const renderDownloadableImage = (files: any[], defaultFileName: string = 'image.png') => {
    // 'files' es el array guardado en el JSON (ej: passportPhoto, selfie)
    const file = files?.[0];
    const thumbUrl = file?.thumbUrl; // Este es nuestro Base64

    if (!thumbUrl) {
        return <Tag color="orange">No Foto</Tag>;
    }

    // El nombre del archivo que guardamos, o uno por defecto
    const fileName = file.name || defaultFileName;

    return (
        <Space direction="vertical">
            <Image src={thumbUrl} width={80} alt={fileName} />
            <Button
                href={thumbUrl}
                download={fileName} // El atributo 'download' fuerza la descarga
                icon={<DownloadOutlined />}
                size="small"
                type="link"
            >
                Descargar
            </Button>
        </Space>
    );
};

const AdminPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => { if (localStorage.getItem('isAdminLoggedIn') !== 'true') navigate('/login'); }, [navigate]);

    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: ['applications', currentPage],
        queryFn: () => fetchApplications(currentPage),
        retry: (failureCount, error: any) => { if (error?.message === 'Unauthorized') return false; return failureCount < 3; },
    });

    useEffect(() => { if (error && (error as Error).message === 'Unauthorized') { localStorage.removeItem('isAdminLoggedIn'); message.error('Sesión expirada o no autorizada.'); navigate('/login'); } }, [error, navigate]);

    const handleLogout = () => { localStorage.removeItem('isAdminLoggedIn'); navigate('/login'); };

    // --- ✨ DEFINICIÓN DE COLUMNAS AJUSTADA AL JSON COMPLETO ---
    const columns: ColumnsType<any> = [
        // --- Columnas Fijas (Importantes) ---
        { title: 'ID', dataIndex: 'id', key: 'id', fixed: 'left', width: 60, sorter: (a, b) => a.id - b.id },
        { title: 'Fecha Creación', dataIndex: 'created_at', key: 'created_at', fixed: 'left', width: 160, render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm'), sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix() },
        { title: 'Email', dataIndex: ['form_data', 'email'], key: 'email', fixed: 'left', width: 250 },
        { title: 'Nombre Completo (Fact.)', dataIndex: ['form_data', 'fullName'], key: 'billingName', fixed: 'left', width: 200 }, // Del PaymentForm

        // --- Información del Aplicante ---
        { title: 'Nombre', dataIndex: ['form_data', 'firstName'], key: 'firstName', width: 150 },
        { title: 'Apellido', dataIndex: ['form_data', 'familyName'], key: 'familyName', width: 150 },
        { 
            title: 'Foto Pasaporte', 
            dataIndex: ['form_data', 'passportPhoto'], 
            key: 'passportPhoto', 
            width: 150, 
            render: (files) => renderDownloadableImage(files, 'passport.png')
        },
        { 
            title: 'Selfie', 
            dataIndex: ['form_data', 'selfie'], 
            key: 'selfie', 
            width: 150, 
            render: (files) => renderDownloadableImage(files, 'selfie.png')
        },
        { title: 'Fecha Nac.', dataIndex: ['form_data', 'dob'], key: 'dob', width: 120, render: formatDateObject },
        { title: 'Ciudad Nac.', dataIndex: ['form_data', 'cityOfBirth'], key: 'cityOfBirth', width: 150 },
        { title: 'País Nac.', dataIndex: ['form_data', 'countryOfBirth'], key: 'countryOfBirth', width: 150 },
        { title: 'Alias', dataIndex: ['form_data', 'aliases'], key: 'aliases', width: 200, render: (aliases) => renderSimpleList(aliases, 'alias', (item) => `${item.firstName} ${item.familyName}`) },

        // --- Información del Pasaporte ---
        { title: 'País Ciudadanía', dataIndex: ['form_data', 'countryOfCitizenship'], key: 'countryOfCitizenship', width: 150 },
        { title: 'País Emisor', dataIndex: ['form_data', 'issuingCountry'], key: 'issuingCountry', width: 150 },
        { title: 'N° Pasaporte', dataIndex: ['form_data', 'passportNumber'], key: 'passportNumber', width: 150 },
        { title: 'ID Nacional', dataIndex: ['form_data', 'nationalId'], key: 'nationalId', width: 150 },
        { title: 'ID Personal', dataIndex: ['form_data', 'personalId'], key: 'personalId', width: 150 },
        { title: 'Género', dataIndex: ['form_data', 'gender'], key: 'gender', width: 100 },
        { title: 'Otros Docs', dataIndex: ['form_data', 'otherDocuments'], key: 'otherDocs', width: 300, render: (docs) => renderSimpleList(docs, 'otherdoc', (item) => `${item.documentType} (${item.issuingCountry}): ${item.documentNumber} (Exp: ${item.expirationYear})`) },
        { title: 'Ciudadano Otro País?', dataIndex: ['form_data', 'isOtherCitizenNow'], key: 'isOtherCitizenNow', width: 100, render: renderBooleanTag },
        { title: 'Ciudadanías Actuales', dataIndex: ['form_data', 'currentCitizenships'], key: 'currentCitizenships', width: 250, render: (cits) => renderSimpleList(cits, 'currcit', (item) => `${item.country} (${item.how})`) },
        { title: 'Fue Ciudadano Otro País?', dataIndex: ['form_data', 'wasOtherCitizen'], key: 'wasOtherCitizen', width: 100, render: renderBooleanTag },
        { title: 'Ciudadanías Pasadas', dataIndex: ['form_data', 'pastCitizenships'], key: 'pastCitizenships', width: 300, render: (cits) => renderSimpleList(cits, 'pastcit', (item) => `${item.country} (${formatDateObject(item.fromDate)} - ${formatDateObject(item.toDate)})`) },
        { title: 'Miembro GE?', dataIndex: ['form_data', 'isGlobalEntryMember'], key: 'isGlobalEntryMember', width: 100, render: renderBooleanTag },
        { title: 'PASSID GE', dataIndex: ['form_data', 'passId'], key: 'passId', width: 150 },

        // --- Elegibilidad (Solo las alertas) ---
        { title: 'Alerta Salud?', dataIndex: ['form_data', 'q1_health'], key: 'q1', width: 100, render: renderEligibilityTag },
        { title: 'Alerta Crimen?', dataIndex: ['form_data', 'q2_crime'], key: 'q2', width: 100, render: renderEligibilityTag },
        { title: 'Alerta Drogas?', dataIndex: ['form_data', 'q3_drugs'], key: 'q3', width: 100, render: renderEligibilityTag },
        { title: 'Alerta Terror?', dataIndex: ['form_data', 'q4_terror'], key: 'q4', width: 100, render: renderEligibilityTag },
        { title: 'Alerta Fraude?', dataIndex: ['form_data', 'q5_fraud'], key: 'q5', width: 100, render: renderEligibilityTag },
        { title: 'Alerta Empleo?', dataIndex: ['form_data', 'q6_employment'], key: 'q6', width: 100, render: renderEligibilityTag },
        { title: 'Alerta Denegación?', dataIndex: ['form_data', 'q7_visa_denial'], key: 'q7', width: 100, render: renderEligibilityTag },
        { title: 'Alerta Overstay?', dataIndex: ['form_data', 'q8_overstay'], key: 'q8', width: 100, render: renderEligibilityTag },
        { title: 'Alerta Viaje?', dataIndex: ['form_data', 'q9_travel'], key: 'q9', width: 100, render: renderEligibilityTag },

        // --- Información Personal ---
        { title: 'Dirección 1', dataIndex: ['form_data', 'address1'], key: 'address1', width: 250 },
        { title: 'Ciudad', dataIndex: ['form_data', 'city'], key: 'city', width: 150 },
        { title: 'País Residencia', dataIndex: ['form_data', 'country'], key: 'country', width: 150 },
        { title: 'Teléfono', dataIndex: ['form_data', 'phoneNumber'], key: 'phoneNumber', width: 180, render: (_, record) => `${record.form_data?.countryPhoneCode || ''} ${record.form_data?.phoneNumber || ''}` },
        { title: 'Nombre Madre', dataIndex: ['form_data', 'motherFirstName'], key: 'motherName', width: 200, render: (_, record) => `${record.form_data?.motherFirstName || ''} ${record.form_data?.motherFamilyName || ''}` },
        { title: 'Nombre Padre', dataIndex: ['form_data', 'fatherFirstName'], key: 'fatherName', width: 200, render: (_, record) => `${record.form_data?.fatherFirstName || ''} ${record.form_data?.fatherFamilyName || ''}` },

        // --- Redes Sociales ---
        { title: 'Sin Redes?', dataIndex: ['form_data', 'noOnlinePresence'], key: 'noOnlinePresence', width: 100, render: renderBooleanTag },
        // (Omitimos las IDs específicas, se pueden ver en el JSON expandido)

        // --- Empleo ---
        { title: 'Tiene Empleo?', dataIndex: ['form_data', 'hasEmployer'], key: 'hasEmployer', width: 100, render: renderBooleanTag },
        { title: 'Cargo', dataIndex: ['form_data', 'jobTitle'], key: 'jobTitle', width: 180, render: (text) => text || '-' },
        { title: 'Empleador', dataIndex: ['form_data', 'employerName'], key: 'employerName', width: 200, render: (text) => text || '-' },

        // --- Viaje ---
        { title: 'Es Tránsito?', dataIndex: ['form_data', 'isTransit'], key: 'isTransit', width: 100, render: renderBooleanTag },
        { title: 'Fecha Salida', dataIndex: ['form_data', 'departureDate'], key: 'departureDate', width: 120, render: formatDateObject },
        { title: '< 24h?', dataIndex: ['form_data', 'lessThan24h'], key: 'lessThan24h', width: 80, render: renderBooleanTag },
        { title: 'Contacto EEUU Desconocido?', dataIndex: ['form_data', 'isPointOfContactUnknown'], key: 'pocUnknown', width: 100, render: renderBooleanTag },
        { title: 'Misma Dirección Estancia?', dataIndex: ['form_data', 'useSameAddressAsAbove'], key: 'sameAddress', width: 100, render: renderBooleanTag },
        { title: 'Contacto Emergencia', dataIndex: ['form_data', 'emergency_email'], key: 'emergency_email', width: 250 },

        // --- Pago ---
        { title: 'Monto Pagado', dataIndex: ['form_data', "paymentDetails", 'total'], key: 'amount_paid', width: 120, render: (amount) => amount ? `${amount} USD` : '-', sorter: (a, b) => a.amount_paid - b.amount_paid },
        { title: 'Opción Envío', dataIndex: ['form_data', 'paymentDetails', 'expediteOption'], key: 'expedite', width: 150 },
        { title: 'Garantía?', dataIndex: ['form_data', 'paymentDetails', 'refusalGuarantee'], key: 'guarantee', width: 100, render: renderBooleanTag },
        { title: 'ID Pago Stripe', dataIndex: 'payment_intent_id', key: 'payment_intent_id', width: 280 },
    ];

    const applications = data?.applications || [];
    const pagination = data?.pagination;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={3} style={{ margin: 0 }}>Panel de Administración - VisaGovAssist</Title>
                <Button icon={<LogoutOutlined />} onClick={handleLogout}>Cerrar Sesión</Button>
            </Header>
            <Content style={{ padding: '24px' }}>
                {(isLoading || isFetching) && <Spin tip="Cargando..." style={{ display: 'block', marginBottom: '20px' }} />}
                {error && !(error as Error).message.includes('Unauthorized') && <Paragraph type="danger">Error al cargar datos: {(error as Error).message}</Paragraph>}

                <Table
                    columns={columns}
                    dataSource={applications}
                    rowKey="id"
                    scroll={{ x: 6000 }} // Ajusta este valor al ancho TOTAL de tus columnas
                    bordered
                    loading={isLoading || isFetching}
                    locale={{ emptyText: <Empty description="No hay aplicaciones para mostrar." /> }}
                    pagination={pagination ? {
                        current: pagination.currentPage,
                        pageSize: pagination.limit,
                        total: pagination.totalRecords,
                        onChange: (page) => setCurrentPage(page),
                        showSizeChanger: false,
                    } : false}
                    expandable={{
                        expandedRowRender: record => (
                            <div style={{ background: '#f8f8f8', padding: '10px', borderRadius: '4px' }}>
                                <Title level={5}>Detalles Completos (JSON)</Title>
                                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: '600px', overflowY: 'auto' }}>
                                    {JSON.stringify(record.form_data, null, 2)}
                                </pre>
                            </div>
                        ),
                        rowExpandable: record => record.form_data != null,
                    }}
                />
            </Content>
        </Layout>
    );
};

export default AdminPage;