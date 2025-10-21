import React from 'react';
import { Form, Input, Button, Select, Row, Col, Typography, Upload, Radio, Space, Tooltip, message } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import { QuestionCircleOutlined, UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import CountrySelect from '../CountrySelect/CountrySelect';
import { getBase64 } from '../../utils/imageUtils';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;
const { Option } = Select;

const ApplicantForm: React.FC = () => {
    const { t } = useTranslation();
    const form = Form.useFormInstance();
    const showAliases = Form.useWatch('hasAliases', form);

    // ✨ 1. Esta es la nueva función que se llama en el 'onChange' del Upload
    const handlePassportUpload = async (info: UploadChangeParam<UploadFile>) => {

        const file = info.file;
        const fileList = info.fileList;

        // ✨ --- INICIO DE LA VALIDACIÓN DE TIPO --- ✨
        // Validamos solo cuando un archivo es añadido o 'uploading'
        if (file.status === 'uploading' || (file.originFileObj && file.status !== 'removed')) {
            const isImage = file.type?.startsWith('image/');
            if (!isImage) {
                toast.error(t('validation_file_not_image'));
                // Removemos el archivo inválido del fileList del formulario
                form.setFieldsValue({ passportPhoto: [] });
                return; // Detenemos el proceso
            }
        }

        // Si el usuario añade un archivo nuevo
        if (info.file.status === 'uploading' || info.file.status === 'done') {
             // 'uploading' es el estado inicial cuando beforeUpload retorna false
            if (info.file.originFileObj) {
                try {
                    const base64 = await getBase64(info.file.originFileObj as RcFile);
                    // Actualizamos el valor en el formulario manualmente
                    form.setFieldsValue({
                        passportPhoto: [{
                            uid: info.file.uid,
                            name: info.file.name,
                            status: 'done',
                            thumbUrl: base64, // Este es el Base64 que guardaremos
                        }]
                    });
                     // Actualizamos la UI del componente Upload
                     // Esto es necesario para que muestre la miniatura
                     form.setFieldValue('passportPhoto', [{
                        uid: info.file.uid,
                        name: info.file.name,
                        status: 'done',
                        thumbUrl: base64,
                    }]);

                } catch (error) {
                    message.error('Error al leer el archivo');
                    // Si falla, limpiamos el campo
                    form.setFieldsValue({ passportPhoto: [] });
                }
            }
        } 
        // Si el usuario elimina el archivo
        else if (info.file.status === 'removed') {
            form.setFieldsValue({ passportPhoto: [] });
        }
    };

    return (
        <>
            <Title level={4}>{t('applicant_form_general_info_title')}</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="email"
                        label={<span>{t('applicant_form_email_label')} <Tooltip title="..."><QuestionCircleOutlined /></Tooltip></span>}
                        rules={[ { required: true, message: t('validation_required') }, { type: 'email', message: t('validation_email_invalid') } ]}
                    >
                        <Input placeholder={t('applicant_form_email_placeholder')} />
                    </Form.Item>
                    <Text type="secondary">{t('applicant_form_email_secondary')}</Text>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="passportPhoto"
                        label={<span>{t('applicant_form_upload_label')} <Tooltip title="..."><QuestionCircleOutlined /></Tooltip></span>}
                        rules={[{ required: true, message: t('validation_photo_required') }]}
                        valuePropName="fileList"
                        // ✨ 2. Usamos 'getValueFromEvent' para manejar correctamente el fileList
                        // Esto asegura que Ant Design sepa cómo manejar el estado interno del Upload
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) { return e; }
                            return e && e.fileList;
                        }}
                    >
                        <Upload 
                            listType="picture"
                            maxCount={1} 
                            beforeUpload={() => false} // Previene la subida automática
                            accept="image/*"
                            // ✨ 3. Llamamos a nuestra lógica de conversión en 'onChange'
                            onChange={handlePassportUpload}
                        >
                            <Button icon={<UploadOutlined />}>{t('applicant_form_upload_button')}</Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>

            <div style={{ height: '40px' }} />

            <Title level={4}>{t('applicant_form_applicant_info_title')}</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Form.Item name="firstName" label={t('applicant_form_first_name_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Input placeholder={t('applicant_form_first_name_placeholder')} />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item name="familyName" label={t('applicant_form_family_name_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Input placeholder={t('applicant_form_family_name_placeholder')} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item name="hasAliases" label={t('applicant_form_aliases_label')}>
                <Radio.Group>
                    <Radio.Button value={false}>{t('no')}</Radio.Button>
                    <Radio.Button value={true}>{t('yes')}</Radio.Button>
                </Radio.Group>
            </Form.Item>

            {showAliases && (
                <Form.List name="aliases">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={[16, 0]} align="middle" style={{ marginBottom: 8 }}>
                                    <Col xs={24} lg={11}>
                                        <Form.Item {...restField} name={[name, 'firstName']} rules={[{ required: true, message: t('validation_required') }]}>
                                            <Input placeholder={t('applicant_form_first_name_placeholder')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={11}>
                                        <Form.Item {...restField} name={[name, 'familyName']} rules={[{ required: true, message: t('validation_required') }]}>
                                            <Input placeholder={t('applicant_form_family_name_placeholder')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={2}>
                                        <MinusCircleOutlined onClick={() => remove(name)} style={{ fontSize: '20px', color: '#ff4d4f' }} />
                                    </Col>
                                </Row>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>{t('applicant_form_alias_add_button')}</Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            )}

            <Form.Item label={t('applicant_form_dob_label')}>
                <Space wrap>
                    <Form.Item name={['dob', 'day']} noStyle rules={[{ required: true, message: t('validation_required') }]}>
                        <Select placeholder={t('applicant_form_dob_day')} style={{ minWidth: '80px' }}>{Array.from({ length: 31 }, (_, i) => i + 1).map(day => <Option key={day} value={day}>{day}</Option>)}</Select>
                    </Form.Item>
                    <Form.Item name={['dob', 'month']} noStyle rules={[{ required: true, message: t('validation_required') }]}>
                        <Select placeholder={t('applicant_form_dob_month')} style={{ minWidth: '120px' }}>{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => <Option key={month} value={index + 1}>{month}</Option>)}</Select>
                    </Form.Item>
                    <Form.Item name={['dob', 'year']} noStyle rules={[{ required: true, message: t('validation_required') }]}>
                        <Input style={{ minWidth: '90px' }} placeholder={t('applicant_form_dob_year')} />
                    </Form.Item>
                </Space>
            </Form.Item>

            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Form.Item name="cityOfBirth" label={t('applicant_form_city_birth_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Input placeholder={t('applicant_form_city_birth_placeholder')} />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item name="countryOfBirth" label={t('applicant_form_country_birth_label')} rules={[{ required: true, message: t('validation_required') }]}>
                       <CountrySelect placeholder={t('applicant_form_country_birth_placeholder')} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default ApplicantForm;