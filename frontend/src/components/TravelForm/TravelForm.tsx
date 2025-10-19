import React, { useEffect } from 'react';
import { Form, Input, Select, Row, Col, Typography, Radio, Checkbox, Button, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import usStates from '../../data/usStates.json';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const TravelForm: React.FC = () => {
  const form = Form.useFormInstance();

  // Watchers para la lógica condicional
  const isTransit = Form.useWatch('isTransit', form);
  const isPointOfContactUnknown = Form.useWatch('isPointOfContactUnknown', form);
  const useSameAddressAsAbove = Form.useWatch('useSameAddressAsAbove', form);
  const lessThan24h = Form.useWatch('lessThan24h', form);

  // Efecto para copiar la dirección
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
      <Title level={4}>Travel Information</Title>
      <Form.Item name="isTransit" label="IS YOUR TRAVEL TO THE US OCCURRING TO TRANSIT TO ANOTHER COUNTRY?" rules={[{ required: true }]}>
        <Radio.Group><Radio.Button value={false}>No</Radio.Button><Radio.Button value={true}>Yes</Radio.Button></Radio.Group>
      </Form.Item>
      
      {!isTransit && (
        <>
            <Form.Item label="INTENDED DATE OF DEPARTURE *">
                <Row align="middle" gutter={[8, 16]}>
                    <Col xs={24} lg={16}>
                        <Space wrap>
                            <Form.Item name={['departureDate', 'day']} noStyle rules={[{ required: !lessThan24h }]}><Select placeholder="Day" style={{ minWidth: '80px' }} disabled={lessThan24h}>{Array.from({ length: 31 }, (_, i) => i + 1).map(d => <Option key={d} value={d}>{d}</Option>)}</Select></Form.Item>
                            <Form.Item name={['departureDate', 'month']} noStyle rules={[{ required: !lessThan24h }]}><Select placeholder="Month" style={{ minWidth: '120px' }} disabled={lessThan24h}>{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => <Option key={m} value={i + 1}>{m}</Option>)}</Select></Form.Item>
                            <Form.Item name={['departureDate', 'year']} noStyle rules={[{ required: !lessThan24h }]}><Input style={{ minWidth: '90px' }} placeholder="Year" disabled={lessThan24h} /></Form.Item>
                        </Space>
                    </Col>
                    <Col xs={24} lg={8}>
                        <Form.Item name="lessThan24h" valuePropName="checked" noStyle><Checkbox>Less than 24 hours</Checkbox></Form.Item>
                    </Col>
                </Row>
            </Form.Item>
            
            <hr style={{ margin: '20px 0' }}/>
            
            <Title level={4}>U.S Point Of Contact Information</Title>
            <Form.Item name="isPointOfContactUnknown" valuePropName="checked"><Checkbox>Unknown</Checkbox></Form.Item>
            
            <div style={{ opacity: isPointOfContactUnknown ? 0.5 : 1, pointerEvents: isPointOfContactUnknown ? 'none' : 'auto' }}>
                 <Row gutter={24}>
                    <Col xs={24} lg={8}><Form.Item name="poc_name" label="NAME *" rules={[{ required: !isPointOfContactUnknown }]}><Input placeholder="Name" /></Form.Item></Col>
                    <Col xs={24} lg={8}><Form.Item name="poc_address1" label="ADDRESS LINE 1 *" rules={[{ required: !isPointOfContactUnknown }]}><Input placeholder="Address Line 1" /></Form.Item></Col>
                    <Col xs={24} lg={8}><Form.Item name="poc_address2" label="ADDRESS LINE 2"><Input placeholder="Address Line 2" /></Form.Item></Col>
                 </Row>
                 <Row gutter={24}>
                    <Col xs={24} lg={8}><Form.Item name="poc_apartment" label="APARTMENT NUMBER"><Input placeholder="Apartment Number" /></Form.Item></Col>
                    <Col xs={24} lg={8}><Form.Item name="poc_city" label="CITY *" rules={[{ required: !isPointOfContactUnknown }]}><Input placeholder="City" /></Form.Item></Col>
                    <Col xs={24} lg={8}><Form.Item name="poc_state" label="STATE *" rules={[{ required: !isPointOfContactUnknown }]}><Select placeholder="Select State" showSearch>{usStates.map(s => <Option key={s} value={s}>{s}</Option>)}</Select></Form.Item></Col>
                 </Row>
                 <Row gutter={24}>
                    <Col xs={24} lg={12}><Form.Item label="PHONE NUMBER *" required><Input.Group compact><Form.Item name="poc_phoneCode" noStyle rules={[{ required: !isPointOfContactUnknown }]}><Input style={{ width: '25%' }} placeholder="(+1)" /></Form.Item><Form.Item name="poc_phoneNumber" noStyle rules={[{ required: !isPointOfContactUnknown }]}><Input style={{ width: '75%' }} placeholder="Enter your phone number" /></Form.Item></Input.Group></Form.Item></Col>
                 </Row>
            </div>
            
            <hr style={{ margin: '20px 0' }}/>
            
            <Title level={4}>Address While In The U.S.</Title>
            <Form.Item name="useSameAddressAsAbove" label="USE THE SAME ADDRESS AS ABOVE?"><Radio.Group><Radio.Button value={false}>No</Radio.Button><Radio.Button value={true}>Yes</Radio.Button></Radio.Group></Form.Item>
            
            <div style={{ opacity: useSameAddressAsAbove ? 0.5 : 1, pointerEvents: useSameAddressAsAbove ? 'none' : 'auto' }}>
                 <Row gutter={24}>
                    <Col xs={24} lg={8}><Form.Item name="stay_address1" label="ADDRESS LINE 1 *" rules={[{ required: !isPointOfContactUnknown && !useSameAddressAsAbove }]}><Input placeholder="Address Line 1" /></Form.Item></Col>
                    <Col xs={24} lg={8}><Form.Item name="stay_address2" label="ADDRESS LINE 2"><Input placeholder="Address Line 2" /></Form.Item></Col>
                    <Col xs={24} lg={8}><Form.Item name="stay_apartment" label="APARTMENT NUMBER"><Input placeholder="Apartment Number" /></Form.Item></Col>
                 </Row>
                 <Row gutter={24}>
                    <Col xs={24} lg={12}><Form.Item name="stay_city" label="CITY *" rules={[{ required: !isPointOfContactUnknown && !useSameAddressAsAbove }]}><Input placeholder="City" /></Form.Item></Col>
                    <Col xs={24} lg={12}><Form.Item name="stay_state" label="STATE *" rules={[{ required: !isPointOfContactUnknown && !useSameAddressAsAbove }]}><Select placeholder="Select State" showSearch>{usStates.map(s => <Option key={s} value={s}>{s}</Option>)}</Select></Form.Item></Col>
                 </Row>
            </div>
        </>
      )}

      <hr style={{ margin: '20px 0' }}/>
      <Title level={4}>Emergency Contact Information In Or Out Of The U.S.</Title>
        <Row gutter={24}>
            <Col xs={24} lg={8}><Form.Item name="emergency_familyName" label="FAMILY NAME(S) *" rules={[{ required: true }]}><Input placeholder="Family Name(s)" /></Form.Item></Col>
            <Col xs={24} lg={8}><Form.Item name="emergency_firstName" label="FIRST (GIVEN) NAME(S) *" rules={[{ required: true }]}><Input placeholder="First (Given) Name(s)" /></Form.Item></Col>
            <Col xs={24} lg={8}><Form.Item name="emergency_email" label="EMAIL ADDRESS *" rules={[{ required: true, type: 'email' }]}><Input placeholder="Email Address" /></Form.Item></Col>
        </Row>
        <Row gutter={24}>
           <Col xs={24} lg={12}><Form.Item label="COUNTRY+PHONE *" required><Input.Group compact><Form.Item name="emergency_phoneCode" noStyle rules={[{ required: true }]}><Input style={{ width: '25%' }} placeholder="(+58)" /></Form.Item><Form.Item name="emergency_phoneNumber" noStyle rules={[{ required: true }]}><Input style={{ width: '75%' }} placeholder="Enter your phone number" /></Form.Item></Input.Group></Form.Item></Col>
        </Row>

      <hr style={{ margin: '20px 0' }}/>
      <Title level={4}>Upload Selfie</Title>
        <Row gutter={24} align="top">
            <Col xs={24} sm={4} style={{ textAlign: 'center' }}>
                {/* Placeholder for image icon */}
                <div style={{ fontSize: '48px', color: '#ccc' }}>👤</div>
            </Col>
            <Col xs={24} sm={20}>
                <Paragraph>Ensure the selfie is not a copy of the photo in the passport. If you submit the same photo, the application will be canceled. For accurate results, capture full face, show head and shoulders only. Use a color photo on a plain background. No sunglasses, hats or masks. No filters or major editing.</Paragraph>
                <Space wrap>
                    <Form.Item name="selfie" valuePropName="fileList" getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)} noStyle>
                        <Upload maxCount={1} beforeUpload={() => false}><Button icon={<UploadOutlined />}>Add Photo</Button></Upload>
                    </Form.Item>
                    <Form.Item name="remindMeLater" valuePropName="checked" noStyle>
                        <Checkbox>Remind me later</Checkbox>
                    </Form.Item>
                </Space>
            </Col>
        </Row>
    </>
  );
};

export default TravelForm;