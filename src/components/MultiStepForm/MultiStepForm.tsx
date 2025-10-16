import React, { useState } from 'react';
import { Steps, Button, Form, message, theme } from 'antd';
import ApplicantForm from '../ApplicantForm/ApplicantForm';
import PassportForm from '../PassportForm/PassportForm';
import EligibilityForm from '../EligibilityForm/EligibilityForm';
import PersonalForm from '../PersonalForm/PersonalForm';

const MultiStepForm: React.FC = () => {
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const { token } = theme.useToken();

    const steps = [
        {
            title: 'Applicant Information',
            content: <ApplicantForm />,
            fields: ['email', 'passportPhoto', 'firstName', 'familyName', 'dob', 'cityOfBirth', 'countryOfBirth'],
        },
        {
            title: 'Passport Information',
            content: <PassportForm />,
            fields: [
                'countryOfCitizenship', 'issuingCountry', 'passportNumber', 'passportNumberConfirm', 'gender',
                'hasOtherDocuments', 'isOtherCitizenNow', 'wasOtherCitizen', 'isGlobalEntryMember'
            ],
        },
        {
            title: 'Eligibility Information',
            content: <EligibilityForm />,
            fields: [
                'q1_health', 'q2_crime', 'q3_drugs', 'q4_terror', 'q5_fraud',
                'q6_employment', 'q7_visa_denial', 'q8_overstay', 'q9_travel'
            ],
        },
        {
            title: 'Personal Information',
            content: <PersonalForm />,
            fields: [
                'address1', 'city', 'stateProvince', 'country', 'phoneType',
                'countryPhoneCode', 'phoneNumber', 'motherFamilyName', 'motherFirstName',
                'fatherFamilyName', 'fatherFirstName'
            ],
        },
    ];

    const handleNext = async () => {
        try {
            const fieldsToValidate = steps[current].fields;
            await form.validateFields(fieldsToValidate);
            setCurrent(current + 1);
        } catch (err) {
            message.error('Please complete all required fields.');
        }
    };

    const handleBack = () => {
        setCurrent(current - 1);
    };

    const onFinish = (values: any) => {
        // ✨ AHORA SÍ: 'values' tendrá todos los datos de todos los pasos.
        console.log('JSON final con todos los datos:', values);
        message.success('Form submitted successfully!');
    };

    const contentStyle: React.CSSProperties = {
        marginTop: '32px',
        padding: '24px',
        border: `1px dashed ${token.colorBorder}`,
        borderRadius: token.borderRadiusLG,
        backgroundColor: token.colorFillAlter,
    };

    const handleTestJson = () => {
        // getFieldsValue(true) obtiene todos los valores, incluyendo los de campos no visibles.
        const values = form.getFieldsValue(true);
        console.log('--- JSON de Prueba ---', values);
        message.info('El estado actual del JSON se ha mostrado en la consola.');
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical" initialValues={{ hasAliases: false }}>
            <Steps
                current={current}
                items={steps.map((item) => ({ key: item.title, title: item.title }))}
            />

            {/* --- CAMBIO CLAVE AQUÍ --- */}
            <div style={contentStyle}>
                {/* Mapeamos TODOS los pasos y ocultamos los inactivos */}
                {steps.map((step, index) => (
                    <div key={step.title} style={{ display: index === current ? 'block' : 'none' }}>
                        {step.content}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={handleBack}>
                        Back
                    </Button>
                )}

                {/* --- INICIO DEL CAMBIO EN LOS BOTONES --- */}
                {current === steps.length - 1 && (
                    <Button onClick={handleTestJson} style={{ marginLeft: 8 }}>
                        Test JSON
                    </Button>
                )}
                {/* --- FIN DEL CAMBIO EN LOS BOTONES --- */}

                {current < steps.length - 1 && (
                    <Button type="primary" onClick={handleNext}>
                        Continue
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" htmlType="submit">
                        Proceed to Payment
                    </Button>
                )}
            </div>
        </Form>
    );
};

export default MultiStepForm;