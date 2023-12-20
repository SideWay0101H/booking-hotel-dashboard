import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MdDashboard, MdHotel,MdBorderColor } from "react-icons/md";
import { IoMdClipboard } from "react-icons/io";
import { Layout, Menu,  theme } from 'antd';
import { Link,Outlet } from 'react-router-dom';
import {IoIosNotifications } from 'react-icons/io'
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onHandleLogout= () =>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
}
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
            <h2 className='text-white text-center fs-5 py-3 mb-0' >
            <span className='sm-logo'>HM</span>
            <span className="lg-logo">Hotel Manager</span>
           </h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <MdDashboard />,
              label: 'Dashboard',
            },
            {
              key: 'room',
              icon: <MdHotel />,
              label: 'Room',
              children: [
                {
                    key: 'add-room',
                    icon: <MdHotel />,
                    label: 'Add Room',
                },
                {
                    key: 'list-room',
                    icon: <MdHotel />,
                    label: 'List Room',
                },
              ]
            },
            {
              key: 'user',
              icon: <UserOutlined />,
              label: 'User',
              children: [
                {
                  key: 'add-user',
                  icon: <UserOutlined />,
                  label: 'Add User',
                },
                {
                  
                  key: 'list-user',
                  icon: <UserOutlined />,
                  label: 'List User',
                }
              ]
            },
            {
              key: 'Booking',
              icon: <IoMdClipboard />,
              label: 'Booking',
              children: [
                {
                key: 'add-booking',
                icon: <IoMdClipboard />,
                label: 'to Book',
                },
                {
                key: 'list-booking',
                icon: <IoMdClipboard />,
                label: 'List Booking',
                }
              ]
            },
          ]}
        />
      </Sider>
      <Layout>
      <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement (
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed (!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div 
              className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img 
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt="" />
              </div>
              <div 
                role="button" 
                id="dropdownMenuLink" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <h5 className="mb-0">SW</h5>
                <p className="mb-0">zzzzzin841@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link 
                    className="dropdown-item py-1 mb-1" 
                    style={{height: "auto", lineHeight: "20px"}} 
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    className="dropdown-item py-1 mb-1" 
                    style={{height: "auto", lineHeight: "20px"}} 
                    to="/login"
                    onChange={onHandleLogout}
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
        <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;