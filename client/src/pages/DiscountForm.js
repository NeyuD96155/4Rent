import React, { useState } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import api from "../config/axios";
import { toast } from "react-toastify";
import "../styles/Discount.css";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../utils/upload";
import { v4 as uuidv4 } from "uuid";
const DiscountForm = () => {
    const [form] = Form.useForm();
    const [price, setPrice] = useState();
    const formatCurrency = (value) => {
        if (!value) return "";
        const formatter = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        });
        return formatter.format(value).replace(/\u200B/g, "");
    };

    const [fileList, setFileList] = useState([]);
    const parseCurrency = (value) => {
        return value.replace(/\D/g, "");
    };
    const handleSubmit = async (values) => {
        if (fileList.length < 5) {
            toast.info("Vui lòng tải lên ít nhất 5 ảnh.");
            return;
        }
        const images = values.resource.fileList;
        console.log(values);
        console.log();
        const resources = await Promise.all(
            images.map(async (item) => {
                const url = await uploadFile(item.originFileObj, uuidv4());
                return {
                    resourceType: "IMAGE",
                    url: url,
                };
            })
        );
        console.log(resources);
        const formattedValues = {
            ...values,
            // discountDate: values.discountDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            price: parseInt(values.price, 10),
            resources,
        };

        try {
            await api.discount("/discount", formattedValues);
            toast.success("Căn hộ đã được đăng ký thành công!");
            form.resetFields();
        } catch (error) {
            toast.error(
                `Đăng ký thất bại: ${error.response?.data || error.message}`
            );
        }
    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleChange = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    /*const fetchCategories = async () => {
        const response = await api.get('/category/show');
        setCategory(response.data);
    }*/
    return (
        <div className="discount-form-wrapper">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                autoComplete="off"
                className="discount-form-container"
            >
                <Form.Item
                    name="title"
                    label="Tiêu đề"
                    rules={[
                        { required: true, message: "Vui lòng nhập tiêu đề!" },
                    ]}
                    className="discount-form-item"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Nội dung"
                    rules={[
                        { required: true, message: "Vui lòng nhập nội dung!" },
                    ]}
                    className="discount-form-item"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="discount"
                    label="Ưu đãi (%)"
                    rules={[
                        { required: true, message: "Vui lòng nhập ưu đãi!" },
                    ]}
                    className="discount-form-item"
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        value={price}
                        onChange={setPrice}
                        formatter={formatCurrency}
                        parser={parseCurrency}
                    />
                </Form.Item>

                <Form.Item className="discount-form-item">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="discount-submit-button"
                    >
                        Đăng bài
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default DiscountForm;
