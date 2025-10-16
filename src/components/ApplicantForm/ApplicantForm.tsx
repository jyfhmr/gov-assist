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
import countries from '../../data/countries.json';

const { Title, Text } = Typography;
const { Option } = Select;

// ✨ NOTA: Ya no recibe onFinish ni initialValues. Es solo un componente de UI.
const ApplicantForm: React.FC = () => {
    // Obtenemos la instancia del formulario del componente padre.
    const form = Form.useFormInstance();
    const showAliases = Form.useWatch('hasAliases', form);

    return (
        // ✨ NOTA: Se eliminó el <Form> wrapper y el botón de submit.
        <>
            <Title level={4}>General Information</Title>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label={<span>EMAIL ADDRESS * <Tooltip title="..."><QuestionCircleOutlined /></Tooltip></span>}
                        rules={[{ required: true, message: 'Please input your email!' }, { type: 'email' }]}
                    >
                        <Input placeholder="Email Address" />
                    </Form.Item>
                    <Text type="secondary">Please make sure you enter a valid email address...</Text>
                </Col>
                <Col span={12}>
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
                    {/* <Text type="secondary">Our systems will check if your photo meets the requirements...</Text> */}
                </Col>
            </Row>

            <div style={{ height: '40px' }} />

            <Title level={4}>Applicant Information</Title>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item name="firstName" label="FIRST (GIVEN) NAME(S) *" rules={[{ required: true }]}>
                        <Input placeholder="First (Given) Name(s)" />
                    </Form.Item>
                </Col>
                <Col span={12}>
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
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item {...restField} name={[name, 'firstName']} rules={[{ required: true }]} style={{ width: '300px' }}>
                                        <Input placeholder="First (Given) Name(s)" />
                                    </Form.Item>
                                    <Form.Item {...restField} name={[name, 'familyName']} rules={[{ required: true }]} style={{ width: '300px' }}>
                                        <Input placeholder="Family Name(s)" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Alias</Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            )}

            <Form.Item label="DATE OF BIRTH *">
                <Space.Compact>
                    <Form.Item name={['dob', 'day']} noStyle rules={[{ required: true }]}>
                        <Select placeholder="Day" style={{ width: '20%' }}>{Array.from({ length: 31 }, (_, i) => i + 1).map(day => <Option key={day} value={day}>{day}</Option>)}</Select>
                    </Form.Item>
                    <Form.Item name={['dob', 'month']} noStyle rules={[{ required: true }]}>
                        <Select placeholder="Month" style={{ width: '50%' }}>{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => <Option key={month} value={index + 1}>{month}</Option>)}</Select>
                    </Form.Item>
                    <Form.Item name={['dob', 'year']} noStyle rules={[{ required: true }]}>
                        <Input style={{ width: '30%' }} placeholder="Year" />
                    </Form.Item>
                </Space.Compact>
            </Form.Item>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item name="cityOfBirth" label="CITY OF BIRTH *" rules={[{ required: true }]}>
                        <Input placeholder="City of Birth" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="countryOfBirth" label="COUNTRY OF BIRTH *" rules={[{ required: true }]}>
                        <Select placeholder="Select Country" showSearch>
                            {countries.map(country => (
                                <Option key={country} value={country}>
                                    {country}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default ApplicantForm;