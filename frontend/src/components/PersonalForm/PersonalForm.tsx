import React from 'react';
import { Form, Input, Select, Row, Col, Typography } from 'antd';
import CountrySelect from '../CountrySelect/CountrySelect'; // Reutilizamos nuestro componente

const { Title } = Typography;
const { Option } = Select;

const PersonalForm: React.FC = () => {
  return (
    <>
      <Title level={4}>Your Contact Information</Title>
      <Row gutter={24}>
        <Col xs={24} lg={8}>
          <Form.Item name="address1" label="ADDRESS LINE 1 *" rules={[{ required: true }]}>
            <Input placeholder="Address Line 1" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item name="address2" label="ADDRESS LINE 2">
            <Input placeholder="Address Line 2" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item name="apartmentNumber" label="APARTMENT NUMBER">
            <Input placeholder="Apartment Number" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} lg={8}>
          <Form.Item name="city" label="CITY *" rules={[{ required: true }]}>
            <Input placeholder="City" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item name="stateProvince" label="STATE/PROVINCE/REGION *" rules={[{ required: true }]}>
            <Input placeholder="State/Province/Region" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          <Form.Item name="country" label="COUNTRY *" rules={[{ required: true }]}>
            <CountrySelect placeholder="Select Country" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} lg={12}>
          <Form.Item name="phoneType" label="TELEPHONE TYPE *" rules={[{ required: true }]}>
            <Select placeholder="Select phone type">
              <Option value="home">Home</Option>
              <Option value="mobile">Mobile</Option>
              <Option value="work">Work</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="COUNTRY+PHONE *" required>
            <Input.Group compact>
              <Form.Item name="countryPhoneCode" noStyle rules={[{ required: true, message: 'Code required'}]}>
                 <Input style={{ width: '25%' }} placeholder="(+58)" />
              </Form.Item>
              <Form.Item name="phoneNumber" noStyle rules={[{ required: true, message: 'Number required' }]}>
                <Input style={{ width: '75%' }} placeholder="Enter your phone number" />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>

      <hr style={{ margin: '30px 0' }} />

      <Title level={4}>Parents</Title>
      <Row gutter={24}>
        <Col xs={24} lg={12}>
          <Form.Item name="motherFamilyName" label="MOTHER'S FAMILY NAME *" rules={[{ required: true }]}>
            <Input placeholder="Mother's Family Name" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item name="motherFirstName" label="MOTHER'S FIRST NAME *" rules={[{ required: true }]}>
            <Input placeholder="Mother's First Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} lg={12}>
          <Form.Item name="fatherFamilyName" label="FATHER'S FAMILY NAME *" rules={[{ required: true }]}>
            <Input placeholder="Father's Family Name" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item name="fatherFirstName" label="FATHER'S FIRST NAME *" rules={[{ required: true }]}>
            <Input placeholder="Father's First Name" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default PersonalForm;