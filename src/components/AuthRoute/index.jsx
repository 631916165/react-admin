import React from "react";
import {Navigate} from 'react-router-dom'
import { message } from "antd";




//路由守卫
function AuthRoute({children}) {
    //验证token是否存在
    const isAuthenticated = localStorage.getItem('token-geek-pc-fzh1') !== null;
    console.log(isAuthenticated);
    if (isAuthenticated === true) {
        return children
    }
    else {
        message.error('您还没有登录，无权访问此页面，请登录后再试')
        return <Navigate to="/login" replace />
        
    }
}


export default AuthRoute;