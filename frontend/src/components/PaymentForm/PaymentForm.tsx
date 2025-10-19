import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Radio, Checkbox, Form, Input, Card, Divider, Space } from 'antd';
import { CardElement } from '@stripe/react-stripe-js';
import CountrySelect from '../CountrySelect/CountrySelect';
import { BASE_SERVICE_COST, GOVERNMENT_FEE, REFUSAL_GUARANTEE_COST } from '../../constants';

const { Title, Paragraph, Text } = Typography;

const EXPEDITE_OPTIONS = [
    { label: '72-Hours or Less Turnaround', value: '72-hours', cost: 0.00, description: 'GovAssist 72 Hours Priority Lane' },
    { label: '24-Hours or Less Turnaround', value: '24-hours', cost: 28.00, description: 'Need it faster? Choose Rapid Pass for swift 24-hour application processing.' },
    { label: '3-Hours or Less Turnaround', value: '3-hours', cost: 85.00, description: 'Planning an immediate journey? Move up our application queue for a 3-hour processing fee.' },
];

const cardElementOptions = { style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } } };

interface PaymentFormProps { onTotalAmountChange: (amount: number) => void; }

const PaymentForm: React.FC<PaymentFormProps> = ({ onTotalAmountChange }) => {
    const form = Form.useFormInstance();

    const [selectedExpedite, setSelectedExpedite] = useState(EXPEDITE_OPTIONS[0].value);
    const [refusalGuarantee, setRefusalGuarantee] = useState(true);
    const [total, setTotal] = useState(0);
    const [expediteCost, setExpediteCost] = useState(0);

    useEffect(() => {
        const currentExpediteOption = EXPEDITE_OPTIONS.find(opt => opt.value === selectedExpedite);
        const currentExpediteCost = currentExpediteOption ? currentExpediteOption.cost : 0;
        
        let calculatedTotal = BASE_SERVICE_COST + GOVERNMENT_FEE + currentExpediteCost;
        if (refusalGuarantee) {
            calculatedTotal += REFUSAL_GUARANTEE_COST;
        }
        
        setTotal(calculatedTotal);
        setExpediteCost(currentExpediteCost);
        onTotalAmountChange(calculatedTotal);

        // ✨ --- LÓGICA CLAVE: Guardamos los detalles en el estado del formulario ---
        form.setFieldsValue({
            paymentDetails: {
                total: calculatedTotal.toFixed(2),
                expediteOption: selectedExpedite,
                refusalGuarantee: refusalGuarantee,
            }
        });

    }, [selectedExpedite, refusalGuarantee, onTotalAmountChange, form]);

    return (
        <>
            {/* --- CAMPOS OCULTOS PARA GUARDAR DATOS DE PAGO --- */}
            <Form.Item name={['paymentDetails', 'total']} hidden><Input /></Form.Item>
            <Form.Item name={['paymentDetails', 'expediteOption']} hidden><Input /></Form.Item>
            <Form.Item name={['paymentDetails', 'refusalGuarantee']} hidden><Input /></Form.Item>

            <Row gutter={[32, 24]}>
                {/* --- COLUMNA IZQUIERDA: OPCIONES Y FACTURACIÓN --- */}
                <Col xs={24} lg={16}>
                    <Title level={4}>Service Options</Title>
                    <Card bordered={false} style={{backgroundColor: '#f9f9f9'}}>
                        <Text strong>U.S. ESTA Processing Service</Text>
                        <Text style={{ float: 'right' }}>{BASE_SERVICE_COST.toFixed(2)} USD</Text>
                        <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
                            Includes a detailed review and submission of your application...
                        </Paragraph>
                    </Card>

                    <Title level={4} style={{ marginTop: 24 }}>Select Expedite Options</Title>
                    <Radio.Group onChange={(e) => setSelectedExpedite(e.target.value)} value={selectedExpedite} style={{ width: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            {EXPEDITE_OPTIONS.map(opt => (
                                <Card key={opt.value} className={selectedExpedite === opt.value ? 'selected-card' : ''}>
                                    <Radio value={opt.value}>
                                        <Text strong>{opt.label}</Text>
                                        <Text style={{ float: 'right' }}>{opt.cost > 0 ? `${opt.cost.toFixed(2)} USD` : '0 USD'}</Text>
                                        <Paragraph type="secondary" style={{ marginLeft: 24, marginBottom: 0 }}>{opt.description}</Paragraph>
                                    </Radio>
                                </Card>
                            ))}
                        </Space>
                    </Radio.Group>

                    <Title level={4} style={{ marginTop: 24 }}>Upgrade Your Service</Title>
                    <Checkbox checked={refusalGuarantee} onChange={(e) => setRefusalGuarantee(e.target.checked)}>
                        <Text strong>Refusal Protect Guarantee</Text>
                        <Paragraph type="secondary">Apply with confidence!...</Paragraph>
                    </Checkbox>
                    
                    <Title level={4} style={{ marginTop: 24 }}>Billing Information</Title>
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}><Input placeholder="Full Name" /></Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name="billingEmail" label="Email" initialValue={form.getFieldValue('email')} rules={[{ required: true, type: 'email' }]}><Input placeholder="Email" /></Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="billingAddress" label="Billing Address" rules={[{ required: true }]}><CountrySelect /></Form.Item>
                    
                    <div style={{ padding: '20px 10px', border: '1px solid #f0f0f0', borderRadius: '8px', marginTop: 16 }}>
                        <CardElement options={cardElementOptions} />
                    </div>
                </Col>

                {/* --- COLUMNA DERECHA: RESUMEN DEL PEDIDO --- */}
                <Col xs={24} lg={8}>
                    <Card>
                        <Title level={4}>Order Summary</Title>
                        <Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}><Text>U.S. ESTA Processing Service</Text> <Text>{BASE_SERVICE_COST.toFixed(2)} USD</Text></Paragraph>
                        {refusalGuarantee && (<Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}><Text>Refusal Protect Guarantee</Text> <Text>{REFUSAL_GUARANTEE_COST.toFixed(2)} USD</Text></Paragraph>)}
                        {expediteCost > 0 && (<Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}><Text>{EXPEDITE_OPTIONS.find(opt => opt.value === selectedExpedite)?.label}</Text> <Text>{expediteCost.toFixed(2)} USD</Text></Paragraph>)}
                        <Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}><Text>Government fee</Text> <Text>{GOVERNMENT_FEE.toFixed(2)} USD</Text></Paragraph>
                        <Divider />
                        <Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}><Text strong>Order Total:</Text> <Text strong>{total.toFixed(2)} USD</Text></Paragraph>
                        <Form.Item name="termsAgree" valuePropName="checked" rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms')) }]}><Checkbox>I agree to the <a href="#">Terms of Service</a></Checkbox></Form.Item>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PaymentForm;