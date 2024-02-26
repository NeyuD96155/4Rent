import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
import api from "../config/axios";
import { toast } from "react-toastify";

const PaymentForm = ({ bookingId }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        const paymentData = {
            ...values,
            bookingId,
        };

        try {
            await api.post("/Payment", paymentData);
            toast.success("Payment successfully processed!");
            form.resetFields();
        } catch (error) {
            toast.error(
                `Payment failed: ${
                    error.response?.data?.message || error.message
                }`
            );
        }
    };

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            autoComplete="off"
        >
            <Form.Item
                name="estateName"
                label="Estate Name"
                rules={[
                    {
                        required: true,
                        message: "Please enter the estate name!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please enter the price!" }]}
            >
                <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Process Payment
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PaymentForm;
