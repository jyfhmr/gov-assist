import React from 'react';
import { Form, Checkbox, Typography, Select, Input, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const ReviewForm: React.FC = () => {
    const { t } = useTranslation();

    const securityQuestions = [
        t('review_form_security_q1'),
        t('review_form_security_q2'),
        t('review_form_security_q3'),
        t('review_form_security_q4'),
        t('review_form_security_q5'),
    ];

    const termsLinks = (
      <Text strong>
        {t('footer_terms_use')} | {t('footer_terms_service')} | {t('footer_privacy_policy')} | {t('footer_legal_disclaimer')} | {t('footer_refund')}
      </Text>
    );

    return (
        <>
            <Title level={4}>{t('review_form_declaration_title')}</Title>
            <Paragraph>{t('review_form_declaration_p1')}</Paragraph>
            <Paragraph>{t('review_form_declaration_p2')}</Paragraph>
            <Paragraph>{t('review_form_declaration_p3')}</Paragraph>
            <Paragraph>{t('review_form_declaration_p4')}</Paragraph>
            <Form.Item
                name="declarationAgree"
                valuePropName="checked"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error(t('validation_must_agree'))) }]}
            >
                <Checkbox>{t('review_form_agree_checkbox')}</Checkbox>
            </Form.Item>

            <hr style={{ margin: '30px 0' }} />

            <Title level={4}>{t('review_form_third_party_title')}</Title>
            <Paragraph>{t('review_form_third_party_p1')}</Paragraph>
            <Paragraph>{t('review_form_third_party_p2')}</Paragraph>
            <Paragraph>{t('review_form_third_party_p3', { 0: termsLinks })}</Paragraph>
            <Form.Item
                name="thirdPartyAgree"
                valuePropName="checked"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error(t('validation_must_agree'))) }]}
            >
                <Checkbox>{t('review_form_agree_checkbox')}</Checkbox>
            </Form.Item>

            <hr style={{ margin: '30px 0' }} />

            <Title level={4}>{t('review_form_protection_title')}</Title>
            <Paragraph>{t('review_form_protection_description')}</Paragraph>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Form.Item name="securityQuestion" label={t('review_form_security_question_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Select placeholder={t('review_form_security_question_placeholder')}>
                            {securityQuestions.map(q => <Option key={q} value={q}>{q}</Option>)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                    <Form.Item name="securityAnswer" label={t('review_form_answer_label')} rules={[{ required: true, message: t('validation_required') }]}>
                        <Input placeholder={t('review_form_answer_placeholder')} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default ReviewForm;