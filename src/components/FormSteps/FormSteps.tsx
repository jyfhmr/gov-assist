import React, { useState } from 'react';
import { Steps, Button, Typography, Space } from 'antd';
import './FormSteps.css';

const { Title } = Typography;

const steps = [
  {
    title: 'Applicant Details',
    content: 'Aquí va el formulario de Applicant Details...',
  },
  {
    title: 'Travel Details',
    content: 'Aquí va el formulario de Travel Details...',
  },
  {
    title: 'Eligibility Questions',
    content: 'Aquí va el formulario de Eligibility Questions...',
  },
  {
    title: 'Review',
    content: 'Aquí va el resumen para Review...',
  },
  {
    title: 'Payment',
    content: 'Aquí va la sección de Payment...',
  },
];

const FormSteps: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps current={current} items={items} />
      <div className="steps-content">
        <Title level={4}>{steps[current].title}</Title>
        {steps[current].content}
      </div>
      <div className="steps-action">
        <Space>
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Back
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Continue
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary">
              Proceed to Payment
            </Button>
          )}
        </Space>
      </div>
    </>
  );
};

export default FormSteps;