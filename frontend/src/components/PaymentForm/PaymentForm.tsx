import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Radio, Checkbox, Form, Input, Card, Divider, Space } from 'antd';
import { CardElement } from '@stripe/react-stripe-js';
import { useTranslation } from 'react-i18next';
import CountrySelect from '../CountrySelect/CountrySelect';
import { BASE_SERVICE_COST, GOVERNMENT_FEE, REFUSAL_GUARANTEE_COST } from '../../constants';

const { Title, Paragraph, Text, Link } = Typography;

const cardElementOptions = { style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } } };

interface PaymentFormProps { onTotalAmountChange: (amount: number) => void; }

const PaymentForm: React.FC<PaymentFormProps> = ({ onTotalAmountChange }) => {
    const { t } = useTranslation();
    const form = Form.useFormInstance();

    // ✨ 1. Añade la nueva opción de prueba al array
    const EXPEDITE_OPTIONS = [
        // --- OPCIÓN DE PRUEBA ---
        { label: 'Production Test - $0.50', value: 'prod-test', cost: 0.50, description: 'Minimal cost for production payment testing.' },
        // --- Tus opciones normales ---
        { label: t('payment_form_expedite_72h_label'), value: '72-hours', cost: 0.00, description: t('payment_form_expedite_72h_desc') },
        { label: t('payment_form_expedite_24h_label'), value: '24-hours', cost: 28.00, description: t('payment_form_expedite_24h_desc') },
        { label: t('payment_form_expedite_3h_label'), value: '3-hours', cost: 85.00, description: t('payment_form_expedite_3h_desc') },
    ];

    // ✨ 2. Establece la opción de prueba como seleccionada por defecto
    const [selectedExpedite, setSelectedExpedite] = useState(EXPEDITE_OPTIONS[0].value); // Ahora el 'prod-test' es el primero
    const [refusalGuarantee, setRefusalGuarantee] = useState(false); // La quitamos por defecto para el test
    const [total, setTotal] = useState(0);
    const [expediteCost, setExpediteCost] = useState(0);


    useEffect(() => {
        const currentExpediteOption = EXPEDITE_OPTIONS.find(opt => opt.value === selectedExpedite);
        const currentExpediteCost = currentExpediteOption ? currentExpediteOption.cost : 0;
        
        let calculatedTotal: number;

        // ✨ 3. Lógica especial para la opción de prueba: Ignora los costos base
        if (selectedExpedite === 'prod-test') {
            calculatedTotal = currentExpediteCost; // Solo el costo de la opción de prueba
        } else {
            // Lógica normal para las otras opciones
            calculatedTotal = BASE_SERVICE_COST + GOVERNMENT_FEE + currentExpediteCost;
            if (refusalGuarantee) {
                calculatedTotal += REFUSAL_GUARANTEE_COST;
            }
        }
        
        setTotal(calculatedTotal);
        setExpediteCost(currentExpediteCost);
        onTotalAmountChange(calculatedTotal); // Informa al padre el monto CORRECTO a cobrar

        form.setFieldsValue({
            paymentDetails: {
                total: calculatedTotal.toFixed(2),
                expediteOption: selectedExpedite,
                refusalGuarantee: selectedExpedite === 'prod-test' ? false : refusalGuarantee, // Asegura que la garantía no se guarde para el test
            }
        });

    }, [selectedExpedite, refusalGuarantee, onTotalAmountChange, form, t]); // 't' debe estar aquí si EXPEDITE_OPTIONS lo usa

    return (
        <>
            <Form.Item name={['paymentDetails', 'total']} hidden><Input /></Form.Item>
            <Form.Item name={['paymentDetails', 'expediteOption']} hidden><Input /></Form.Item>
            <Form.Item name={['paymentDetails', 'refusalGuarantee']} hidden><Input /></Form.Item>

            <Row gutter={[32, 24]}>
                <Col xs={24} lg={16}>
                    <Title level={4}>{t('payment_form_service_options_title')}</Title>
                    <Card bordered={false} style={{backgroundColor: '#f9f9f9', opacity: selectedExpedite === 'prod-test' ? 0.3 : 1}}> {/* Atenúa si es test */}
                        <Text strong>{t('payment_form_esta_service_title')}</Text>
                        <Text style={{ float: 'right' }}>{BASE_SERVICE_COST.toFixed(2)} USD</Text>
                        <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
                            {t('payment_form_esta_service_description')}
                        </Paragraph>
                    </Card>

                    <Title level={4} style={{ marginTop: 24 }}>{t('payment_form_expedite_options_title')}</Title>
                    <Radio.Group onChange={(e) => setSelectedExpedite(e.target.value)} value={selectedExpedite} style={{ width: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            {EXPEDITE_OPTIONS.map(opt => (
                                <Card key={opt.value} className={selectedExpedite === opt.value ? 'selected-card' : ''}>
                                    <Radio value={opt.value}>
                                        <Text strong>{opt.label}</Text>
                                        <Text style={{ float: 'right' }}>{opt.cost.toFixed(2)} USD</Text>
                                        <Paragraph type="secondary" style={{ marginLeft: 24, marginBottom: 0 }}>{opt.description}</Paragraph>
                                    </Radio>
                                </Card>
                            ))}
                        </Space>
                    </Radio.Group>

                    {/* ✨ 4. Oculta la opción de garantía si es el modo test */}
                    {selectedExpedite !== 'prod-test' && (
                        <>
                            <Title level={4} style={{ marginTop: 24 }}>{t('payment_form_upgrade_service_title')}</Title>
                            <Checkbox checked={refusalGuarantee} onChange={(e) => setRefusalGuarantee(e.target.checked)}>
                                <Text strong>{t('payment_form_refusal_guarantee_label')}</Text>
                                <Paragraph type="secondary">{t('payment_form_refusal_guarantee_desc')}</Paragraph>
                            </Checkbox>
                        </>
                    )}
                    
                    <Title level={4} style={{ marginTop: 24 }}>{t('payment_form_billing_info_title')}</Title>
                    <Row gutter={16}>
                        <Col xs={24} sm={12}><Form.Item name="fullName" label={t('payment_form_full_name_label')} rules={[{ required: true, message: t('validation_required') }]}><Input placeholder={t('payment_form_full_name_placeholder')} /></Form.Item></Col>
                        <Col xs={24} sm={12}><Form.Item name="billingEmail" label={t('payment_form_billing_email_label')} initialValue={form.getFieldValue('email')} rules={[{ required: true, type: 'email', message: t('validation_email_invalid') }]}><Input placeholder={t('payment_form_billing_email_placeholder')} /></Form.Item></Col>
                    </Row>
                    <Form.Item name="billingAddress" label={t('payment_form_billing_address_label')} rules={[{ required: true, message: t('validation_required') }]}><CountrySelect placeholder={t('applicant_form_country_birth_placeholder')} /></Form.Item>
                    
                    <div style={{ padding: '20px 10px', border: '1px solid #f0f0f0', borderRadius: '8px', marginTop: 16 }}>
                        <CardElement options={cardElementOptions} />
                    </div>
                </Col>

                <Col xs={24} lg={8}>
                    <Card>
                        <Title level={4}>{t('payment_form_order_summary_title')}</Title>
                        {/* ✨ 5. Muestra el resumen correcto según la opción */}
                        {selectedExpedite !== 'prod-test' ? (
                            <>
                                <Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}><Text>{t('payment_form_esta_service_title')}</Text> <Text>{BASE_SERVICE_COST.toFixed(2)} USD</Text></Paragraph>
                                {refusalGuarantee && (<Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}><Text>{t('payment_form_refusal_guarantee_label')}</Text> <Text>{REFUSAL_GUARANTEE_COST.toFixed(2)} USD</Text></Paragraph>)}
                                {expediteCost > 0 && (<Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}><Text>{EXPEDITE_OPTIONS.find(opt => opt.value === selectedExpedite)?.label}</Text> <Text>{expediteCost.toFixed(2)} USD</Text></Paragraph>)}
                                <Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}><Text>{t('payment_form_government_fee')}</Text> <Text>{GOVERNMENT_FEE.toFixed(2)} USD</Text></Paragraph>
                            </>
                        ) : (
                            <Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}><Text>Production Test Fee</Text> <Text>{expediteCost.toFixed(2)} USD</Text></Paragraph>
                        )}
                        <Divider />
                        <Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}><Text strong>{t('payment_form_order_total')}</Text> <Text strong>{total.toFixed(2)} USD</Text></Paragraph>
                        <Form.Item name="termsAgree" valuePropName="checked" rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error(t('validation_must_agree'))) }]}>
                            <Checkbox>{t('payment_form_agree_terms_checkbox', { 0: <Link href="/terms-of-service">{t('footer_terms_service')}</Link> })}</Checkbox>
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PaymentForm;