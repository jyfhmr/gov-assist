import React from 'react';
import { Form, Input, Row, Col, Typography, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import CountrySelect from '../CountrySelect/CountrySelect';

const { Title, Paragraph } = Typography;

const EmploymentForm: React.FC = () => {
  const { t } = useTranslation();
  const form = Form.useFormInstance();
  const hasEmployer = Form.useWatch('hasEmployer', form);

  return (
    <>
      <Title level={4}>{t('employment_form_title')}</Title>

      <Form.Item
        name="hasEmployer"
        label={t('employment_form_has_employer_question')}
        rules={[{ required: true, message: t('validation_required') }]}
      >
        <Radio.Group>
          <Radio.Button value={false}>{t('no')}</Radio.Button>
          <Radio.Button value={true}>{t('yes')}</Radio.Button>
        </Radio.Group>
      </Form.Item>
      
      <Paragraph type="secondary">
        {t('employment_form_description')}
      </Paragraph>

      {hasEmployer && (
        <>
          <Row gutter={24}>
            <Col xs={24} lg={8}>
              <Form.Item name="jobTitle" label={t('employment_form_job_title_label')} rules={[{ required: true, message: t('validation_required') }]}>
                <Input placeholder={t('employment_form_job_title_placeholder')} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item name="employerName" label={t('employment_form_employer_name_label')} rules={[{ required: true, message: t('validation_required') }]}>
                <Input placeholder={t('employment_form_employer_name_placeholder')} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item name="employerAddress1" label={t('personal_form_address1_label')} rules={[{ required: true, message: t('validation_required') }]}>
                <Input placeholder={t('personal_form_address1_placeholder')} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} lg={8}>
              <Form.Item name="employerAddress2" label={t('personal_form_address2_label')}>
                <Input placeholder={t('personal_form_address2_placeholder')} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item name="employerCity" label={t('employment_form_employer_city_label')} rules={[{ required: true, message: t('validation_required') }]}>
                <Input placeholder={t('employment_form_employer_city_placeholder')} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8}>
              <Form.Item name="employerState" label={t('personal_form_state_label')} rules={[{ required: true, message: t('validation_required') }]}>
                <Input placeholder={t('personal_form_state_placeholder')} />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col xs={24} lg={12}>
              <Form.Item name="employerCountry" label={t('employment_form_employer_country_label')} rules={[{ required: true, message: t('validation_required') }]}>
                <CountrySelect placeholder={t('applicant_form_country_birth_placeholder')} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label={t('personal_form_phone_label')} required>
                <Input.Group compact>
                  <Form.Item name="employerCountryCode" noStyle rules={[{ required: true, message: t('validation_code_required') }]}>
                    <Input style={{ width: '25%' }} placeholder={t('personal_form_phone_code_placeholder')} />
                  </Form.Item>
                  <Form.Item name="employerPhone" noStyle rules={[{ required: true, message: t('validation_number_required') }]}>
                    <Input style={{ width: '75%' }} placeholder={t('personal_form_phone_number_placeholder')} />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default EmploymentForm;