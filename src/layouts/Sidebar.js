import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div id="layoutSidenav_nav">
    <nav className="sb-sidenav bg-slider accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="nav">
                {/* <div className="sb-sidenav-menu-heading">Core</div> */}
                <a className="nav-link" to="/">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    <Link to="/" className='nav-link text-slider'>Dashboard</Link>
                </a>
                {/* <div className="sb-sidenav-menu-heading">Interface</div> */}
                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                   Người dùng
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link to="/users/add" className="nav-link">Thêm người dùng</Link>
                        <Link to="/users" className="nav-link">Danh sách người dùng</Link>
                    </nav>
                </div>

                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseRoom" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link-icon"><i className="fas fa-bed"></i></div>
                     Phòng
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapseRoom" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link to="/room/add" className="nav-link">Thêm phòng</Link>
                        <Link to="/room" className="nav-link">Danh sách phòng</Link>
                    </nav>
                </div>
                
                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseBooking" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                    Đặt phòng
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapseBooking" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link to="/booking/add" className="nav-link">Đặt phòng</Link>
                        <Link to="/booking" className="nav-link">Danh sách đặt phòng</Link>
                    </nav>
                </div>

                <a className="nav-link collapsed rounded" href="#" data-bs-toggle="collapse" data-bs-target="#collapseReview" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link-icon"><i className="fas fa-star"></i></div>
                     Đánh giá
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapseReview" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        {/* <Link to="/booking/add" className="nav-link">Add Booking</Link> */}
                        <Link to="/review" className="nav-link">Danh sách đánh giá</Link>
                    </nav>
                </div>
                <a className="nav-link collapsed rounded" href="#" data-bs-toggle="collapse" data-bs-target="#collapseService" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link-icon"><i className="fa fa-glass"></i></div>
                     Dịch vụ
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapseService" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link to="/service/add" className="nav-link">Thêm dịch vụ</Link>
                        <Link to="/service" className="nav-link">Danh sách dịch vụ</Link>
                    </nav>
                </div>

            </div>
        </div>
    </nav>
</div> 
  )
}

export default Sidebar
