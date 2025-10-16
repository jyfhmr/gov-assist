import React from 'react';
import { Form, Radio, Typography, Alert } from 'antd';

const { Text } = Typography;

// Array para definir las preguntas y sus nombres en el formulario
const eligibilityQuestions = [
  { name: 'q1_health', text: 'Do you have a physical or mental disorder; or are you a drug abuser or addict; or do you currently have any of the following diseases (communicable diseases are specified pursuant to Section 361(b) of the Public Health Service Act): Cholera, Diphtheria, Tuberculosis, infectious, Plague, Smallpox, Yellow Fever, Viral Hemorrhagic Fevers, including Ebola, Lassa, Marburg, Crimean-Congo, Severe acute respiratory illnesses capable of transmission to other persons and likely to cause mortality.' },
  { name: 'q2_crime', text: 'Have you ever been arrested or convicted for a crime that resulted in serious damage to property, or serious harm to another person or government authority?' },
  { name: 'q3_drugs', text: 'Have you ever violated any law related to possessing, using, or distributing illegal drugs?' },
  { name: 'q4_terror', text: 'Do you seek to engage in or have you ever engaged in terrorist activities, espionage, sabotage, or genocide?' },
  { name: 'q5_fraud', text: 'Have you ever committed fraud or misrepresented yourself or others to obtain, or assist others to obtain, a visa or entry into the United States?' },
  { name: 'q6_employment', text: 'Are you currently seeking employment in the United States or were you previously employed in the United States without prior permission from the U.S. government?' },
  { name: 'q7_visa_denial', text: 'Have you ever been denied a U.S. visa you applied for with your current or previous passport, or have you ever been refused admission to the United States or withdrawn your application for admission at a U.S. port of entry?' },
  { name: 'q8_overstay', text: 'Have you ever stayed in the United States longer than the admission period granted to you by the U.S. government?' },
  { name: 'q9_travel', text: 'Have you traveled to, or been present in Cuba, Iran, Iraq, Libya, North Korea, Somalia, Sudan, Syria or Yemen on or after March 1, 2011?' }
];

const EligibilityForm: React.FC = () => {
  const form = Form.useFormInstance();
  // Observamos todos los valores del formulario para detectar si alguna respuesta es 'true'
  const formValues = Form.useWatch([], form);

  // Verificamos si alguna de las preguntas de elegibilidad tiene como respuesta 'true'
  const hasProblematicAnswer = eligibilityQuestions.some(q => formValues && formValues[q.name] === true);

  return (
    <>
      {eligibilityQuestions.map((question, index) => (
        <Form.Item
          key={question.name}
          name={question.name}
          // Usamos un layout horizontal para alinear la pregunta y los botones
          label={`${index + 1}) ${question.text}`}
          labelCol={{ span: 18 }} // Ajusta el ancho de la pregunta
          wrapperCol={{ span: 6 }} // Ajusta el ancho de los botones
          style={{ marginBottom: '24px', borderBottom: '1px solid #f0f0f0', paddingBottom: '24px' }}
          rules={[{ required: true, message: 'Please select an answer' }]}
        >
          <Radio.Group style={{ float: 'right' }}>
            <Radio.Button value={false}>No</Radio.Button>
            <Radio.Button value={true}>Yes</Radio.Button>
          </Radio.Group>
        </Form.Item>
      ))}

      {/* Alerta condicional */}
      {hasProblematicAnswer && (
        <Alert
          type="warning"
          showIcon
          message="At least one of your answers in the Eligibility Information section is problematic..."
          description={
            <div>
              <Text>We advise you to be proactive and plan your next steps carefully with the help of our expert assistance. Not all hope is lost, here is your best chance:</Text>
              <ul>
                <li>Benefit from a personal advisor...</li>
                <li>24/7 limitless support...</li>
                <li>User-friendly digital tools...</li>
                <li>Decades of experience.</li>
              </ul>
              <Text strong>We highly recommend you to continue your application with our U.S. Visa Premium Plan detailed above.</Text>
            </div>
          }
        />
      )}
    </>
  );
};

export default EligibilityForm;