import React from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Typography,
  Checkbox,
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

// List of platforms for the dynamic selector
const socialPlatforms = [
  "ASKfm", "JustPaste.it", "LinkedIn", "Tumblr", "Twitter", 
  "VKontakte (VK)", "YouTube", "TikTok", "Other"
];

const SocialMediaForm: React.FC = () => {
  const form = Form.useFormInstance();
  // Watcher to check if the user has an online presence
  const noOnlinePresence = Form.useWatch('noOnlinePresence', form);

  return (
    <>
      <Title level={4}>Social Media</Title>
      <Typography.Paragraph>Please add your social media details below.</Typography.Paragraph>

      <Form.Item name="noOnlinePresence" valuePropName="checked">
        <Checkbox>I do not have an online presence.</Checkbox>
      </Form.Item>

      <Row gutter={24}>
        <Col xs={24} sm={12} lg={6}>
          <Form.Item name="facebookId" label="FACEBOOK PAGE ID">
            <Input placeholder="Facebook Page ID" disabled={noOnlinePresence} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Form.Item name="linkedinLink" label="LINKEDIN PROFILE LINK">
            <Input placeholder="LinkedIn Profile Link" disabled={noOnlinePresence} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Form.Item name="twitterId" label="TWITTER USER ID">
            <Input placeholder="Twitter User ID" disabled={noOnlinePresence} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Form.Item name="instagramId" label="INSTAGRAM USER ID">
            <Input placeholder="Instagram User ID" disabled={noOnlinePresence} />
          </Form.Item>
        </Col>
      </Row>

      <hr style={{ margin: '20px 0' }} />
      
      <Form.List name="otherSocials">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={[16, 0]} align="bottom" style={{ marginBottom: 8 }}>
                <Col xs={24} lg={11}>
                  <Form.Item
                    {...restField}
                    name={[name, 'platform']}
                    label="PLATFORM"
                    rules={[{ required: true, message: 'Platform is required' }]}
                  >
                    <Select placeholder="Select Platform" disabled={noOnlinePresence}>
                      {socialPlatforms.map(p => <Option key={p} value={p}>{p}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} lg={11}>
                  <Form.Item
                    {...restField}
                    name={[name, 'identifier']}
                    label="SOCIAL MEDIA IDENTIFIER"
                    rules={[{ required: true, message: 'Identifier is required' }]}
                  >
                    <Input placeholder="Social Media Identifier" disabled={noOnlinePresence} />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={2} style={{ textAlign: 'center', paddingBottom: '10px' }}>
                  <MinusCircleOutlined 
                    onClick={() => !noOnlinePresence && remove(name)} 
                    style={{ fontSize: '20px', color: '#ff4d4f', cursor: 'pointer' }}
                  />
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} disabled={noOnlinePresence}>
                Add Social Media
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default SocialMediaForm;