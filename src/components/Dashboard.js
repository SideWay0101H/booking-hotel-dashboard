import React, { useEffect, useState } from "react";
import requestApi from "../helpers/api";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from '../redux/actions'
import { Column } from '@ant-design/plots';

const data = [
  {
    type: 'Tháng 1',
    sales: 4,
  },
  {
    type: 'Tháng 2',
    sales: 4,
  },
  {
    type: 'Tháng 3',
    sales: 4,
  },
  {
    type: 'Thánsg 4',
    sales: 4,
  },
  {
    type: 'Tháng 5',
    sales: 6,
  },
  {
    type: 'Tháng 6',
    sales: 3,
  },
  {
    type: 'Tháng 7',
    sales: 16,
  },
  {
    type: 'Tháng 8',
    sales: 2,
  },
  {
    type: 'Tháng 9',
    sales: 6,
  },
  {
    type: 'Tháng 10',
    sales: 3,
  },
  {
    type: 'Tháng 11',
    sales: 3,
  },
  {
    type: 'Tháng 12',
    sales: 3,
  },
];
const config = {
  data,
  xField: 'type',
  yField: 'sales',
  label: {
    position: 'middle',
    style: {
      fill: '#FFFFFF',
      opacity: 0.6,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    type: {
      alias: 'Loại',
    },
    sales: {
      alias: 'Số lượng phòng đã được đặt',
    },
  },
};
const Dashboard = () => {
  const dispatch = useDispatch()
  const [dashboardData, setDashboardData] = useState({});
  
  useEffect(() => {
    
    const promiseUser = requestApi('v1/users', 'GET')
    const promiseRoom = requestApi('v1/room','GET')
    const promiseService = requestApi('v1/services','GET')
    const promiseReview = requestApi('v1/review','GET')
    dispatch(actions.controlLoading(true))
    Promise.all([promiseUser, promiseRoom, promiseService, promiseReview]).then((res) =>{
      console.log("Res =>",res)
      setDashboardData({
        ...dashboardData,totalUser:res[0].data.total,
                         totalRoom: res[1].data.total,
                         totalService: res[2].data.reduce((total, item) => total + item.sales || 0, 0),
                         totalReview: res[3].data.reduce((total, item) => total + item.sales || 0, 0)
      })
      dispatch(actions.controlLoading(false))
    }).catch(error =>{
      console.log("Errors =>",error)
      dispatch(actions.controlLoading(false))
    })
}, [])

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Thống kê</li>
          </ol>
          <div className="row px-2">
            <div className="col-xl-3 col-md-6">
              <div className="card bg-danger text-white mb-4">
                <div className="card-body">
                 Tổng số người dùng
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {dashboardData.totalUser}
                    </span>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                <Link to="/users" className="small text-white stretched-link">Xem chi tiết</Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4">
                <div className="card-body">
               Tổng số Phòng
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {dashboardData.totalRoom}
                    </span>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <Link to="/room" className="small text-white stretched-link"> Xem chi tiết</Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card bg-info text-white mb-4">
                <div className="card-body">
                Tổng loại dịch vụ
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {dashboardData.totalService}
                    </span>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <Link to="/service" className="small text-white stretched-link">Xem chi tiết</Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card bg-success text-white mb-4">
                <div className="card-body">
                Tổng lượt đánh giá
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {dashboardData.totalReview}
                    </span>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-between">
                  <Link to="/review" className="small text-white stretched-link">Xem chi tiết</Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
          <div container-fluid px-4>
           <h1 className="mt-4">Biểu đồ</h1>
            <Column {...config} />;
          </div>
      </main>
      
    </div>
  );
};

export default Dashboard;
