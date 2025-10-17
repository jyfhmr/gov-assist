import React from 'react';
import { Typography } from 'antd';
import { CardElement } from '@stripe/react-stripe-js';

const { Title, Paragraph } = Typography;

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const PaymentForm: React.FC = () => {
  return (
    <>
      <Title level={4}>Payment Information</Title>
      <Paragraph>Please enter your payment details below. Your transaction is secure.</Paragraph>
      <div style={{ padding: '20px 10px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
        <CardElement options={cardElementOptions} />
      </div>
    </>
  );
};

export default PaymentForm;