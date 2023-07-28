import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message, Modal, Form, Input } from 'antd';
import axios from 'axios';

const ContentManagement = () => {
  const [data, setData] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '内容',
      dataIndex: 'content',
      render:(text) => (
        <span title={text}>{text.length > 8 ? text.slice(0,8) + '...' : text}</span>
      )
    },
    {
      title: '时间',
      dataIndex: 'times',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => (
        <>
          <Button onClick={() => editArticle(record)}>修改</Button>
          <Popconfirm title="确定要删除吗？" onConfirm={() => deleteArticle(record.id)}>
            <Button>删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

const editArticle = (article) => {
    setEditingArticle(article);
    setIsModalVisible(true);
  };

const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/shan/${id}`);
      setData(data.filter((article) => article.id !== id));
      message.success('删除成功！');
    }
    catch (error) {
      message.error('删除失败！');
    }
  };


// 修改文章
const onFinish = async (values) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/xiu/${editingArticle.id}`, values);
      setData(
        data.map((article) =>
          article.id === editingArticle.id ? { ...article, ...values } : article
        )
      );
      setEditingArticle(null);
      setIsModalVisible(false);
      message.success('修改成功！');
    } catch (error) {
      message.error('修改失败！');
    }
  };


// 获取文章内容
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/get_article');
        setData(response.data);
      } catch (error) {
        message.error('获取文章数据失败！');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Table dataSource={data} columns={columns} rowKey="id" />
      <Modal
        title="修改文章"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {editingArticle && (
          <Form onFinish={onFinish} initialValues={editingArticle}>
            <Form.Item label="ID" name="id">
              <Input disabled />
            </Form.Item>
            <Form.Item label="标题" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="作者" name="author">
              <Input />
            </Form.Item>
            <Form.Item label="内容" name="content">
              <Input />
            </Form.Item>
            <Form.Item label="时间" name="times">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default ContentManagement;
