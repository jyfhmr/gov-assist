import React from 'react';
import { Result, Button, Typography } from 'antd';

const { Paragraph } = Typography;

interface SuccessPageProps {
  applicationId?: string;
  email?: string;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ applicationId, email }) => {
  return (
    <Result
      status="success"
      title="Application Submitted Successfully!"
      subTitle={
        <Paragraph>
          Application ID: <strong>{applicationId || 'N/A'}</strong>. A confirmation and receipt have been sent to <strong>{email || 'your email address'}</strong>.
        </Paragraph>
      }
      extra={[
        <Paragraph key="info" type="secondary" style={{ maxWidth: 500, margin: 'auto' }}>
          Our team will now review your application. This process typically takes 3-5 business days. We will contact you if any further information is required.
        </Paragraph>,
        <Button 
          type="primary" 
          key="contact" 
          href="mailto:jyfhmr@gmail.com" 
          style={{ marginTop: '24px' }}
        >
          Contact Support
        </Button>,
      ]}
    />
  );
};

export default SuccessPage;