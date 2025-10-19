import React from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    Typography,
    Upload,
    Radio,
    Space,
    Tooltip
} from 'antd';
import { QuestionCircleOutlined, UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import CountrySelect from '../CountrySelect/CountrySelect';

const { Title, Text } = Typography;
const { Option } = Select;

const ApplicantForm: React.FC = () => {
    const form = Form.useFormInstance();
    const showAliases = Form.useWatch('hasAliases', form);

    return (
        <>
            <Title level={4}>General Information</Title>
            <Row gutter={24}>
                {/* ✨ Se cambian los spans fijos por responsivos */}
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="email"
                        label={<span>EMAIL ADDRESS * <Tooltip title="..."><QuestionCircleOutlined /></Tooltip></span>}
                        rules={[{ required: true, message: 'Please input your email!' }, { type: 'email' }]}
                    >
                        <Input placeholder="Email Address" />
                    </Form.Item>
                    <Text type="secondary">Please make sure you enter a valid email address...</Text>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item
                        name="passportPhoto"
                        label={<span>UPLOAD A PHOTO OF YOUR PASSPORT * <Tooltip title="..."><QuestionCircleOutlined /></Tooltip></span>}
                        rules={[{ required: true, message: 'Please upload a photo of your passport!' }]}
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                    >
                        <Upload maxCount={1} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Add Photo</Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>

            <div style={{ height: '40px' }} />

            <Title level={4}>Applicant Information</Title>
            <Row gutter={24}>
                {/* ✨ Se cambian los spans fijos por responsivos */}
                <Col xs={24} lg={12}>
                    <Form.Item name="firstName" label="FIRST (GIVEN) NAME(S) *" rules={[{ required: true }]}>
                        <Input placeholder="First (Given) Name(s)" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item name="familyName" label="FAMILY NAME(S) *" rules={[{ required: true }]}>
                        <Input placeholder="Family Name(s)" />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item name="hasAliases" label="ARE YOU KNOWN BY ANY OTHER NAMES OR ALIASES?">
                <Radio.Group>
                    <Radio.Button value={false}>No</Radio.Button>
                    <Radio.Button value={true}>Yes</Radio.Button>
                </Radio.Group>
            </Form.Item>

            {showAliases && (
                <Form.List name="aliases">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                // ✨ Reemplazamos Space por Row/Col para que los alias también sean responsivos
                                <Row key={key} gutter={[16, 0]} align="middle" style={{ marginBottom: 8 }}>
                                    <Col xs={24} lg={11}>
                                        <Form.Item {...restField} name={[name, 'firstName']} rules={[{ required: true }]}>
                                            <Input placeholder="First (Given) Name(s)" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={11}>
                                        <Form.Item {...restField} name={[name, 'familyName']} rules={[{ required: true }]}>
                                            <Input placeholder="Family Name(s)" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={2}>
                                        <MinusCircleOutlined onClick={() => remove(name)} style={{ fontSize: '20px', color: '#ff4d4f' }} />
                                    </Col>
                                </Row>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Alias</Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            )}

            <Form.Item label="DATE OF BIRTH *">
                {/* ✨ Reemplazamos Space.Compact por Space con 'wrap' para que los elementos se ajusten en pantallas pequeñas */}
                <Space wrap>
                    <Form.Item name={['dob', 'day']} noStyle rules={[{ required: true }]}>
                        <Select placeholder="Day" style={{ minWidth: '80px' }}>{Array.from({ length: 31 }, (_, i) => i + 1).map(day => <Option key={day} value={day}>{day}</Option>)}</Select>
                    </Form.Item>
                    <Form.Item name={['dob', 'month']} noStyle rules={[{ required: true }]}>
                        <Select placeholder="Month" style={{ minWidth: '120px' }}>{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => <Option key={month} value={index + 1}>{month}</Option>)}</Select>
                    </Form.Item>
                    <Form.Item name={['dob', 'year']} noStyle rules={[{ required: true }]}>
                        <Input style={{ minWidth: '90px' }} placeholder="Year" />
                    </Form.Item>
                </Space>
            </Form.Item>

            <Row gutter={24}>
                {/* ✨ Se cambian los spans fijos por responsivos */}
                <Col xs={24} lg={12}>
                    <Form.Item name="cityOfBirth" label="CITY OF BIRTH *" rules={[{ required: true }]}>
                        <Input placeholder="City of Birth" />
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item name="countryOfBirth" label="COUNTRY OF BIRTH *" rules={[{ required: true }]}>
                       <CountrySelect placeholder="Select Country" />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default ApplicantForm;