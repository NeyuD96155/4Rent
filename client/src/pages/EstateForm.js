import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    InputNumber,
    Upload,
    Select,
    TimePicker,
} from "antd";
import api from "../config/axios";
import { toast } from "react-toastify";
import "../styles/Post.css";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../utils/upload";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const EstateForm = () => {
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [price, setPrice] = useState("");
    const timeFormat = "HH:mm";
    // fetch category
    const fetchCategories = async () => {
        const response = await api.get("/showCate");
        setCategories(
            response.data.map((item) => {
                return {
                    label: item.categoryname,
                    value: item.id,
                };
            })
        );
    };
    // fetch location
    const fetchLocations = async () => {
        const response = await api.get("/showLocation");
        setLocations(
            response.data.map((item) => {
                return {
                    label: item.location,
                    value: item.id,
                };
            })
        );
    };

    useEffect(() => {
        fetchCategories();
        fetchLocations();
    }, []);

    const formatCurrency = (value) => {
        if (!value) return "";
        const formatter = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
        });
        return formatter.format(value).replace(/\u200B/g, "");
    };
    const parseCurrency = (value) => {
        return value.replace(/\D/g, "");
    };
    const handleSubmit = async (values) => {
        // if (fileList.length < 5) {
        //     toast.info("Vui lòng tải lên ít nhất 5 ảnh.");
        //     return;
        // }
        const checkInTime = values.checkIn
            ? dayjs(values.checkIn).format("HH:mm:ss")
            : null;
        const checkOutTime = values.checkOut
            ? dayjs(values.checkOut).format("HH:mm:ss")
            : null;
        const images = values.resources.fileList;
        console.log(values);
        const resources = await Promise.all(
            images.map(async (item) => {
                const url = await uploadFile(item.originFileObj, uuidv4());
                return {
                    resourceType: "IMAGE",
                    url: url,
                };
            })
        );
        const formattedValues = {
            ...values,
            checkIn: checkInTime,
            checkOut: checkOutTime,
            price: parseInt(values.price, 10), // Ensure price is an integer
            resources, // Assuming resources is defined elsewhere in your code
        };

        console.log(formattedValues);

        try {
            await api.post("/estate", formattedValues);
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

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);

        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
        );
    };
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

    const amounts = [
        { value: 1, label: "1 người" },
        { value: 2, label: "2 người" },
        { value: 3, label: "3 người" },
        { value: 4, label: "4 người" },
        { value: 5, label: "5 người" },
        { value: 6, label: "6 người" },
        { value: 7, label: "7 người" },
        { value: 8, label: "8 người" },
        { value: 9, label: "9 người" },
        { value: 10, label: "10 người" },
    ];
    return (
        <div className="post-form-wrapper">
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                autoComplete="off"
                className="post-form-container"
            >
               
                <Form.Item
                    name="title"
                    label="Tiêu đề"
                    rules={[
                        { required: true, message: "Vui lòng nhập tiêu đề!" },
                    ]}
                    className="post-form-item"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[
                        { required: true, message: "Vui lòng nhập mô tả!" },
                    ]}
                    className="post-form-item"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Giá"
                    rules={[
                        { required: true, message: "Vui lòng nhập giá!" },
                        {
                            validator: (_, value) =>
                                value && value >= 300000
                                    ? Promise.resolve()
                                    : Promise.reject(
                                          new Error(
                                              "Giá trị nhập vào phải tối thiểu là 300.000 VND!"
                                          )
                                      ),
                        },
                    ]}
                    className="post-form-item"
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        value={price}
                        onChange={setPrice}
                        formatter={formatCurrency}
                        parser={parseCurrency}
                    />
                </Form.Item>
                <Form.Item
                    name="categoryId"
                    label="Thể loại"
                    rules={[
                        { required: true, message: "Vui lòng chọn thể loại!" },
                    ]}
                    className="post-form-item"
                >
                    <Select options={categories} />
                </Form.Item>
                <Form.Item
                    name="locationId"
                    label="Vị trí"
                    rules={[
                        { required: true, message: "Vui lòng chọn vị trí!" },
                    ]}
                    className="post-form-item"
                >
                    <Select options={locations} />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="Số lượng người"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn số lượng người!",
                        },
                    ]}
                    className="post-form-item"
                >
                    <Select options={amounts} />
                </Form.Item>
                <Form.Item
                    name="checkIn"
                    label="Thời gian nhận phòng"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn thời gian nhận phòng!",
                        },
                    ]}
                    className="post-form-item"
                >
                    <TimePicker format={timeFormat} />
                </Form.Item>

                <Form.Item
                    name="checkOut"
                    label="Thời gian trả phòng"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn thời gian trả phòng!",
                        },
                    ]}
                    className="post-form-item"
                >
                    <TimePicker format={timeFormat} />
                </Form.Item>

                <Form.Item
                    name="resources"
                    label="Hình ảnh"
                    className="post-form-item"
                >
                    <Upload
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item className="post-form-item">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="post-submit-button"
                    >
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EstateForm;
