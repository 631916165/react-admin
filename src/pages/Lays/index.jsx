import React from "react";
import styles from './index.module.scss';
import {Layout,Menu,Popconfirm,message} from 'antd'
import {HomeOutlined,DiffOutlined,EditOutlined, LogoutOutlined} from '@ant-design/icons'
import {Routes,Route,Link,useNavigate} from 'react-router-dom'
import List  from '../../components/List'
import Publish from '../../components/Publish'
import Home from '../../components/Home'
import { removeToken } from "../../utils/Token";




const {Header,Content,Sider} = Layout;

const Lays = () => {
        const navigate = useNavigate();
        const onConfirm = () => {
            // 移除token
            removeToken();
            // 跳转到登录页
            navigate('/login');
            // console.log('成功退出了');
            message.success('退出成功！')
        }
        return (
            <div className={styles.layout}>
                <Layout>
                    <Header className="header">
                        <div className="layout-title">
                            <h2>后台管理系统</h2>
                        </div>
                        <div className="profile">
                            <span>admin</span>
                            <span>
                                <Popconfirm
                                    title="你确定要退出后台管理系统吗？"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={onConfirm}
                                >
                                     <LogoutOutlined />{' '}退出
                                </Popconfirm>
                            </span>
                        </div>
                    </Header>
                    <Layout>
                        <Sider width={200}>
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                style={{height:'100%',borderRight:0}}
                            >
                                <Menu.Item key="1" icon={<HomeOutlined />}>
                                    <Link to="/home">数据概览</Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<DiffOutlined />}>
                                    <Link to="/home/content">内容管理</Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<EditOutlined />}>
                                    <Link to="/home/publish">文章发布</Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout style={{padding:'24px'}}>
                            <Content className="site-layout-background">
                                <Routes>
                                    <Route exact path="/" element={<Home />}></Route>
                                    <Route path="/content" element={<List />}></Route>
                                    <Route path="/publish" element={<Publish />}></Route>
                                </Routes>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }

export default Lays;

