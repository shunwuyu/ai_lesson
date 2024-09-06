import { useState, useEffect } from 'react'
import {Row, Col, Card, Avatar} from "antd";
import { UserOutlined, TeamOutlined, MenuOutlined, AppstoreOutlined, EllipsisOutlined} from "@ant-design/icons";
import classes from "./Home.module.scss";
import {useNavigate} from "react-router-dom";
// 导入图表库
import { Bar, Pie } from '@ant-design/plots';
import homeApi from '@/api/home'

const Home = () => {
    const [barData,setBarData]=useState([])
    const navigate=useNavigate()

    const onNavigation=(url)=>{
        navigate(url)
    }

    useEffect(()=>{
        const getData=async ()=>{
          const {data:barData}=await homeApi.resource.entity()
          setBarData(barData)
        }
        getData()
    },[])

    const barConfig = {
        data:barData,
        height:300,
        xField: 'value',
        yField: 'entity',
        seriesField: 'entity',
        legend: {
          color: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
          position: 'top-left',
        },
    }

    return (
        <>
            <Row gutter={16} style={{marginBottom:20}}>
                <Col span={6}>
                    <Card
                        title='用户数'
                        actions={[
                        <EllipsisOutlined key="ellipsis" onClick={()=>onNavigation('/system/user')}/>,
                        ]}
                    >
                    <div className={classes['card-content']}>
                        <Avatar style={{ backgroundColor: '#6CDAD4' }} icon={<UserOutlined /> } />
                        <span>111</span>
                    </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        title="角色数"
                        actions={[
                        <EllipsisOutlined key="ellipsis" onClick={()=>onNavigation('/system/role')}/>,
                        ]}
                    >
                    <div className={classes['card-content']}>
                        <Avatar style={{ backgroundColor: '#FA6F5E' }} icon={<TeamOutlined /> } />
                        <span>122</span>
                    </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        title="菜单数"
                        actions={[
                        <EllipsisOutlined key="ellipsis" onClick={()=>onNavigation('/system/menu')} />,
                        ]}
                    >
                    <div className={classes['card-content']}>
                        <Avatar style={{ backgroundColor: '#FEDB4E' }} icon={<MenuOutlined /> } />
                        <span>121</span>
                    </div>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        title="按钮数"
                        actions={[
                        <EllipsisOutlined key="ellipsis" onClick={()=>onNavigation('/system/menu')} />,
                        ]}
                    >
                    <div className={classes['card-content']}>
                        <Avatar style={{ backgroundColor: '#B0E470' }} icon={<AppstoreOutlined /> } />
                        <span>123</span>
                    </div>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Card
                        title='系统数据条形图'
                    >
                        <Bar {...barConfig} />
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Home