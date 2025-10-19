import React from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Typography,
  Radio,
  Space,
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import CountrySelect from '../CountrySelect/CountrySelect';

const { Title } = Typography;
const { Option } = Select;

const PassportForm: React.FC = () => {
  const form = Form.useFormInstance();

  const hasOtherDocuments = Form.useWatch('hasOtherDocuments', form);
  const isOtherCitizenNow = Form.useWatch('isOtherCitizenNow', form);
  const wasOtherCitizen = Form.useWatch('wasOtherCitizen', form);
  const isGlobalEntryMember = Form.useWatch('isGlobalEntryMember', form);

  return (
    <>
      {/* --- Información Principal del Pasaporte --- */}
      <Row gutter={24}>
        <Col xs={24} lg={12}>
          <Form.Item name="countryOfCitizenship" label="COUNTRY OF CITIZENSHIP *" rules={[{ required: true }]}>
            <CountrySelect placeholder="Select Country" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item name="issuingCountry" label="ISSUING COUNTRY *" rules={[{ required: true }]}>
            <CountrySelect placeholder="Select Country" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} lg={12}>
          <Form.Item name="passportNumber" label="PASSPORT NUMBER *" rules={[{ required: true }]}>
            <Input placeholder="Passport Number" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            name="passportNumberConfirm"
            label="PASSPORT NUMBER CONFIRM *"
            dependencies={['passportNumber']}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('passportNumber') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passport numbers that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input placeholder="Re-enter the passport number" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        {/* Aquí podrías añadir los selectores de fecha de emisión y expiración */}
      </Row>
      <Row gutter={24}>
        <Col xs={24} lg={12}>
          <Form.Item name="nationalId" label="NATIONAL IDENTIFICATION NUMBER">
            <Input placeholder="National Identification Number" />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item name="personalId" label="PERSONAL IDENTIFICATION NUMBER">
            <Input placeholder="Please specify your PIN, if applicable" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="gender" label="GENDER *" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value="female">Female</Radio>
          <Radio value="male">Male</Radio>
        </Radio.Group>
      </Form.Item>

      <hr style={{ margin: '30px 0' }}/>

      {/* --- Otros Documentos de Viaje --- */}
      <Form.Item name="hasOtherDocuments" label="HAVE YOU EVER BEEN ISSUED A PASSPORT OR NATIONAL IDENTITY CARD FOR TRAVEL BY ANY OTHER COUNTRY? *">
        <Radio.Group>
          <Radio.Button value={false}>No</Radio.Button>
          <Radio.Button value={true}>Yes</Radio.Button>
        </Radio.Group>
      </Form.Item>

      {hasOtherDocuments && (
        <Form.List name="otherDocuments">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={[16, 0]} align="bottom" style={{ marginBottom: 8 }}>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item {...restField} name={[name, 'issuingCountry']} rules={[{ required: true }]} label="Issuing Country">
                        <CountrySelect placeholder="Select Country" />
                    </Form.Item>
                  </Col>
                   <Col xs={24} sm={12} md={6}>
                    <Form.Item {...restField} name={[name, 'documentType']} rules={[{ required: true }]} label="Document Type">
                        <Select placeholder="Select Type"><Option value="passport">Passport</Option><Option value="id">National ID</Option></Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item {...restField} name={[name, 'documentNumber']} rules={[{ required: true }]} label="Document Number">
                        <Input placeholder="Document Number" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={10} md={5}>
                    <Form.Item {...restField} name={[name, 'expirationYear']} rules={[{ required: true }]} label="Expiration Year">
                        <Input placeholder="Year" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={2} md={1}>
                    <MinusCircleOutlined onClick={() => remove(name)} style={{ fontSize: '20px', color: '#ff4d4f' }} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Document</Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      )}

      <hr style={{ margin: '30px 0' }}/>

      {/* --- Otra Ciudadanía / Nacionalidad --- */}
      <Title level={4}>Other Citizenship/Nationality</Title>
      <Form.Item name="isOtherCitizenNow" label="ARE YOU NOW A CITIZEN OR NATIONAL OF ANY OTHER COUNTRY? *">
        <Radio.Group><Radio.Button value={false}>No</Radio.Button><Radio.Button value={true}>Yes</Radio.Button></Radio.Group>
      </Form.Item>
      
      {isOtherCitizenNow && (
        <Form.List name="currentCitizenships">
           {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={[16, 0]} align="middle" style={{ marginBottom: 8 }}>
                    <Col xs={24} lg={11}>
                        <Form.Item {...restField} name={[name, 'country']} rules={[{ required: true }]}>
                            <CountrySelect placeholder="Country" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={11}>
                        <Form.Item {...restField} name={[name, 'how']} rules={[{ required: true }]}>
                            <Select placeholder="How did you acquire?"><Option value="birth">By birth</Option><Option value="parents">Through parents</Option><Option value="naturalized">Naturalized</Option><Option value="other">Other</Option></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={2}>
                        <MinusCircleOutlined onClick={() => remove(name)} style={{ fontSize: '20px', color: '#ff4d4f' }} />
                    </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Citizenship</Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      )}

      <Form.Item name="wasOtherCitizen" label="HAVE YOU EVER BEEN A CITIZEN OR NATIONAL OF ANY OTHER COUNTRY? *">
        <Radio.Group><Radio.Button value={false}>No</Radio.Button><Radio.Button value={true}>Yes</Radio.Button></Radio.Group>
      </Form.Item>
      
      {wasOtherCitizen && (
        <Form.List name="pastCitizenships">
           {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} style={{ border: '1px solid #f0f0f0', padding: '16px', marginBottom: '16px', borderRadius: '8px', position: 'relative' }}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item {...restField} name={[name, 'country']} label="COUNTRY OF CITIZENSHIP / NATIONALITY *" rules={[{ required: true }]}>
                        <CountrySelect placeholder="Select Country" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} lg={12}>
                        <Form.Item label="FROM *">
                            <Space wrap>
                                <Form.Item name={[name, 'fromDate', 'day']} noStyle rules={[{ required: true }]}>
                                    <Select placeholder="Day" style={{ minWidth: '80px' }}>{Array.from({ length: 31 }, (_, i) => i + 1).map(day => <Option key={day} value={day}>{day}</Option>)}</Select>
                                </Form.Item>
                                <Form.Item name={[name, 'fromDate', 'month']} noStyle rules={[{ required: true }]}>
                                    <Select placeholder="Month" style={{ minWidth: '120px' }}>{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => <Option key={month} value={index + 1}>{month}</Option>)}</Select>
                                </Form.Item>
                                <Form.Item name={[name, 'fromDate', 'year']} noStyle rules={[{ required: true }]}>
                                    <Input style={{ minWidth: '90px' }} placeholder="Year" />
                                </Form.Item>
                            </Space>
                        </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                        <Form.Item label="TO *">
                             <Space wrap>
                                <Form.Item name={[name, 'toDate', 'day']} noStyle rules={[{ required: true }]}>
                                    <Select placeholder="Day" style={{ minWidth: '80px' }}>{Array.from({ length: 31 }, (_, i) => i + 1).map(day => <Option key={day} value={day}>{day}</Option>)}</Select>
                                </Form.Item>
                                <Form.Item name={[name, 'toDate', 'month']} noStyle rules={[{ required: true }]}>
                                    <Select placeholder="Month" style={{ minWidth: '120px' }}>{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => <Option key={month} value={index + 1}>{month}</Option>)}</Select>
                                </Form.Item>
                                <Form.Item name={[name, 'toDate', 'year']} noStyle rules={[{ required: true }]}>
                                    <Input style={{ minWidth: '90px' }} placeholder="Year" />
                                </Form.Item>
                            </Space>
                        </Form.Item>
                    </Col>
                  </Row>
                  <MinusCircleOutlined onClick={() => remove(name)} style={{ position: 'absolute', top: 16, right: 16, color: 'red', fontSize: '20px' }} />
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Past Citizenship
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      )}

      <hr style={{ margin: '30px 0' }}/>

      {/* --- GE Membership --- */}
      <Title level={4}>GE Membership</Title>
      <Form.Item name="isGlobalEntryMember" label="ARE YOU A MEMBER OF THE CBP GLOBAL ENTRY PROGRAM? *">
        <Radio.Group><Radio.Button value={false}>No</Radio.Button><Radio.Button value={true}>Yes</Radio.Button></Radio.Group>
      </Form.Item>

      {isGlobalEntryMember && (
         <Form.Item name="passId" label="PASSID / MEMBERSHIP NUMBER *" rules={[{ required: true }]}>
            <Input placeholder="PASSID / Membership Number" />
          </Form.Item>
      )}
    </>
  );
};

export default PassportForm;