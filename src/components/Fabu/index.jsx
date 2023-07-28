/*
 * @Author: '631916165' '631916165@qq.com'
 * @Date: 2023-07-26 11:04:49
 * @LastEditors: '631916165' '631916165@qq.com'
 * @LastEditTime: 2023-07-27 14:49:06
 * @FilePath: \aa\src\components\Fabu\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, message } from 'antd';
import React,{useState} from 'react';
import styles from './index.module.scss';
import axios from 'axios';



const Fabu = () => {
  const { TextArea } = Input;
  const [fileList, setFileList] = useState([]);
  
  // 图片上传
  const props = {
    onRemove: (file) => {
      setFileList((prevFileList) => {
        const index = prevFileList.indexOf(file);
        const newFileList = prevFileList.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (file) => {
      setFileList((prevFileList) => [...prevFileList, file]);
      return false;
    },
    fileList: fileList.map((file, index) => ({
      uid: index,
      name: file.name,
      status: 'done',
      url: URL.createObjectURL(file), // 添加图片预览链接
      ...file,
    })),
  };

  const uploadImages = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer token', // 如果需要认证的话，记得加上合适的认证头
        },
      });

      console.log('图片上传成功:', response.data);
      message.success('图片上传成功');
    } catch (error) {
      console.error('图片上传失败:', error);
      message.error('图片上传失败');
    }
  };


// 文章表单数据提交
const onFinishs = async (values) => {
  // 在这里可以获取表单数据
  console.log('表单数据:', values);

  // 发送表单数据给后端的api/article接口
  try {
    const response = await fetch('http://127.0.0.1:5000/api/save_article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token', // 如果需要认证的话，记得加上合适的认证头
      },
      body: JSON.stringify(values), // 将表单数据转换成JSON格式并发送给后端
    });

    const data = await response.json();
    console.log('后端返回数据:', data);

    if (response.ok) {
      message.success('文章发布成功');
    } else {
      message.error('文章发布失败');
    }
  } catch (error) {
    console.error('发送请求时出现错误:', error);
    message.error('请求失败，请稍后重试');
  }
};


  return (
    <div>
      <Form className={styles.fabu_form} onFinish={onFinishs}>
        <Form.Item label="文章标题" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="作者" name="author">
          <Input />
        </Form.Item>
        <Form.Item label="内容" name="content">
          <TextArea rows={4} />
        </Form.Item>
        <label>上传图片:</label>
        <Upload listType="picture-card" {...props} onChange={uploadImages}>
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8}}>上传</div>
          </div>
        </Upload>
        <Form.Item>
          <Button className={styles.btn} type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Fabu;
