import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import requestApi from "../../helpers/api";
import { toast } from "react-toastify";


const RoomUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [thumbnail, setThumbnail] = useState("");
  const [roomtype, setRoomtype] = useState([]);
  const params = useParams();
  const [roomData,setRoomData] = useState({})


  //hàm xử lý nút cập nhật cho from của Room
  const handleSubmitFormAdd = async (data) => {
    console.log("dataform =>", data);
    let formData = new FormData();
    for (let key in data) {
      if (key == "thumbnail") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi(
        `v1/room/${params.id}`,
        "PUT",
        formData,
        "json",
        "multipart/form-data"
      );
      console.log("Res =>", res);
      dispatch(actions.controlLoading(false));
      toast.success("Room has been update successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/room"), 3000);
    } catch (error) {
      console.log("Error =>", error);
      dispatch(actions.controlLoading(false));
    }
  };
  //lấy thông tin danh sách từ room type 
  useEffect(() => {
    dispatch(actions.controlLoading(true));
    try {
      const renderData = async () => {
        const res = await requestApi("v1/type",'GET');
        console.log("Res =>", res);
        setRoomtype(res.data);
        const detailRoom = await requestApi(`v1/room/${params.id}`,'GET');
        console.log("DetailRoom =>", detailRoom);
        const fields = ['room_number','occupancy','price_at_night','area','thumbnail','roomtype','roomAvailable'];
        fields.forEach(field =>{
            if(field == 'roomtype'){
                setValue(field,detailRoom.data[field].id)
            }else {
                setValue(field,detailRoom.data[field])
            }
        } )
        setRoomData({...detailRoom.data,thumbnail: process.env.REACT_APP_API_URL + '/' + detailRoom.data.thumbnail})
        dispatch(actions.controlLoading(false));
      };
      renderData();
    } catch (err) {
      console.log("Err =>", err);
      dispatch(actions.controlLoading(false));
    }
  },[]);


  //Hàm xử lý ảnh thumbnail
  const onThumbnailChange = (event) => {
    if (event.target.value && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setRoomData({...roomData,thumbnail: reader.result})
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Update Room</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/room">Phòng</Link>
            </li>
            <li className="breadcrumb-item active">Cập nhật</li>
          </ol>
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-plus me-1"></i>
              Cập nhật phòng
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="row">
                   
                    <div className="col-md-4 mb-3">
                      <div className="from-label">Sức chứa</div>
                      <input
                        {...register("occupancy", {
                          required: "Occpancy is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Enter Occpancy"
                      ></input>
                      {errors.occupancy && (
                        <p style={{ color: "red" }}>
                          {errors.occupancy.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div className="col-md-4 mb-3">
                      <div className="from-label">Giá phòng</div>
                      <input
                        {...register("price_at_night", {
                          required: "Price is required",
                        })}
                        type="text"
                        className="form-control"
                        placeholder="Enter Price"
                      ></input>
                      {errors.price_at_night && (
                        <p style={{ color: "red" }}>
                          {errors.price_at_night.message}
                        </p>
                      )}
                    </div>

                    <div className="col-md-4 mb-3">
                      <div className="from-label">Diện tích</div>
                      <input
                        {...register("area", { required: "Area is required" })}
                        type="text"
                        className="form-control"
                        placeholder="Enter Area"
                      ></input>
                      {errors.area && (
                        <p style={{ color: "red" }}>{errors.area.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 mt-3">
                    <div className="from-label">Thumbnail</div>
                    {roomData.thumbnail && (
                      <img
                        style={{ width: "300px" }}
                        src={roomData.thumbnail}
                        className="mb-2"
                        alt="..."
                      />
                    )}
                    <div className="input-file">
                      <label
                        htmlFor="file"
                        className="btn-file btn-sm btn btn-primary"
                      >
                        Browse Files
                      </label>
                      <input
                        id="file"
                        type="file"
                        name="thumbnail"
                        {...register("thumbnail", {
                          required: "Thumbnail is required",
                          onChange: onThumbnailChange,
                        })}
                      />
                    </div>
                    {errors.thumbnail && (
                      <p style={{ color: "red" }}>{errors.thumbnail.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <div className="from-label">Loại Phòng:</div>
                    <select
                      {...register("roomtype", {
                        required: "Roomtype is required",
                      })}
                      className="form-select"
                    >
                      <option value="">--Chọn loại phòng--</option>
                      {roomtype.map((cat) => {
                        return (
                          <option key={cat.id} value={cat.id}>
                            {cat.type_name}
                          </option>
                        );
                      })}
                    </select>
                    {errors.roomtype && (
                      <p style={{ color: "red" }}>{errors.roomtype.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <div className="from-label">Trạng thái phòng</div>
                    <select
                      {...register("roomAvailable")}
                      className="form-select"
                    >
                      <option value="isVailable">Còn</option>
                      <option value="occupied">Đã hết</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit(handleSubmitFormAdd)}
                    className="btn btn-success"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoomUpdate;
