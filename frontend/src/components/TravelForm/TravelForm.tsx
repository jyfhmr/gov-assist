import React, { useEffect } from 'react';
import { Form, Input, Select, Row, Col, Typography, Radio, Checkbox, Button, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import usStates from '../../data/usStates.json';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const TravelForm: React.FC = () => {
    const { t } = useTranslation();
    const form = Form.useFormInstance();

    const isTransit = Form.useWatch('isTransit', form);
    const isPointOfContactUnknown = Form.useWatch('isPointOfContactUnknown', form);
    const useSameAddressAsAbove = Form.useWatch('useSameAddressAsAbove', form);
    const lessThan24h = Form.useWatch('lessThan24h', form);

    const pointOfContactAddress = Form.useWatch(['poc_address1', 'poc_address2', 'poc_apartment', 'poc_city', 'poc_state'], form);

    useEffect(() => {
        if (useSameAddressAsAbove) {
            form.setFieldsValue({
                stay_address1: form.getFieldValue('poc_address1'),
                stay_address2: form.getFieldValue('poc_address2'),
                stay_apartment: form.getFieldValue('poc_apartment'),
                stay_city: form.getFieldValue('poc_city'),
                stay_state: form.getFieldValue('poc_state'),
            });
        }
    }, [useSameAddressAsAbove, pointOfContactAddress, form]);


    return (
        <>
            <Title level={4}>{t('travel_form_title')}</Title>
            <Form.Item name="isTransit" label={t('travel_form_transit_question')} rules={[{ required: true, message: t('validation_required') }]}>
                <Radio.Group><Radio.Button value={false}>{t('no')}</Radio.Button><Radio.Button value={true}>{t('yes')}</Radio.Button></Radio.Group>
            </Form.Item>

            {!isTransit && (
                <>
                    <Form.Item label={t('travel_form_departure_date_label')}>
                        <Row align="middle" gutter={[8, 16]}>
                            <Col xs={24} lg={16}>
                                <Space wrap>
                                    <Form.Item name={['departureDate', 'day']} noStyle rules={[{ required: !lessThan24h, message: t('validation_required') }]}><Select placeholder={t('applicant_form_dob_day')} style={{ minWidth: '80px' }} disabled={lessThan24h}>{Array.from({ length: 31 }, (_, i) => i + 1).map(d => <Option key={d} value={d}>{d}</Option>)}</Select></Form.Item>
                                    <Form.Item name={['departureDate', 'month']} noStyle rules={[{ required: !lessThan24h, message: t('validation_required') }]}><Select placeholder={t('applicant_form_dob_month')} style={{ minWidth: '120px' }} disabled={lessThan24h}>{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => <Option key={m} value={i + 1}>{m}</Option>)}</Select></Form.Item>
                                    <Form.Item name={['departureDate', 'year']} noStyle rules={[{ required: !lessThan24h, message: t('validation_required') }]}><Input style={{ minWidth: '90px' }} placeholder={t('applicant_form_dob_year')} disabled={lessThan24h} /></Form.Item>
                                </Space>
                            </Col>
                            <Col xs={24} lg={8}>
                                <Form.Item name="lessThan24h" valuePropName="checked" noStyle><Checkbox>{t('travel_form_less_than_24h_checkbox')}</Checkbox></Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <hr style={{ margin: '20px 0' }} />

                    <Title level={4}>{t('travel_form_poc_title')}</Title>
                    <Form.Item name="isPointOfContactUnknown" valuePropName="checked"><Checkbox>{t('travel_form_unknown_checkbox')}</Checkbox></Form.Item>

                    <div style={{ opacity: isPointOfContactUnknown ? 0.5 : 1, pointerEvents: isPointOfContactUnknown ? 'none' : 'auto' }}>
                        <Row gutter={24}>
                            <Col xs={24} lg={8}><Form.Item name="poc_name" label={t('travel_form_poc_name_label')} rules={[{ required: !isPointOfContactUnknown, message: t('validation_required') }]}><Input placeholder={t('travel_form_poc_name_placeholder')} /></Form.Item></Col>
                            <Col xs={24} lg={8}><Form.Item name="poc_address1" label={t('personal_form_address1_label')} rules={[{ required: !isPointOfContactUnknown, message: t('validation_required') }]}><Input placeholder={t('personal_form_address1_placeholder')} /></Form.Item></Col>
                            <Col xs={24} lg={8}><Form.Item name="poc_address2" label={t('personal_form_address2_label')}><Input placeholder={t('personal_form_address2_placeholder')} /></Form.Item></Col>
                        </Row>
                        <Row gutter={24}>
                            <Col xs={24} lg={8}><Form.Item name="poc_apartment" label={t('personal_form_apartment_label')}><Input placeholder={t('personal_form_apartment_placeholder')} /></Form.Item></Col>
                            <Col xs={24} lg={8}><Form.Item name="poc_city" label={t('personal_form_city_label')} rules={[{ required: !isPointOfContactUnknown, message: t('validation_required') }]}><Input placeholder={t('personal_form_city_placeholder')} /></Form.Item></Col>
                            <Col xs={24} lg={8}><Form.Item name="poc_state" label={t('personal_form_state_label')} rules={[{ required: !isPointOfContactUnknown, message: t('validation_required') }]}><Select placeholder={t('travel_form_select_state_placeholder')} showSearch>{usStates.map(s => <Option key={s} value={s}>{s}</Option>)}</Select></Form.Item></Col>
                        </Row>
                        <Row gutter={24}>
                            <Col xs={24} lg={12}><Form.Item label={t('personal_form_phone_label')} required><Input.Group compact><Form.Item name="poc_phoneCode" noStyle rules={[{ required: !isPointOfContactUnknown, message: t('validation_code_required') }]}><Input style={{ width: '25%' }} placeholder={t('travel_form_poc_phone_placeholder')} /></Form.Item><Form.Item name="poc_phoneNumber" noStyle rules={[{ required: !isPointOfContactUnknown, message: t('validation_number_required') }]}><Input style={{ width: '75%' }} placeholder={t('personal_form_phone_number_placeholder')} /></Form.Item></Input.Group></Form.Item></Col>
                        </Row>
                    </div>

                    <hr style={{ margin: '20px 0' }} />

                    <Title level={4}>{t('travel_form_stay_address_title')}</Title>
                    <Form.Item name="useSameAddressAsAbove" label={t('travel_form_use_same_address_question')}><Radio.Group><Radio.Button value={false}>{t('no')}</Radio.Button><Radio.Button value={true}>{t('yes')}</Radio.Button></Radio.Group></Form.Item>

                    <div style={{ opacity: useSameAddressAsAbove ? 0.5 : 1, pointerEvents: useSameAddressAsAbove ? 'none' : 'auto' }}>
                        <Row gutter={24}>
                            <Col xs={24} lg={8}><Form.Item name="stay_address1" label={t('personal_form_address1_label')} rules={[{ required: !isPointOfContactUnknown && !useSameAddressAsAbove, message: t('validation_required') }]}><Input placeholder={t('personal_form_address1_placeholder')} /></Form.Item></Col>
                            <Col xs={24} lg={8}><Form.Item name="stay_address2" label={t('personal_form_address2_label')}><Input placeholder={t('personal_form_address2_placeholder')} /></Form.Item></Col>
                            <Col xs={24} lg={8}><Form.Item name="stay_apartment" label={t('personal_form_apartment_label')}><Input placeholder={t('personal_form_apartment_placeholder')} /></Form.Item></Col>
                        </Row>
                        <Row gutter={24}>
                            <Col xs={24} lg={12}><Form.Item name="stay_city" label={t('personal_form_city_label')} rules={[{ required: !isPointOfContactUnknown && !useSameAddressAsAbove, message: t('validation_required') }]}><Input placeholder={t('personal_form_city_placeholder')} /></Form.Item></Col>
                            <Col xs={24} lg={12}><Form.Item name="stay_state" label={t('personal_form_state_label')} rules={[{ required: !isPointOfContactUnknown && !useSameAddressAsAbove, message: t('validation_required') }]}><Select placeholder={t('travel_form_select_state_placeholder')} showSearch>{usStates.map(s => <Option key={s} value={s}>{s}</Option>)}</Select></Form.Item></Col>
                        </Row>
                    </div>
                </>
            )}

            <hr style={{ margin: '20px 0' }} />
            <Title level={4}>{t('travel_form_emergency_title')}</Title>
            <Row gutter={24}>
                <Col xs={24} lg={8}><Form.Item name="emergency_familyName" label={t('applicant_form_family_name_label')} rules={[{ required: true, message: t('validation_required') }]}><Input placeholder={t('applicant_form_family_name_placeholder')} /></Form.Item></Col>
                <Col xs={24} lg={8}><Form.Item name="emergency_firstName" label={t('applicant_form_first_name_label')} rules={[{ required: true, message: t('validation_required') }]}><Input placeholder={t('applicant_form_first_name_placeholder')} /></Form.Item></Col>
                <Col xs={24} lg={8}><Form.Item name="emergency_email" label={t('applicant_form_email_label')} rules={[{ required: true, type: 'email', message: t('validation_email_invalid') }]}><Input placeholder={t('applicant_form_email_placeholder')} /></Form.Item></Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} lg={12}><Form.Item label={t('personal_form_phone_label')} required><Input.Group compact><Form.Item name="emergency_phoneCode" noStyle rules={[{ required: true, message: t('validation_code_required') }]}><Input style={{ width: '25%' }} placeholder={t('personal_form_phone_code_placeholder')} /></Form.Item><Form.Item name="emergency_phoneNumber" noStyle rules={[{ required: true, message: t('validation_number_required') }]}><Input style={{ width: '75%' }} placeholder={t('personal_form_phone_number_placeholder')} /></Form.Item></Input.Group></Form.Item></Col>
            </Row>

            <hr style={{ margin: '20px 0' }} />
            <Title level={4}>{t('travel_form_selfie_title')}</Title>
            <Row gutter={24} align="top">
                <Col xs={24} sm={4} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', color: '#ccc' }}>👤</div>
                </Col>
                <Col xs={24} sm={20}>
                    <Paragraph>{t('travel_form_selfie_description')}</Paragraph>
                    <Space wrap>
                        <Form.Item name="selfie" valuePropName="fileList" getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)} noStyle>
                            <Upload maxCount={1} beforeUpload={() => false}><Button icon={<UploadOutlined />}>{t('applicant_form_upload_button')}</Button></Upload>
                        </Form.Item>
                        <Form.Item name="remindMeLater" valuePropName="checked" noStyle>
                            <Checkbox>{t('travel_form_remind_me_later_checkbox')}</Checkbox>
                        </Form.Item>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export default TravelForm;