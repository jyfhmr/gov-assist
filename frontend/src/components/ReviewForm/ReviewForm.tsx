import React from 'react';
import { Form, Checkbox, Typography, Select, Input, Row, Col } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const securityQuestions = [
  "What is your favorite season of the year?",
  "What was your first job as a teenager?",
  "What is your favorite food or drink?",
  "What street did you live on as a child?",
  "What is your preferred musical genre?"
];

const ReviewForm: React.FC = () => {
  return (
    <>
      {/* --- Declaración del Aplicante --- */}
      <Title level={4}>Applicant's Declaration</Title>
      <Paragraph>
        I declare that the information I have provided in this application is truthful, complete and accurate to the best of my knowledge.
        {/* ... (resto del texto) ... */}
        I understand that attempting to obtain an Electronic System for Travel Authorization (ESTA) under the US Visa Waiver Program by the willful misrepresentation of a material fact, or fraud, is an offense under INA 217, 8 U.S.C. 1187 and the CFR Title 8, Subchapter B, Part 217 and may result in the permanent refusal of a Travel Authorization, or adjudicated inadmissibility for entry into the USA as well as removal from the United States and its territories after entry has been granted based on such willful misrepresentations.
      </Paragraph>
      <Form.Item
        name="declarationAgree"
        valuePropName="checked"
        rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms')) }]}
      >
        <Checkbox>Agree</Checkbox>
      </Form.Item>

      <hr style={{ margin: '30px 0' }} />

      {/* --- Autorización de Terceros --- */}
      <Title level={4}>Third Party Authorization</Title>
      <Paragraph>
        I understand that I am applying via GovAssist, LLC; a third-party that is not affiliated with the United States government...
        {/* ... (resto del texto) ... */}
        By obtaining services from the GovAssist website I have agreed to the following: <Text strong>Terms of Use | Terms of Service | Refund Policy | Privacy Policy | Disclaimer</Text>
      </Paragraph>
      <Form.Item
        name="thirdPartyAgree"
        valuePropName="checked"
        rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms')) }]}
      >
        <Checkbox>Agree</Checkbox>
      </Form.Item>
      
      <hr style={{ margin: '30px 0' }} />

      {/* --- Protección de Datos --- */}
      <Title level={4}>Personal Data Confidentiality & Protection</Title>
      <Paragraph>Please answer one of the security questions, which will help us verify your ID in case we can't verify your street address.</Paragraph>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="securityQuestion" label="SECURITY QUESTION *" rules={[{ required: true }]}>
            <Select placeholder="Select a question">
              {securityQuestions.map(q => <Option key={q} value={q}>{q}</Option>)}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="securityAnswer" label="ANSWER *" rules={[{ required: true }]}>
            <Input placeholder="Type something memorable" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ReviewForm;