/*
 * @Author: '631916165' '631916165@qq.com'
 * @Date: 2023-07-25 19:06:58
 * @LastEditors: '631916165' '631916165@qq.com'
 * @LastEditTime: 2023-07-25 20:17:37
 * @FilePath: \aa\src\components\Dashboard\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styles from './index.module.scss'

const data = [
    { name: '一月', 毛衣: 4000, 半袖: 2400, amt: 2400 },
    { name: '二月', 毛衣: 3000, 半袖: 1398, amt: 2210 },
    { name: '三月', 毛衣: 2000, 半袖: 9800, amt: 2290 },
    { name: '四月', 毛衣: 2780, 半袖: 3908, amt: 2000 },
    { name: '五月', 毛衣: 1890, 半袖: 4800, amt: 2181 },
    { name: '六月', 毛衣: 2390, 半袖: 3800, amt: 2500 },
    { name: '七月', 毛衣: 3490, 半袖: 4300, amt: 2100 },
  ];

  
const Dashboard = () => {
    return (
        <div className={styles.diyi}>
            <h2>服饰销量柱状图</h2>
            <div className={styles.tu}>
                <BarChart width={600} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="半袖" fill="#8884d8" />
                    <Bar dataKey="毛衣" fill="#82ca9d" />
                </BarChart>
            </div>
        </div>
      
    );
};
  
export default Dashboard;
  