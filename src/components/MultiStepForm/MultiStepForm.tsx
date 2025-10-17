import React, { useState } from 'react';
import { Steps, Button, Form, message, theme } from 'antd';
import ApplicantForm from '../ApplicantForm/ApplicantForm';
import PassportForm from '../PassportForm/PassportForm';
import EligibilityForm from '../EligibilityForm/EligibilityForm';
import PersonalForm from '../PersonalForm/PersonalForm';
import SocialMediaForm from '../SocialMediaForm/SocialMediaForm';
import EmploymentForm from '../EmploymentForm/EmploymentForm';
import TravelForm from '../TravelForm/TravelForm';
import ReviewForm from '../ReviewForm/ReviewForm';

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
        {
            title: 'Social Media Information',
            content: <SocialMediaForm />,
            fields: [],
        },
        {
            title: 'Employment Information',
            content: <EmploymentForm />,
            fields: ['hasEmployer'],
        },
        {
            title: 'Travel Information',
            content: <TravelForm />,
            fields: ['isTransit', 'emergency_familyName', 'emergency_firstName', 'emergency_email', 'emergency_phoneCode', 'emergency_phoneNumber'],
        },
        {
            title: 'Review & Certification',
            content: <ReviewForm />,
            fields: ['declarationAgree', 'thirdPartyAgree', 'securityQuestion', 'securityAnswer'],
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

    const initialFormValues = {
        // Step 1: Applicant Information
        email: '',
        passportPhoto: [],
        firstName: '',
        familyName: '',
        hasAliases: false,
        aliases: [],
        dob: { day: undefined, month: undefined, year: '' },
        cityOfBirth: '',
        countryOfBirth: undefined,

        // Step 2: Passport Information
        countryOfCitizenship: undefined,
        issuingCountry: undefined,
        passportNumber: '',
        passportNumberConfirm: '',
        nationalId: '',
        personalId: '',
        gender: undefined,
        hasOtherDocuments: false,
        otherDocuments: [],
        isOtherCitizenNow: false,
        currentCitizenships: [],
        wasOtherCitizen: false,
        pastCitizenships: [],
        isGlobalEntryMember: false,
        passId: '',

        // Step 3: Eligibility Information
        q1_health: false,
        q2_crime: false,
        q3_drugs: false,
        q4_terror: false,
        q5_fraud: false,
        q6_employment: false,
        q7_visa_denial: false,
        q8_overstay: false,
        q9_travel: false,

        // Step 4: Personal Information
        address1: '',
        address2: '',
        apartmentNumber: '',
        city: '',
        stateProvince: '',
        country: undefined,
        phoneType: undefined,
        countryPhoneCode: '',
        phoneNumber: '',
        motherFamilyName: '',
        motherFirstName: '',
        fatherFamilyName: '',
        fatherFirstName: '',

        // Step 5: Social Media Information
        noOnlinePresence: false,
        facebookId: '',
        linkedinLink: '',
        twitterId: '',
        instagramId: '',
        otherSocials: [],

        // Step 6: Employment Information
        hasEmployer: false,
        jobTitle: '',
        employerName: '',
        employerAddress1: '',
        employerAddress2: '',
        employerCity: '',
        employerState: '',
        employerCountry: undefined,
        employerCountryCode: '',
        employerPhone: '',

        // Step 7: Travel Information
        isTransit: false,
        departureDate: { day: undefined, month: undefined, year: '' },
        lessThan24h: false,
        isPointOfContactUnknown: false,
        poc_name: '',
        poc_address1: '',
        poc_address2: '',
        poc_apartment: '',
        poc_city: '',
        poc_state: undefined,
        poc_phoneCode: '',
        poc_phoneNumber: '',
        useSameAddressAsAbove: false,
        stay_address1: '',
        stay_address2: '',
        stay_apartment: '',
        stay_city: '',
        stay_state: undefined,
        emergency_familyName: '',
        emergency_firstName: '',
        emergency_email: '',
        emergency_phoneCode: '',
        emergency_phoneNumber: '',
        selfie: [],
        remindMeLater: false,

        // Step 8: Review & Certification
        declarationAgree: false,
        thirdPartyAgree: false,
        securityQuestion: undefined,
        securityAnswer: '',
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical" initialValues={initialFormValues}>
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