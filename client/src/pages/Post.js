import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import api from '../config/axios';
import { toast } from "react-toastify";
import uploadFile from '../utils/upload';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Post = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleSubmit = async (values) => {
    // Filter out fileList to ensure it only contains file info
    const images = fileList.map(file => file.originFileObj ? file.originFileObj : file);
    
    try {
      const resources = await Promise.all(images.map(async (file) => {
        const url = await uploadFile(file, uuidv4());
        return { resourceType: "IMAGE", url };
      }));

      const formattedValues = {
        ...values,
        postDate: values.postDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        price: values.price, // No need to parseInt, InputNumber handles that
        resources,
      };

      await api.post('/posts', formattedValues);
      toast.success("Căn hộ đã được đăng ký thành công!");
      form.resetFields();
      setFileList([]);
    } catch (error) {
      toast.error(`Đăng ký thất bại: ${error.response?.data.message || error.message}`);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    Modal.info({
      title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
      content: <img alt="example" style={{ width: '100%' }} src={file.url || file.preview} />,
    });
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="post-form-wrapper">
      <Form form={form} layout="vertical" onFinish={handleSubmit} autoComplete="off">
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="postDate" label="Ngày đăng" rules={[{ required: true, message: 'Vui lòng chọn ngày đăng!' }]}>
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="resource" label="Hình ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false} // Prevent automatic upload
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form>
    </div>
  );
};

const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

// Helper function to normalize the event structure for fileList
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export default Post;
