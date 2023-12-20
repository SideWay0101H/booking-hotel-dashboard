import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions'
import requestApi from "../../helpers/api";
import { toast } from "react-toastify";

const RoomAdd = () => {
  const dispatch = useDispatch() 
  const navigate = useNavigate()
  const {register,handleSubmit, formState:{errors}} = useForm()
  const [thumbnail,setThumbnail]= useState('')
  const [roomtype,setRoomtype] = useState([])

  const handleSubmitFormAdd = async(data) =>{
      console.log('dataform =>',data)
      let formData = new FormData()
      for(let key in data){
        if(key == 'thumbnail'){
          formData.append(key, data[key][0])
        }else {
          formData.append(key, data[key])
        }
      }
      dispatch(actions.controlLoading(true))
      try {
        const res = await requestApi('v1/room','POST',formData, 'json','multipart/form-data')
        console.log('Res =>',res)
        dispatch(actions.controlLoading(false))
        toast.success('Room has been created successfully!',{ position: 'top-center',autoClose: 2000})
        setTimeout(() => navigate('/room'),3000)
      } catch (error) {
        console.log('Error =>',error)
        dispatch(actions.controlLoading(false))
      }
    }
  
  useEffect(() =>{
    dispatch(actions.controlLoading(true))
    requestApi('v1/type','GET').then(res =>{
      console.log('Res =>',res)
      setRoomtype(res.data)
      dispatch(actions.controlLoading(false))
    }).catch(err =>{
      console.log('Error =>',err)
      dispatch(actions.controlLoading(false))
    })
  },[])
  

    const onThumbnailChange = (event) =>{
      if(event.target.value && event.target.files[0]){
        let reader = new FileReader()
        reader.onload = (e) =>{
          setThumbnail(reader.result)
        }
        reader.readAsDataURL(event.target.files[0])
      }
    }
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">New Room</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
            <li className="breadcrumb-item"><Link to="/room">Phòng</Link></li>
            <li className="breadcrumb-item active">Tạo phòng </li>
          </ol>
          <div className="card mb-4">
            <div className="card-header">
                <i className="fas fa-plus me-1"></i>
                Add
            </div>
            <div className="card-body">
                <div className="row mb-3">
                    <div className="col-md-6">
                           <div className="row">
                                <div className="col-md-4 mb-3">
                                    <div className="from-label">Số phòng</div>
                                    <input {...register('room_number', { required: 'Number room is required'})} type="text" className="form-control" placeholder="Nhập Tên phòng"></input>
                                    {errors.room_number && <p style={{color: 'red'}}>{errors.room_number.message}</p>}
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="from-label">Sức chứa</div>
                                    <input {...register('occupancy', {required: "Occpancy is required"})}type="text" className="form-control" placeholder="Nhập Sức chứa"></input>
                                    {errors.occupancy && <p style={{color: 'red'}}>{errors.occupancy.message}</p>}
                                </div>
                           </div>
                           <div className="col">
                                <div className="col-md-4 mb-3">
                                    <div className="from-label">Giá phòng</div>
                                    <input {...register('price_at_night', { required: 'Price is required'})} type="text" className="form-control" placeholder="Nhập Giá"></input>
                                    {errors.price_at_night && <p style={{color: 'red'}}>{errors.price_at_nighte.message}</p>}
                                </div>

                                <div className="col-md-4 mb-3">
                                  <div className="from-label">Diện tích</div>
                                  <input {...register('area', { required: 'Area is required'})} type="text" className="form-control" placeholder="Nhập diện tích"></input>
                                  {errors.area && <p style={{color: 'red'}}>{errors.area.message}</p>}
                                </div>
                           </div>
                            <div className="mb-3 mt-3">
                                <div className="from-label">Thumbnail</div>
                                { thumbnail && <img style={{width: "300px"}} src={thumbnail} className="mb-2" alt="..."/>}
                                <div className="input-file">
                                    <label htmlFor="file" className="btn-file btn-sm btn btn-primary">Browse Files</label>
                                    <input id="file" type="file" name="thumbnail" {...register("thumbnail", {required: "Thumbnail is required", onChange:onThumbnailChange })}/>
                                </div>
                                {errors.thumbnail && <p style={{color: 'red'}}>{errors.thumbnail.message}</p>}
                            </div>
                            
                            <div className="mb-3">
                                <div className="from-label">Loại phòng:</div>
                                <select {...register('roomtype', { required: "Roomtype is required"})} className="form-select">
                                    <option value="">--Select a RoomType--</option>
                                    {roomtype.map(cat => {return <option key={cat.id} value={cat.id}>{cat.type_name}</option>})}
                                </select>
                                {errors.roomtype && <p style={{color: 'red'}}>{errors.roomtype.message}</p>}
                            </div>
                           <div className="mb-3">
                                <div className="from-label">Trạng thái</div>
                                <select {...register('numRoomAvailable')} className="form-select">
                                    <option value="Còn">Còn</option>
                                    <option value="Đã Hết">Đã hết</option>
                                </select>
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

export default RoomAdd;
