import React from 'react';
import { Form, Input, Button, Select, Row, Col, Typography, Checkbox } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const { Option } = Select;

const socialPlatforms = [
  "ASKfm", "JustPaste.it", "LinkedIn", "Tumblr", "Twitter", 
  "VKontakte (VK)", "YouTube", "TikTok", "Other"
];

const SocialMediaForm: React.FC = () => {
  const { t } = useTranslation();
  const form = Form.useFormInstance();
  const noOnlinePresence = Form.useWatch('noOnlinePresence', form);

  return (
    <>
      <Title level={4}>{t('social_media_form_title')}</Title>
      <Typography.Paragraph>{t('social_media_form_description')}</Typography.Paragraph>

      <Form.Item name="noOnlinePresence" valuePropName="checked">
        <Checkbox>{t('social_media_form_no_presence_checkbox')}</Checkbox>
      </Form.Item>

      <Row gutter={24}>
        <Col xs={24} sm={12} lg={6}>
          <Form.Item name="facebookId" label={t('social_media_form_facebook_label')}>
            <Input placeholder={t('social_media_form_facebook_placeholder')} disabled={noOnlinePresence} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Form.Item name="linkedinLink" label={t('social_media_form_linkedin_label')}>
            <Input placeholder={t('social_media_form_linkedin_placeholder')} disabled={noOnlinePresence} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Form.Item name="twitterId" label={t('social_media_form_twitter_label')}>
            <Input placeholder={t('social_media_form_twitter_placeholder')} disabled={noOnlinePresence} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Form.Item name="instagramId" label={t('social_media_form_instagram_label')}>
            <Input placeholder={t('social_media_form_instagram_placeholder')} disabled={noOnlinePresence} />
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
                    label={t('social_media_form_platform_label')}
                    rules={[{ required: true, message: t('validation_required') }]}
                  >
                    <Select placeholder={t('social_media_form_platform_placeholder')} disabled={noOnlinePresence}>
                      {socialPlatforms.map(p => <Option key={p} value={p}>{p}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} lg={11}>
                  <Form.Item
                    {...restField}
                    name={[name, 'identifier']}
                    label={t('social_media_form_identifier_label')}
                    rules={[{ required: true, message: t('validation_required') }]}
                  >
                    <Input placeholder={t('social_media_form_identifier_placeholder')} disabled={noOnlinePresence} />
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
                {t('social_media_form_add_button')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default SocialMediaForm;