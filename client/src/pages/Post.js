import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Upload } from 'antd';
import api from '../config/axios'; // Ensure axios is correctly configured
import { toast } from "react-toastify";
import { PlusOutlined } from '@ant-design/icons';
import uploadFile from '../utils/upload';
import { v4 as uuidv4 } from 'uuid';
const Post = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const images = values.resource.fileList;
    console.log(values);
    console.log();
    const resources = await Promise.all(images.map(async(item)=>{
      const url = await uploadFile(item.originFileObj, uuidv4())
      return {
        resourceType: "IMAGE",
        url: url
      }
    }))
    console.log(resources);
    const formattedValues = {
      ...values,
      postDate: values.postDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
      price: parseInt(values.price, 10), // Ensure the value is an integer
      resources
    };

    try {
      await api.post('/post', formattedValues); // Remove 'response' since it's not being used
      toast.success("Căn hộ đã được đăng ký thành công!");
      form.resetFields();
    } catch (error) {
      toast.error(`Đăng ký thất bại: ${error.response?.data || error.message}`);
    }
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
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
  return (
    <div className="post-form-wrapper">
      <Form form={form} layout="vertical" onFinish={handleSubmit} autoComplete="off" className="post-form-container">
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]} className="post-form-item">
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]} className="post-form-item">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]} className="post-form-item">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="postDate" label="Ngày đăng" rules={[{ required: true, message: 'Vui lòng chọn ngày đăng!' }]} className="post-form-item">
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="resource" label="Hình ảnh" className="post-form-item">
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
          <Button type="primary" htmlType="submit" className="post-submit-button">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Post;