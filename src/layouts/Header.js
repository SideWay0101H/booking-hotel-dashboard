import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import requestApi from "../helpers/api";
import { useDispatch } from "react-redux";
import * as actions from '../redux/actions'
import globalLoading from '../redux/reducers/globalLoading'
const Header = () => {
  const [profileData,setProfileData] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onHandleLogout= () =>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/login')
    }


    useEffect(() =>{
      dispatch(actions.controlLoading(true))
      requestApi('v1/users/profile','GET').then(res => {
          console.log('res =>',res)
          setProfileData({...res.data,avatar: process.env.REACT_APP_API_URL + '/' + res.data.avatar})
          dispatch(actions.controlLoading(false))
      }).catch(err =>{
          console.log('Error =>',err)
          dispatch(actions.controlLoading(false))
      })
  },[]) 


  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-custom-header">
      <Link to="/" className="navbar-brand ps-3" >Dashboard Hotel</Link>
      <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 btn-custom">
        <i className="fas fa-bars"></i>
      </button>
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button
            className="btn btn-primary"
            id="btnNavbarSearch"
            type="button"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4 ">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          //   style={{
          //   border: '2px solid #ccc', // Thay đổi màu sắc tùy thuộc vào ý muốn của bạn
          //   borderRadius: '50%', // Đảm bảo bo tròn cho viền ngoài
          //   padding: '5px' // Tùy chỉnh khoảng cách nếu cần thiết
          // }}
          >
           <img src={profileData.avatar ? profileData.avatar : '../assets/images/default-avatar.jpg'} 
           style={{width:'50px',height:'50px',borderRadius:'70%'}} className="rounded-circle"/>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li><Link to="/profile" className="dropdown-item">Settings</Link></li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" onClick={onHandleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
