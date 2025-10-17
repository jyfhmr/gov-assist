import React from 'react';
import { Form, Input, Row, Col, Typography, Radio } from 'antd';
import CountrySelect from '../CountrySelect/CountrySelect'; // Reutilizamos nuestro componente de país

const { Title, Paragraph } = Typography;

const EmploymentForm: React.FC = () => {
  const form = Form.useFormInstance();
  // Watcher para mostrar/ocultar el formulario de empleo
  const hasEmployer = Form.useWatch('hasEmployer', form);

  return (
    <>
      <Title level={4}>Employment Information</Title>

      <Form.Item
        name="hasEmployer"
        label="DO YOU HAVE A CURRENT OR PREVIOUS EMPLOYER? *"
        rules={[{ required: true, message: 'Please select an option' }]}
      >
        <Radio.Group>
          <Radio.Button value={false}>No</Radio.Button>
          <Radio.Button value={true}>Yes</Radio.Button>
        </Radio.Group>
      </Form.Item>
      
      <Paragraph type="secondary">
        If you have never been employed, you may select "NO" to skip these fields, but if you are employed or you were recently employed, it is advised that you fill it in to raise the chances of a successful application.
      </Paragraph>

      {/* Formulario condicional */}
      {hasEmployer && (
        <>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="jobTitle" label="JOB TITLE" rules={[{ required: true }]}>
                <Input placeholder="Job Title" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="employerName" label="EMPLOYER NAME *" rules={[{ required: true }]}>
                <Input placeholder="Employer name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="employerAddress1" label="ADDRESS LINE 1 *" rules={[{ required: true }]}>
                <Input placeholder="Address Line 1" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="employerAddress2" label="ADDRESS LINE 2">
                <Input placeholder="Address Line 2" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="employerCity" label="EMPLOYER CITY *" rules={[{ required: true }]}>
                <Input placeholder="Employer City" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="employerState" label="STATE/PROVINCE/REGION *" rules={[{ required: true }]}>
                <Input placeholder="State/Province/Region" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="employerCountry" label="COUNTRY *" rules={[{ required: true }]}>
                <CountrySelect placeholder="Select Country" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="COUNTRY+PHONE *" required>
                <Input.Group compact>
                  <Form.Item name="employerCountryCode" noStyle rules={[{ required: true }]}>
                    <Input style={{ width: '25%' }} placeholder="(+58)" />
                  </Form.Item>
                  <Form.Item name="employerPhone" noStyle rules={[{ required: true }]}>
                    <Input style={{ width: '75%' }} placeholder="Enter your phone number" />
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