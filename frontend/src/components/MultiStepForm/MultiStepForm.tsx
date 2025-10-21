import React, { useEffect, useState } from "react";
import { Steps, Button, Form, theme, Space, Typography } from "antd";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import useMediaQuery from "../../hooks/useMediaQuery";

import ApplicantForm from "../ApplicantForm/ApplicantForm";
import PassportForm from "../PassportForm/PassportForm";
import EligibilityForm from "../EligibilityForm/EligibilityForm";
import PersonalForm from "../PersonalForm/PersonalForm";
import SocialMediaForm from "../SocialMediaForm/SocialMediaForm";
import EmploymentForm from "../EmploymentForm/EmploymentForm";
import TravelForm from "../TravelForm/TravelForm";
import ReviewForm from "../ReviewForm/ReviewForm";
import PaymentForm from "../PaymentForm/PaymentForm";
import SuccessPage from "../SuccessPage/SuccessPage";
import { BASE_SERVICE_COST, GOVERNMENT_FEE, REFUSAL_GUARANTEE_COST } from "../../constants";

const { Title, Text } = Typography;

const MultiStepForm: React.FC = () => {
  const { t } = useTranslation();
  const [isConfirming, setIsConfirming] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(
    BASE_SERVICE_COST + GOVERNMENT_FEE + REFUSAL_GUARANTEE_COST
  );

  const createPaymentIntentUrl = "http://localhost:8000/api/create-payment-intent.php";
  const saveApplicationUrl = "http://localhost:8000/api/save-application.php";

  //   const createPaymentIntentUrl = "https://visa-govassist.org/backend/api/create-payment-intent.php";
  // const saveApplicationUrl = "https://visa-govassist.org/backend/api/save-application.php";

  const createPaymentIntent = async (formData: any) => {
    const response = await fetch(createPaymentIntentUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Math.round(paymentAmount * 100), formData }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred while creating the payment intent.");
    }
    return response.json();
  };

  const saveApplication = async (payload: { formData: any; paymentIntentId: string; }) => {
    const response = await fetch(saveApplicationUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save application.");
    }
    return response.json();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error('Validation Failed:', errorInfo);
    // Muestra un toast genérico para asegurar que el usuario vea el error
    toast.error(t('toast_validation_error'));
    // Opcional: Intenta hacer scroll al primer campo con error
    if (errorInfo.errorFields.length > 0) {
      const errorFieldName = errorInfo.errorFields[0].name;
      form.scrollToField(errorFieldName);
    }
  };

  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const { token } = theme.useToken();
  const stripe = useStripe();
  const elements = useElements();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [submissionStatus, setSubmissionStatus] = useState({ isSuccess: false, applicationId: "", email: "" });

  useEffect(() => {
    // Cada vez que 'current' cambie, haz scroll hacia arriba.
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Para una animación suave en lugar de un salto brusco
    });
  }, [current])

  const steps = [
    { title: t('multistep_form_step_applicant_info'), content: <ApplicantForm />, fields: ["email", "passportPhoto", "firstName", "familyName", "dob", "cityOfBirth", "countryOfBirth"] },
    { title: t('multistep_form_step_passport_info'), content: <PassportForm />, fields: ["countryOfCitizenship", "issuingCountry", "passportNumber", "passportNumberConfirm", "gender", "hasOtherDocuments", "isOtherCitizenNow", "wasOtherCitizen", "isGlobalEntryMember"] },
    { title: t('multistep_form_step_eligibility_info'), content: <EligibilityForm />, fields: ["q1_health", "q2_crime", "q3_drugs", "q4_terror", "q5_fraud", "q6_employment", "q7_visa_denial", "q8_overstay", "q9_travel"] },
    { title: t('multistep_form_step_personal_info'), content: <PersonalForm />, fields: ["address1", "city", "stateProvince", "country", "phoneType", "countryPhoneCode", "phoneNumber", "motherFamilyName", "motherFirstName", "fatherFamilyName", "fatherFirstName"] },
    { title: t('multistep_form_step_social_media_info'), content: <SocialMediaForm />, fields: [] },
    { title: t('multistep_form_step_employment_info'), content: <EmploymentForm />, fields: ["hasEmployer"] },
    { title: t('multistep_form_step_travel_info'), content: <TravelForm />, fields: ["isTransit", "emergency_familyName", "emergency_firstName", "emergency_email", "emergency_phoneCode", "emergency_phoneNumber"] },
    { title: t('multistep_form_step_review_cert'), content: <ReviewForm />, fields: ["declarationAgree", "thirdPartyAgree", "securityQuestion", "securityAnswer"] },
    { title: t('multistep_form_step_payment'), content: <PaymentForm onTotalAmountChange={setPaymentAmount} />, fields: ['fullName', 'billingEmail', 'billingAddress', 'termsAgree'] },
  ];

  const saveApplicationMutation = useMutation({
    mutationFn: saveApplication,
    onSuccess: (data, variables) => {
      toast.success(t('toast_save_success'));
      setSubmissionStatus({ isSuccess: true, applicationId: data.application_id, email: variables.formData.email });
    },
    onError: (error) => {
      toast.error(t('toast_save_critical_error', { detail: error.message }));
    },
  });

  const createPaymentIntentMutation = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: async (data, originalFormData) => {
      if (isConfirming) return;
      setIsConfirming(true);
      const { clientSecret } = data;
      if (!stripe || !elements) { setIsConfirming(false); return; }
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) { setIsConfirming(false); return; }
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, { payment_method: { card: cardElement } });
      if (error) {
        toast.error(error.message || t('toast_payment_unexpected_error'));
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        saveApplicationMutation.mutate({ formData: originalFormData, paymentIntentId: paymentIntent.id });
      }
      setIsConfirming(false);
    },
    onError: (error) => {
      toast.error(t('toast_payment_initiate_error', { detail: error.message }));
    },
  });

  const handleNext = async () => {
    try {
      const fieldsToValidate = steps[current].fields;
      await form.validateFields(fieldsToValidate);
      setCurrent(current + 1);
    } catch (err) {
      toast.error(t('toast_validation_error'));
    }
  };

  const handleBack = () => { setCurrent(current - 1); };

  const handleFinalSubmit = async () => {
        try {
            // Validamos SÓLO los campos del último paso (Payment)
            const fieldsToValidate = steps[steps.length - 1].fields;

            await form.validateFields(fieldsToValidate);

            // Si la validación del último paso es exitosa, obtenemos TODOS los valores
            const allValues = form.getFieldsValue(true); 
            
            // Y ahora sí, llamamos a la mutación para crear el Payment Intent
            createPaymentIntentMutation.mutate(allValues);

        } catch (errorInfo) {
            // Si falla la validación del último paso, mostramos el error
            console.error('Validation Failed on Final Step:', errorInfo);
            toast.error(t('toast_validation_error'));
            // Intentamos hacer scroll al primer campo con error en el paso actual
            if (errorInfo && (errorInfo as any).errorFields && (errorInfo as any).errorFields.length > 0) {
                 const errorFieldName = (errorInfo as any).errorFields[0].name;
                 form.scrollToField(errorFieldName);
            }
        }
    };

  const contentStyle: React.CSSProperties = { marginTop: "24px", padding: "24px", border: `1px dashed ${token.colorBorder}`, borderRadius: token.borderRadiusLG, backgroundColor: token.colorFillAlter };
  const initialFormValues = {
    // Step 1: Applicant Information
    email: "",
    passportPhoto: [],
    firstName: "",
    familyName: "",
    hasAliases: false,
    aliases: [],
    dob: { day: undefined, month: undefined, year: "" },
    cityOfBirth: "",
    countryOfBirth: undefined,

    // Step 2: Passport Information
    countryOfCitizenship: undefined,
    issuingCountry: undefined,
    passportNumber: "",
    passportNumberConfirm: "",
    nationalId: "",
    personalId: "",
    gender: undefined,
    hasOtherDocuments: false,
    otherDocuments: [],
    isOtherCitizenNow: false,
    currentCitizenships: [],
    wasOtherCitizen: false,
    pastCitizenships: [],
    isGlobalEntryMember: false,
    passId: "",

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
    address1: "",
    address2: "",
    apartmentNumber: "",
    city: "",
    stateProvince: "",
    country: undefined,
    phoneType: undefined,
    countryPhoneCode: "",
    phoneNumber: "",
    motherFamilyName: "",
    motherFirstName: "",
    fatherFamilyName: "",
    fatherFirstName: "",

    // Step 5: Social Media Information
    noOnlinePresence: false,
    facebookId: "",
    linkedinLink: "",
    twitterId: "",
    instagramId: "",
    otherSocials: [],

    // Step 6: Employment Information
    hasEmployer: false,
    jobTitle: "",
    employerName: "",
    employerAddress1: "",
    employerAddress2: "",
    employerCity: "",
    employerState: "",
    employerCountry: undefined,
    employerCountryCode: "",
    employerPhone: "",

    // Step 7: Travel Information
    isTransit: false,
    departureDate: { day: undefined, month: undefined, year: "" },
    lessThan24h: false,
    isPointOfContactUnknown: false,
    poc_name: "",
    poc_address1: "",
    poc_address2: "",
    poc_apartment: "",
    poc_city: "",
    poc_state: undefined,
    poc_phoneCode: "",
    poc_phoneNumber: "",
    useSameAddressAsAbove: false,
    stay_address1: "",
    stay_address2: "",
    stay_apartment: "",
    stay_city: "",
    stay_state: undefined,
    emergency_familyName: "",
    emergency_firstName: "",
    emergency_email: "",
    emergency_phoneCode: "",
    emergency_phoneNumber: "",
    selfie: [],
    remindMeLater: false,

    // Step 8: Review & Certification
    declarationAgree: false,
    thirdPartyAgree: false,
    securityQuestion: undefined,
    securityAnswer: "",

    // Step 9: Payment
    fullName: "",
    billingEmail: "",
    billingAddress: undefined,
    termsAgree: false,
    paymentDetails: {
      total: 0,
      expediteOption: '72-hours',
      refusalGuarantee: true,
    }
  };
  const isProcessing = createPaymentIntentMutation.isPending || saveApplicationMutation.isPending || isConfirming;

  const isStripeReady = stripe && elements;

  if (submissionStatus.isSuccess) {
    return <SuccessPage applicationId={submissionStatus.applicationId} email={submissionStatus.email} />;
  }

  return (
    <Form form={form} layout="vertical" initialValues={initialFormValues} onFinishFailed={onFinishFailed}>
      {isMobile ? (
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Title level={4} style={{ marginBottom: 4 }}>{steps[current].title}</Title>
          <Text type="secondary">{t('multistep_form_mobile_step_indicator', { current: current + 1, total: steps.length })}</Text>
        </div>
      ) : (
        <Steps
          current={current}
          items={steps.map((item) => ({ key: item.title, title: item.title }))}
        />
      )}
      <div style={contentStyle}>
        {steps.map((step, index) => (<div key={step.title} style={{ display: index === current ? "block" : "none" }}>{step.content}</div>))}
      </div>
      <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
        <Space>
          {current > 0 && (<Button onClick={handleBack} disabled={!isStripeReady || isProcessing} >{t('button_back')}</Button>)}
          {current < steps.length - 1 && (<Button type="primary" onClick={handleNext}>{t('button_continue')}</Button>)}
          {current === steps.length - 1 && (
            // ✨ 4. El botón final ya NO tiene htmlType="submit" y llama a nuestra nueva función
            <Button
              type="primary"
              onClick={handleFinalSubmit}
              loading={isProcessing}
              disabled={!stripe || !elements || isProcessing} // Mantenemos la lógica de disabled
            >
              {isProcessing ? t('button_processing') : t('button_pay_submit')}
            </Button>
          )}
        </Space>
      </div>
    </Form>
  );
};

export default MultiStepForm;