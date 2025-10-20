import React from 'react';
import { Form, Input, Button, Select, Row, Col, Typography, Radio, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import CountrySelect from '../CountrySelect/CountrySelect';

const { Title } = Typography;
const { Option } = Select;

const PassportForm: React.FC = () => {
    const { t } = useTranslation();
    const form = Form.useFormInstance();

    const hasOtherDocuments = Form.useWatch('hasOtherDocuments', form);
    const isOtherCitizenNow = Form.useWatch('isOtherCitizenNow', form);
    const wasOtherCitizen = Form.useWatch('wasOtherCitizen', form);
    const isGlobalEntryMember = Form.useWatch('isGlobalEntryMember', form);

    return (
        <>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Form.Item name="countryOfCitizenship" label={t('passport_form_citizenship_country_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <CountrySelect placeholder={t('applicant_form_country_birth_placeholder')} />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item name="issuingCountry" label={t('passport_form_issuing_country_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <CountrySelect placeholder={t('applicant_form_country_birth_placeholder')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Form.Item name="passportNumber" label={t('passport_form_passport_number_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Input placeholder={t('passport_form_passport_number_placeholder')} />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="passportNumberConfirm"
                        label={t('passport_form_passport_confirm_label')}
                        dependencies={['passportNumber']}
                        rules={[
                            { required: true, message: t('validation_required') },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('passportNumber') === value) return Promise.resolve();
                                    return Promise.reject(new Error(t('passport_form_passport_mismatch_error')));
                                },
                            }),
                        ]}
                    >
                        <Input placeholder={t('passport_form_passport_confirm_placeholder')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Form.Item name="nationalId" label={t('passport_form_national_id_label')}>
                        <Input placeholder={t('passport_form_national_id_placeholder')} />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item name="personalId" label={t('passport_form_personal_id_label')}>
                        <Input placeholder={t('passport_form_personal_id_placeholder')} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="gender" label={t('passport_form_gender_label')} rules={[{ required: true, message: t('validation_required') }]}>
                <Radio.Group>
                    <Radio value="female">{t('passport_form_gender_female')}</Radio>
                    <Radio value="male">{t('passport_form_gender_male')}</Radio>
                </Radio.Group>
            </Form.Item>

            <hr style={{ margin: '30px 0' }} />

            <Form.Item name="hasOtherDocuments" label={t('passport_form_other_docs_question')}>
                <Radio.Group>
                    <Radio.Button value={false}>{t('no')}</Radio.Button>
                    <Radio.Button value={true}>{t('yes')}</Radio.Button>
                </Radio.Group>
            </Form.Item>
            {hasOtherDocuments && (
                <Form.List name="otherDocuments">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={[16, 0]} align="bottom" style={{ marginBottom: 8 }}>
                                    <Col xs={24} sm={12} md={6}><Form.Item {...restField} name={[name, 'issuingCountry']} rules={[{ required: true, message: t('validation_required') }]} label={t('passport_form_other_docs_issuing_country_label')}><CountrySelect placeholder={t('applicant_form_country_birth_placeholder')} /></Form.Item></Col>
                                    <Col xs={24} sm={12} md={6}><Form.Item {...restField} name={[name, 'documentType']} rules={[{ required: true, message: t('validation_required') }]} label={t('passport_form_other_docs_type_label')}><Select placeholder={t('passport_form_other_docs_type_placeholder')}><Option value="passport">{t('passport_form_other_docs_type_passport')}</Option><Option value="id">{t('passport_form_other_docs_type_id')}</Option></Select></Form.Item></Col>
                                    <Col xs={24} sm={12} md={6}><Form.Item {...restField} name={[name, 'documentNumber']} rules={[{ required: true, message: t('validation_required') }]} label={t('passport_form_other_docs_number_label')}><Input placeholder={t('passport_form_other_docs_number_placeholder')} /></Form.Item></Col>
                                    <Col xs={24} sm={10} md={5}><Form.Item {...restField} name={[name, 'expirationYear']} rules={[{ required: true, message: t('validation_required') }]} label={t('passport_form_other_docs_exp_year_label')}><Input placeholder={t('applicant_form_dob_year')} /></Form.Item></Col>
                                    <Col xs={24} sm={2} md={1}><MinusCircleOutlined onClick={() => remove(name)} style={{ fontSize: '20px', color: '#ff4d4f' }} /></Col>
                                </Row>
                            ))}
                            <Form.Item><Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>{t('passport_form_other_docs_add_button')}</Button></Form.Item>
                        </>
                    )}
                </Form.List>
            )}

            <hr style={{ margin: '30px 0' }} />

            <Title level={4}>{t('passport_form_other_citizenship_title')}</Title>
            <Form.Item name="isOtherCitizenNow" label={t('passport_form_is_citizen_now_question')}>
                <Radio.Group><Radio.Button value={false}>{t('no')}</Radio.Button><Radio.Button value={true}>{t('yes')}</Radio.Button></Radio.Group>
            </Form.Item>
            {isOtherCitizenNow && (
                <Form.List name="currentCitizenships">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={[16, 0]} align="middle" style={{ marginBottom: 8 }}>
                                    <Col xs={24} lg={11}><Form.Item {...restField} name={[name, 'country']} rules={[{ required: true, message: t('validation_required') }]}><CountrySelect placeholder={t('passport_form_country_placeholder')} /></Form.Item></Col>
                                    <Col xs={24} lg={11}><Form.Item {...restField} name={[name, 'how']} rules={[{ required: true, message: t('validation_required') }]}><Select placeholder={t('passport_form_how_acquired_placeholder')}><Option value="birth">{t('passport_form_acquired_by_birth')}</Option><Option value="parents">{t('passport_form_acquired_by_parents')}</Option><Option value="naturalized">{t('passport_form_acquired_by_naturalization')}</Option><Option value="other">{t('passport_form_acquired_by_other')}</Option></Select></Form.Item></Col>
                                    <Col xs={24} lg={2}><MinusCircleOutlined onClick={() => remove(name)} style={{ fontSize: '20px', color: '#ff4d4f' }} /></Col>
                                </Row>
                            ))}
                            <Form.Item><Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>{t('passport_form_add_citizenship_button')}</Button></Form.Item>
                        </>
                    )}
                </Form.List>
            )}

            <Form.Item name="wasOtherCitizen" label={t('passport_form_was_citizen_question')}>
                <Radio.Group><Radio.Button value={false}>{t('no')}</Radio.Button><Radio.Button value={true}>{t('yes')}</Radio.Button></Radio.Group>
            </Form.Item>
            {wasOtherCitizen && (
                <Form.List name="pastCitizenships">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} style={{ border: '1px solid #f0f0f0', padding: '16px', marginBottom: '16px', borderRadius: '8px', position: 'relative' }}>
                                    <Row gutter={16}><Col span={24}><Form.Item {...restField} name={[name, 'country']} label={t('passport_form_past_citizenship_country_label')} rules={[{ required: true, message: t('validation_required') }]}><CountrySelect placeholder={t('applicant_form_country_birth_placeholder')} /></Form.Item></Col></Row>
                                    <Row gutter={16}>
                                        <Col xs={24} lg={12}><Form.Item label={t('passport_form_from_label')}><Space wrap><Form.Item name={[name, 'fromDate', 'day']} noStyle rules={[{ required: true, message: t('validation_required') }]}><Select placeholder={t('applicant_form_dob_day')} style={{ minWidth: '80px' }}>{Array.from({ length: 31 }, (_, i) => i + 1).map(day => <Option key={day} value={day}>{day}</Option>)}</Select></Form.Item><Form.Item name={[name, 'fromDate', 'month']} noStyle rules={[{ required: true, message: t('validation_required') }]}><Select placeholder={t('applicant_form_dob_month')} style={{ minWidth: '120px' }}>{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => <Option key={month} value={index + 1}>{month}</Option>)}</Select></Form.Item><Form.Item name={[name, 'fromDate', 'year']} noStyle rules={[{ required: true, message: t('validation_required') }]}><Input style={{ minWidth: '90px' }} placeholder={t('applicant_form_dob_year')} /></Form.Item></Space></Form.Item></Col>
                                        <Col xs={24} lg={12}><Form.Item label={t('passport_form_to_label')}><Space wrap><Form.Item name={[name, 'toDate', 'day']} noStyle rules={[{ required: true, message: t('validation_required') }]}><Select placeholder={t('applicant_form_dob_day')} style={{ minWidth: '80px' }}>{Array.from({ length: 31 }, (_, i) => i + 1).map(day => <Option key={day} value={day}>{day}</Option>)}</Select></Form.Item><Form.Item name={[name, 'toDate', 'month']} noStyle rules={[{ required: true, message: t('validation_required') }]}><Select placeholder={t('applicant_form_dob_month')} style={{ minWidth: '120px' }}>{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => <Option key={month} value={index + 1}>{month}</Option>)}</Select></Form.Item><Form.Item name={[name, 'toDate', 'year']} noStyle rules={[{ required: true, message: t('validation_required') }]}><Input style={{ minWidth: '90px' }} placeholder={t('applicant_form_dob_year')} /></Form.Item></Space></Form.Item></Col>
                                    </Row>
                                    <MinusCircleOutlined onClick={() => remove(name)} style={{ position: 'absolute', top: 16, right: 16, color: 'red', fontSize: '20px' }} />
                                </div>
                            ))}
                            <Form.Item><Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>{t('passport_form_add_past_citizenship_button')}</Button></Form.Item>
                        </>
                    )}
                </Form.List>
            )}

            <hr style={{ margin: '30px 0' }} />

            <Title level={4}>{t('passport_form_ge_membership_title')}</Title>
            <Form.Item name="isGlobalEntryMember" label={t('passport_form_ge_membership_question')}>
                <Radio.Group><Radio.Button value={false}>{t('no')}</Radio.Button><Radio.Button value={true}>{t('yes')}</Radio.Button></Radio.Group>
            </Form.Item>
            {isGlobalEntryMember && (
                <Form.Item name="passId" label={t('passport_form_ge_membership_passid_label')} rules={[{ required: true, message: t('validation_required') }]}>
                    <Input placeholder={t('passport_form_ge_membership_passid_placeholder')} />
                </Form.Item>
            )}
        </>
    );
};

export default PassportForm;