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
  Space
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
        <Col span={6}>
          <Form.Item name="facebookId" label="FACEBOOK PAGE ID">
            <Input placeholder="Facebook Page ID" disabled={noOnlinePresence} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="linkedinLink" label="LINKEDIN PROFILE LINK">
            <Input placeholder="LinkedIn Profile Link" disabled={noOnlinePresence} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="twitterId" label="TWITTER USER ID">
            <Input placeholder="Twitter User ID" disabled={noOnlinePresence} />
          </Form.Item>
        </Col>
        <Col span={6}>
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
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'platform']}
                  label="PLATFORM"
                  rules={[{ required: true, message: 'Platform is required' }]}
                  style={{ width: '250px' }}
                >
                  <Select placeholder="Select Platform" disabled={noOnlinePresence}>
                    {socialPlatforms.map(p => <Option key={p} value={p}>{p}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'identifier']}
                  label="SOCIAL MEDIA IDENTIFIER"
                  rules={[{ required: true, message: 'Identifier is required' }]}
                  style={{ width: '350px' }}
                >
                  <Input placeholder="Social Media Identifier" disabled={noOnlinePresence} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => !noOnlinePresence && remove(name)} />
              </Space>
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