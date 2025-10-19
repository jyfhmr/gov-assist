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
        I understand that an approved travel authorization is NOT a visa. It does not meet the legal or regulatory requirements to serve in lieu of a United States visa when a visa is required under United States law. Individuals who possess a valid visa will still be able to travel to the United States on that visa for the purpose for which it was issued. Individuals traveling on valid visas are not required to apply for a travel authorization.
        I have read and understood the terms of the Visa Waiver Program . I understand that if my Electronic Travel Authorization is approved, this approval establishes that I am eligible to travel to the United States under the Visa Waiver Program but does not guarantee that I am admissible to the United States. Upon arrival in the United States, I will be inspected by a Customs and Border Protection officer at a port of entry who may determine that I am inadmissible under the Visa Waiver Program or for any reason under United States law.
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
        I understand that I am applying via GovAssist, LLC; a third-party that is not affiliated with the United States government, that the third-party cannot guarantee application approval, that the third-party service is offered to help expedite the process, and that I have the option to apply directly with the pertinent government websites. I also understand that my purchase includes a processing and service fee to GovAssist, which includes the USD $21.00 non-refundable government fee, required by the Travel Promotion Act of 2009 (Section 9 of the United States Capitol Police Administrative Technical Corrections Act of 2009, Pub. L. No. 111-145).
        I confirm and authorize GovAssist, LLC to assist me, by using their processing service in completing and reviewing my application. I understand and acknowledge that I have not been offered legal advice and that this company or its agents and affiliates have never claimed to be qualified to offer legal advice under any circumstance. I also confirm that I am submitting my application and signing it myself.
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
        <Col xs={24} lg={12}>
          <Form.Item name="securityQuestion" label="SECURITY QUESTION *" rules={[{ required: true }]}>
            <Select placeholder="Select a question">
              {securityQuestions.map(q => <Option key={q} value={q}>{q}</Option>)}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item name="securityAnswer" label="ANSWER *" rules={[{ required: true }]}>
            <Input placeholder="Type something memorable" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ReviewForm;