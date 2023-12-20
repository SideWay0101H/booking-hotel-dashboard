// import React, { useState } from 'react'
// import CustomInput from '../CustomInput'
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// // import { InboxOutlined } from '@ant-design/icons';
// import { Select } from 'antd';
// import * as yup from "yup";
// import {useFormik } from 'formik'
// // import { useDispatch } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';

// let schema = yup.object().shape({
//   room_number: yup.string().required("room_number is required"),
//   occupancy: yup.string().required("occupancy is required"),
//   thumbnail: yup.string().required("thumbnail is required"),
//   price_at_night: yup.string().required("price_at_night is required"),
//   area: yup.number().required("area is required"),
//   roomAvailable: yup.string().required("roomAvailable is required"),
// });



// // const { Dragger } = Upload;
// // const props = {
// //   name: 'file',
// //   multiple: true,
// //   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
// //   onChange(info) {
// //     const { status } = info.file;
// //     if (status !== 'uploading') {
// //       console.log(info.file, info.fileList);
// //     }
// //     if (status === 'done') {
// //       message.success(`${info.file.name} file uploaded successfully.`);
// //     } else if (status === 'error') {
// //       message.error(`${info.file.name} file upload failed.`);
// //     }
// //   },
// //   onDrop(e) {
// //     console.log('Dropped files', e.dataTransfer.files);
// //   },
// // };
// const AddRoom = () => {
//   const [desc, setDesc] = useState();    
//   // const dispatch = useDispatch()
//   // const navigate = useNavigate()
  
//   const handleDesc = (e) => {
//     setDesc(e);
//   }

//   const formik = useFormik({
//     initialValues: {
//       room_number:"",
//       occupancy:"",
//       thumbnail:"",
//       price_at_night:"",
//       area:"",
//       roomAvailable: "",
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       // dispatch(createUsers(values)),
//       // formik.resetForm()
//       // setTimeout(() => {
//       //   navigate("/list-user")
//       // }, 3000);
//     },
//   });

//   return (
//     <div>
//         <h3 className="mb-4 title">Thêm phòng</h3>
//         <div className="">
//             <form onSubmit={formik.handleSubmit} action="">
//                 {/* <Dragger {...props}>
//                     <p className="ant-upload-drag-icon">
//                     <InboxOutlined />
//                     </p>
//                         <p className="ant-upload-text">Click or drag file to this area to upload</p>
//                         <p className="ant-upload-hint">
//                         Support for a single or bulk upload. Strictly prohibited from uploading company data or other
//                         banned files.
//                     </p>
//                 </Dragger> */}
//                 <div className="mt-4">
//                     <CustomInput 
//                     name="room_number"
//                     onCh={formik.handleChange("room_number")}
//                     onBlr={formik.handleBlur("room_number")}
//                     val={formik.values.room_number}
//                     type="text" 
//                     label="Số phòng" />
//                 </div>
//                 <div className="mt-4">
//                     <CustomInput 
//                     name="occupancy"
//                     onCh={formik.handleChange("occupancy")}
//                     onBlr={formik.handleBlur("occupancy")}
//                     val={formik.values.occupancy}
//                     type="text" 
//                     label="Sức chứa" />
//                 </div>
//                 <div className="mt-4">
//                     <CustomInput 
//                     name="price_at_night"
//                     onCh={formik.handleChange("price_at_night")}
//                     onBlr={formik.handleBlur("price_at_night")}
//                     val={formik.values.price_at_night}
//                     type="text" 
//                     label="Giá phòng" />
//                 </div>
//                 <div className="mt-4">
//                     <CustomInput type="text" label="thumbnail" />
//                 </div>
//                 <div className="mt-4">
//                     <CustomInput 
//                     name="area"
//                     onCh={formik.handleChange("area")}
//                     onBlr={formik.handleBlur("area")}
//                     val={formik.values.area}
//                     type="text" 
//                     label="Diện tích" />
//                 </div>
                
//                 <Select
//                   mode="multiple"
//                   allowClear
//                   className="w-100"
//                   placeholder="Chọn trạng thái phòng"
//                 />
//                 <ReactQuill 
//                 className="mt-4"
//                     theme="snow" 
//                     value={desc} 
//                     onChange={(evt) => {
//                         handleDesc(evt);
//                     }}   
//                 />
//                     <button className="btn btn-success border-0 rounded-3 my-5" type="submit">
//                         Add Room
//                     </button>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default AddRoom