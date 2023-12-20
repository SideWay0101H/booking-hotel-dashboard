import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions'
import requestApi from "../../helpers/api";
import { toast } from "react-toastify";

import { DatePicker, Space } from 'antd';

const AddBooking = () => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch() 
  const navigate = useNavigate()
    const {register,handleSubmit, formState:{errors}} = useForm()
    const [dateRange, setDateRange] = useState([]);

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

    const handleSubmitFormAdd = async(data) =>{
        console.log('dataform =>',data)
        dispatch(actions.controlLoading(true))
        try {
          const res = await requestApi('v1/order', 'POST', data)
          console.log('res=>',res)
          dispatch(actions.controlLoading(false))
          toast.success('User has successfully !',{ position: "top-center", autoClose: 2000})
          setTimeout(() => navigate('/booking',),3000)
        } catch (error) {
          console.log('Error =>',error)
          dispatch(actions.controlLoading(false))
        }
    }

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className=",t-4">Đặt phòng</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
            <li className="breadcrumb-item"><Link to="/booking">Đặt phòng</Link></li>
            <li className="breadcrumb-item active">Tạo đặt phòng</li>
          </ol>
          <div className="card mb-4">
            <div className="card-header">
                <i className="fas fa-plus me-1"></i>
                Thêm mới
            </div>
            <div className="card-body">
                <div className="row mb-3">
                    <div className="col-md-16">
                            <div className="">
                              <h2>Chọn Ngày Check-in và Check-out</h2>
                                <Space direction="vertical" className="space-container"  size={12} style={{ marginBottom: '16px'}}>
                                  <RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    onChange={handleDateChange}
                                    style={{ height: '40px'}}
                                  />
                                </Space>
                              <div >
                                {dateRange.length > 0 && (
                                  <div>
                                    <p>Check-in: {dateRange[0].format('YYYY-MM-DD HH:mm')}</p>
                                    <p>Check-out: {dateRange[1].format('YYYY-MM-DD HH:mm')}</p>
                                  </div>
                                )}
                              </div>
                          </div>
                            <div className="mb-3 ">
                                <div className="from-label">Số lượng</div>
                                <input {...register('quantity', { required: 'Số lượng không được để trống'})} type="text" className="form-control" placeholder="Nhập Số lượng"></input>
                                {errors.quantity && <p style={{color: 'red'}}>{errors.quantity.message}</p>}
                            </div>
                            

                            <button type="button" onClick={handleSubmit(handleSubmitFormAdd)} className="btn btn-success">Tạo mới</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddBooking;
