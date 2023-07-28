
import React, { useState } from 'react';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, message } from 'antd';


const Test = () => {
  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    setFileList(info.fileList);

    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };

  const uploadURL = 'http://127.0.0.1:5000/api/upload'; // 请替换为你的上传图片的后端API地址

  const customRequest = async (options) => {
    const { onSuccess, onError, file } = options;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(uploadURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer token', // 如果需要认证的话，请设置合适的认证头
        },
      });

      // 将后端返回的图片URL设置为文件对象的URL，以便在上传成功后展示图片
      file.url = response.data.url;
      onSuccess(response.data, file);
    } catch (error) {
      console.error('上传图片时发生错误:', error);
      onError(error);
    }
  };

  const props = {
    customRequest,
    onChange: handleChange,
    fileList,
    name: 'file',
    listType: 'picture-card',
    showUploadList: true,
    headers: {
      authorization: 'Bearer token', // 如果需要认证的话，请设置合适的认证头
    },
  };

  return (
    <div>
      <Form>
        <Form.Item label="文章标题" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="作者" name="author">
          <Input />
        </Form.Item>
        <Form.Item label="内容" name="content">
          
        </Form.Item>
          <Upload listType="picture-card" {...props}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>上传</div>
            </div>
          </Upload>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Test;
