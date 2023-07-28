/*
 * @Author: '631916165' '631916165@qq.com'
 * @Date: 2023-07-24 14:39:25
 * @LastEditors: '631916165' '631916165@qq.com'
 * @LastEditTime: 2023-07-25 18:19:20
 * @FilePath: \aa\src\utils\Token.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//封装token操作

//设置token
const TOKEN_KEY = 'token-geek-pc-fzh1';

//读取并保存token
export const setToken = (token) => localStorage.setItem(TOKEN_KEY,token)

//读取并获取token
export const getToken = (token) => localStorage.getItem(TOKEN_KEY,token)

//读取并删除token
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

//判断有无token
export const hasToken = () => !!getToken()