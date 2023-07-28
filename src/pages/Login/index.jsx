import React from "react";
import {Button,Checkbox,Form,Input, message} from 'antd'
import styles from './index.module.scss';
import {setToken} from '../../utils/Token'
import {login} from '../../api/User'
import {useNavigate} from 'react-router-dom'


const Login = () => {
        const navigate = useNavigate();
        const onFinish = async({username,password}) => {
        const res = await login(username,password);
        console.log(res.success);
        if (res.success === true) {
            //登录成功
            setToken(res.token);//保存token
            //跳转到管理页面
            navigate('/home');
            message.success('登录成功！');//提示登录成功
        }
        else {
            message.error('用户名或密码不正确！');//提示登录失败
        }
    }

        return (
        <div className={styles.denglu}>
            <div className={styles.login}>
                <div className={styles.form}>
                    <h2>后台管理系统登录</h2>
                    <Form
                        name="basic"
                        labelCol={{
                        span: 8,
                        }}
                        wrapperCol={{
                        span: 16,
                        }}
                        style={{
                        maxWidth: 600,
                        }}
                        initialValues={{
                        remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {
                            required: true,
                            message: '请输入你的用户名!',
                            },
                        ]}
                        >
                        <Input />
                        </Form.Item>

                        <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: '请输入你的密码!',
                            },
                        ]}
                        >
                        <Input.Password />
                        </Form.Item>

                        <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 15,
                            span: 9,
                        }}
                        >
                        <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 14,
                        }}
                        >
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            </div>
        )
    }

export default Login;