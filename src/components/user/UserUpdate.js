import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as actions from '../../redux/actions'
import { toast } from 'react-toastify'
import requestApi from '../../helpers/api'

const UserUpdate = () => {
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const params = useParams()
    console.log('id user =>',params.id)
    const {register, setValue,handleSubmit, formState:{errors}} = useForm()

    useEffect(() =>{
        dispatch(actions.controlLoading(true))
        try {
            const getDetailUser = async () =>{
                const res = await requestApi(`v1/users/${params.id}`,'GET')
                console.log("res =>",res)
                dispatch(actions.controlLoading(false))
                const fields = ['fullname','phone','age','address','gender']
                fields.forEach((field)=>setValue(field,res.data[field]))
            }
            getDetailUser()
        } catch (error) {
            console.log('errors =>',error)
            dispatch(actions.controlLoading(false))    
        }
    },[])


    const handleSubmitFormUpdate = async (data) =>{
        console.log("data =>",data)
        dispatch(actions.controlLoading(true))
        try {
            const res = await requestApi(`v1/users/${params.id}`,'PUT',data)
            console.log('res =>',res)
            dispatch(actions.controlLoading(false))
            toast.success('User has been updated successfully!',{ position: 'top-center',autoClose: 2000})
            setTimeout(() => navigate('/users'),3000)
        } catch (error) {
            console.log('Error =>',error)
            dispatch(actions.controlLoading(false))
        }
    }
    

  return (
    <div id="layoutSidenav_content">
    <main>
      <div className="container-fluid px-4">
        <h1 className=",t-4">Update User</h1>
        <ol className="breadcrumb mb-4">
          <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
          <li className="breadcrumb-item"><Link to="/users">Users</Link></li>
          <li className="breadcrumb-item active">Cập nhật</li>
        </ol>
        <div className="card mb-4">
          <div className="card-header">
              <i className="fas fa-plus me-1"></i>
              Cập nhật thông tin người dùng
          </div>
          <div className="card-body">
              <div className="row mb-3">
                  <div className="col-md-6">
                          <div className="mb-3 ">
                              <div className="from-label">Họ và tên</div>
                              <input {...register('fullname', { required: 'Họ và tên không được rỗng'})} type="text" className="form-control" placeholder="Nhập họ và tên"></input>
                              {errors.fullname && <p style={{color: 'red'}}>{errors.fullname.message}</p>}
                          </div>
                          <div className="mb-3 ">
                              <div className="from-label">Số điện thoại</div>
                              <input {...register('phone', { required: 'Số điện thoại không được rỗng'})} type="text" className="form-control" placeholder="Nhập số điện thoại"></input>
                              {errors.phone && <p style={{color: 'red'}}>{errors.phone.message}</p>}
                          </div>
                          <div className="mb-3 ">
                              <div className="from-label">Tuổi</div>
                              <input {...register('age', { required: 'Tuổi không được rỗng'})} type="text" className="form-control" placeholder="Nhập tuổi"></input>
                              {errors.age && <p style={{color: 'red'}}>{errors.age.message}</p>}
                          </div>
                          <div className="mb-3 ">
                              <div className="from-label">Địa chỉ</div>
                              <input {...register('address', { required: 'Địa chỉ không được rỗng'})} type="text" className="form-control" placeholder="Nhập địa chỉ"></input>
                              {errors.address && <p style={{color: 'red'}}>{errors.address.message}</p>}
                          </div>
                          {/* <div className="mb-3">
                              <div className="from-label">Giới tính</div>
                              <input {...register('gender', { required: 'Giới tính không được rỗng'})} type="text" className="form-control" placeholder="Nhập giới tính"></input>
                              {errors.gender && <p style={{color: 'red'}}>{errors.gender.message}</p>}
                          </div> */}

                          <button type="button" onClick={handleSubmit(handleSubmitFormUpdate)} className="btn btn-success">Submit</button>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  )
}

export default UserUpdate
