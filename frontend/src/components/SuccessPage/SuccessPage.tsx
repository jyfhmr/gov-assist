import React from 'react';
import { Result, Button, Typography } from 'antd';
import { useTranslation, Trans } from 'react-i18next';

const { Paragraph } = Typography;

interface SuccessPageProps {
  applicationId?: string;
  email?: string;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ applicationId, email }) => {
  const { t } = useTranslation();

  return (
    <Result
      status="success"
      title={t('success_page_title')}
      subTitle={
        <Paragraph>
          <Trans
            i18nKey="success_page_subtitle"
            values={{
              applicationId: applicationId || 'N/A',
              email: email || t('success_page_default_email')
            }}
            components={{ strong: <strong /> }}
          />
        </Paragraph>
      }
      extra={[
        <Paragraph key="info" type="secondary" style={{ maxWidth: 500, margin: 'auto' }}>
          {t('success_page_extra_info')}
        </Paragraph>,
        <Button 
          type="primary" 
          key="contact" 
          href="mailto:jyfhmr@gmail.com" 
          style={{ marginTop: '24px' }}
        >
          {t('success_page_contact_button')}
        </Button>,
      ]}
    />
  );
};

export default SuccessPage;