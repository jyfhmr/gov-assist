import React from 'react';
import { Form, Radio, Typography, Alert } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const EligibilityForm: React.FC = () => {
    const { t } = useTranslation();
    const form = Form.useFormInstance();
    const formValues = Form.useWatch([], form);
    
    // Array para definir las preguntas. Se mueve aquí para poder usar la función 't'.
    const eligibilityQuestions = [
        { name: 'q1_health', text: t('eligibility_form_q1_health') },
        { name: 'q2_crime', text: t('eligibility_form_q2_crime') },
        { name: 'q3_drugs', text: t('eligibility_form_q3_drugs') },
        { name: 'q4_terror', text: t('eligibility_form_q4_terror') },
        { name: 'q5_fraud', text: t('eligibility_form_q5_fraud') },
        { name: 'q6_employment', text: t('eligibility_form_q6_employment') },
        { name: 'q7_visa_denial', text: t('eligibility_form_q7_visa_denial') },
        { name: 'q8_overstay', text: t('eligibility_form_q8_overstay') },
        { name: 'q9_travel', text: t('eligibility_form_q9_travel') }
    ];

    const hasProblematicAnswer = eligibilityQuestions.some(q => formValues && formValues[q.name] === true);

    return (
        <>
            <Typography.Title level={4}>{t('eligibility_form_title')}</Typography.Title>
            {eligibilityQuestions.map((question, index) => (
                <Form.Item
                    key={question.name}
                    name={question.name}
                    label={`${index + 1}) ${question.text}`}
                    labelCol={{ span: 18 }}
                    wrapperCol={{ span: 6 }}
                    style={{ marginBottom: '24px', borderBottom: '1px solid #f0f0f0', paddingBottom: '24px' }}
                    rules={[{ required: true, message: t('validation_select_answer') }]}
                >
                    <Radio.Group style={{ float: 'right' }}>
                        <Radio.Button value={false}>{t('no')}</Radio.Button>
                        <Radio.Button value={true}>{t('yes')}</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            ))}

            {hasProblematicAnswer && (
                <Alert
                    type="warning"
                    showIcon
                    message={t('eligibility_form_warning_message')}
                    description={
                        <div>
                            <Text>{t('eligibility_form_warning_desc_1')}</Text>
                            <ul>
                                <li>{t('eligibility_form_warning_desc_li_1')}</li>
                                <li>{t('eligibility_form_warning_desc_li_2')}</li>
                                <li>{t('eligibility_form_warning_desc_li_3')}</li>
                                <li>{t('eligibility_form_warning_desc_li_4')}</li>
                            </ul>
                            <Text strong>{t('eligibility_form_warning_desc_2')}</Text>
                        </div>
                    }
                />
            )}
        </>
    );
};

export default EligibilityForm;