import React from 'react';
import { Form, Input, Select, Row, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import CountrySelect from '../CountrySelect/CountrySelect';

const { Title } = Typography;
const { Option } = Select;

const PersonalForm: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <Title level={4}>{t('personal_form_contact_info_title')}</Title>
            <Row gutter={24}>
                <Col xs={24} lg={8}>
                    <Form.Item name="address1" label={t('personal_form_address1_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Input placeholder={t('personal_form_address1_placeholder')} />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={8}>
                    <Form.Item name="address2" label={t('personal_form_address2_label')}>
                        <Input placeholder={t('personal_form_address2_placeholder')} />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={8}>
                    <Form.Item name="apartmentNumber" label={t('personal_form_apartment_label')}>
                        <Input placeholder={t('personal_form_apartment_placeholder')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} lg={8}>
                    <Form.Item name="city" label={t('personal_form_city_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Input placeholder={t('personal_form_city_placeholder')} />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={8}>
                    <Form.Item name="stateProvince" label={t('personal_form_state_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Input placeholder={t('personal_form_state_placeholder')} />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={8}>
                    <Form.Item name="country" label={t('personal_form_country_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <CountrySelect placeholder={t('applicant_form_country_birth_placeholder')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Form.Item name="phoneType" label={t('personal_form_phone_type_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Select placeholder={t('personal_form_phone_type_placeholder')}>
                            <Option value="home">{t('personal_form_phone_type_home')}</Option>
                            <Option value="mobile">{t('personal_form_phone_type_mobile')}</Option>
                            <Option value="work">{t('personal_form_phone_type_work')}</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item label={t('personal_form_phone_label')} required>
                        <Input.Group compact>
                            <Form.Item name="countryPhoneCode" noStyle rules={[{ required: true, message: t('validation_code_required') }]}>
                                <Input style={{ width: '25%' }} placeholder={t('personal_form_phone_code_placeholder')} />
                            </Form.Item>
                            <Form.Item name="phoneNumber" noStyle rules={[{ required: true, message: t('validation_number_required') }]}>
                                <Input style={{ width: '75%' }} placeholder={t('personal_form_phone_number_placeholder')} />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                </Col>
            </Row>

            <hr style={{ margin: '30px 0' }} />

            <Title level={4}>{t('personal_form_parents_title')}</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Form.Item name="motherFamilyName" label={t('personal_form_mother_family_name_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Input placeholder={t('personal_form_mother_family_name_placeholder')} />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item name="motherFirstName" label={t('personal_form_mother_first_name_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Input placeholder={t('personal_form_mother_first_name_placeholder')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Form.Item name="fatherFamilyName" label={t('personal_form_father_family_name_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Input placeholder={t('personal_form_father_family_name_placeholder')} />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item name="fatherFirstName" label={t('personal_form_father_first_name_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Input placeholder={t('personal_form_father_first_name_placeholder')} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default PersonalForm;