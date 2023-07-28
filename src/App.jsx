/*
 * @Author: '631916165' '631916165@qq.com'
 * @Date: 2023-07-23 09:36:18
 * @LastEditors: '631916165' '631916165@qq.com'
 * @LastEditTime: 2023-07-25 17:43:47
 * @FilePath: \aa\src\App.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Lays from "./pages/Lays";
import AuthRoute from './components/AuthRoute'

//登录页面
function Panlogin() {
  return <Login />
}

//受保护的页面
function Panlays() {
  return <Lays />
}



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Panlogin />} />   
        <Route path="/home/*" element={<AuthRoute><Panlays /></AuthRoute>} />
      </Routes>
    </Router>
  )
}

export default App;