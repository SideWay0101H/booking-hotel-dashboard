import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions'
import requestApi from "../../helpers/api";
import { toast } from "react-toastify";

const AddService = () => {
  const dispatch = useDispatch() 
  const navigate = useNavigate()
    const {register,handleSubmit, formState:{errors}} = useForm()

    const handleSubmitFormAdd = async(data) =>{
        console.log('dataform =>',data)
        dispatch(actions.controlLoading(true))
        try {
          const res = await requestApi('v1/services', 'POST', data)
          console.log('res=>',res)
          dispatch(actions.controlLoading(false))
          toast.success('User has successfully !',{ position: "top-center", autoClose: 2000})
          setTimeout(() => navigate('/service',),3000)
        } catch (error) {
          console.log('Error =>',error)
          dispatch(actions.controlLoading(false))
        }
    }

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className=",t-4">Thêm dịch vụ</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
            <li className="breadcrumb-item"><Link to="/service">Dịch vụ</Link></li>
            <li className="breadcrumb-item active">Thêm mới</li>
          </ol>
          <div className="card mb-4">
            <div className="card-header">
                <i className="fas fa-plus me-1"></i>
                Thêm mới
            </div>
            <div className="card-body">
                <div className="row mb-3">
                    <div className="col-md-18">
                            <div className="mb-3 ">
                                <div className="from-label">Tên dịch vụ</div>
                                <input {...register('name_service', { required: 'Tên dịch vụ không được trống'})} type="text" className="form-control" placeholder="Nhập tên dịch vụ"></input>
                                {errors.name_service && <p style={{color: 'red'}}>{errors.name_service.message}</p>}
                            </div>
                            
                            <div className="mb-3 ">
                                <div className="from-label">Giá dịch vụ</div>
                                <input {...register('price_service', { required: 'Giá dịch vụ không được trống'})} type="text" className="form-control" placeholder="Nhập giá dịch vụ"></input>
                                {errors.price_service && <p style={{color: 'red'}}>{errors.price_service.message}</p>}
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

export default AddService;
