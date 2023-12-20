import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions'
import requestApi from "../../helpers/api";
import { toast } from "react-toastify";

const UserAdd = () => {
  const dispatch = useDispatch() 
  const navigate = useNavigate()
    const {register,handleSubmit, formState:{errors}} = useForm()

    const handleSubmitFormAdd = async(data) =>{
        console.log('dataform =>',data)
        dispatch(actions.controlLoading(true))
        try {
          const res = await requestApi('v1/users', 'POST', data)
          console.log('res=>',res)
          dispatch(actions.controlLoading(false))
          toast.success('User has successfully !',{ position: "top-center", autoClose: 2000})
          setTimeout(() => navigate('/users',),3000)
        } catch (error) {
          console.log('Error =>',error)
          dispatch(actions.controlLoading(false))
        }
    }

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className=",t-4">Thêm người dùng</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
            <li className="breadcrumb-item"><Link to="/users">Người dùng</Link></li>
            <li className="breadcrumb-item active">Thêm mới</li>
          </ol>
          <div className="card mb-4">
            <div className="card-header">
                <i className="fas fa-plus me-1"></i>
                Thêm mới
            </div>
            <div className="card-body">
                <div className="row mb-3">
                    <div className="col-md-16">
                            <div className="mb-3 ">
                                <div className="from-label">Họ và tên</div>
                                <input {...register('fullname', { required: 'FullName is required'})} type="text" className="form-control" placeholder="Nhập họ và tên"></input>
                                {errors.fullname && <p style={{color: 'red'}}>{errors.fullname.message}</p>}
                            </div>
                            <div className="mb-3 ">
                                <div className="from-label">Email</div>
                                <input {...register('email', 
                                { required: 'Email is required',
                                 pattern: {
                                    value: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,})+$/,
                                    message: 'Invalid email address'
                                     }
                                  })}
                                 type="email" className="form-control" placeholder="Nhập Email"></input>
                                {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
                            </div>
                            <div className="mb-3 ">
                                <div className="from-label">Mật khẩu</div>
                                <input {...register('password', { required: 'Password is required'})} type="password" className="form-control" placeholder="Nhập mật khẩu"></input>
                                {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
                            </div>
                            <div className="mb-3 ">
                                <div className="from-label">Số điện thoại</div>
                                <input {...register('phone', { required: 'Phone is required'})} type="text" className="form-control" placeholder="Nhập số diện thoại"></input>
                                {errors.phone && <p style={{color: 'red'}}>{errors.phone.message}</p>}
                            </div>
                            <div className="mb-3 ">
                                <div className="from-label">Tuổi</div>
                                <input {...register('age', { required: 'Age is required'})} type="text" className="form-control" placeholder="Nhập tuổi"></input>
                                {errors.age && <p style={{color: 'red'}}>{errors.age.message}</p>}
                            </div>
                            <div className="mb-3 ">
                                <div className="from-label">Địa chỉ</div>
                                <input {...register('address', { required: 'Address is required'})} type="text" className="form-control" placeholder="Nhập địa chỉ"></input>
                                {errors.address && <p style={{color: 'red'}}>{errors.address.message}</p>}
                            </div>
                            {/* <div className="mb-3">
                                <div className="from-label">Sex</div>
                                <input {...register('gender', { required: 'Sex is required'})} type="text" className="form-control" placeholder="Enter Sex"></input>
                                {errors.gender && <p style={{color: 'red'}}>{errors.gender.message}</p>}
                            </div> */}

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

export default UserAdd;
