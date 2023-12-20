import React, { useEffect, useState } from "react";
import CustomInput from "../CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { Select } from "antd";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch,useSelector } from "react-redux";
import { createUsers, getUsers } from "../../features/user/UserSlice";
import { useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Email is required"),
  roles: yup.string().required("roles is required"),
  age: yup.number().required("Age is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  gender: yup.array().min(1, "Chọn giới tính").required("Gender is required"),
});

// const { Dragger } = Upload;
// const props = {
//   name: 'file',
//   multiple: true,
//   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e) {
//     console.log('Dropped files', e.dataTransfer.files);
//   },
// };
const AddUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [desc, setDesc] = useState();
  const [gender, setGender] = useState([]);
  const handleDesc = (e) => {
    setDesc(e);
  };


  useEffect(()=>{
    dispatch(getUsers())
  },[]);

  const userState = useSelector((state)=>state.user)

  const handleGender = (e) => {
    setGender(e);
    console.log(gender);
  };



  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      roles: "",
      age: "",
      phone: "",
      address: "",
      gender: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createUsers(values)),
      formik.resetForm()
      setTimeout(() => {
        navigate("/list-user")
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add User</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          {/* <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                    </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger> */}
          <div className="mt-4">
            <CustomInput
              name="fullname"
              type="text"
              onCh={formik.handleChange("fullname")}
              onBlr={formik.handleBlur("fullname")}
              val={formik.values.fullname}
              label="Enter Fullname "
              // val={values.fullname}
            />
            <div className="error">
              {formik.touched.fullname && formik.errors.fullname}
            </div>
          </div>
          <div className="mt-4">
            <CustomInput
              name="email"
              type="email"
              onCh={formik.handleChange("email")}
              onBlr={formik.handleBlur("email")}
              val={formik.values.email}
              label="Enter Email"
            />
            <div className="error">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>
          <div className="mt-4">
            <CustomInput
              name="password"
              type="password"
              onCh={formik.handleChange("password")}
              onBlr={formik.handleBlur("password")}
              val={formik.values.password}
              label="Enter Password"
            />
            <div className="error">
              {formik.touched.password && formik.errors.password}
            </div>
          </div>
          <div className="mt-4">
            <CustomInput
              name="roles"
              type="text"
              onCh={formik.handleChange("roles")}
              onBlr={formik.handleBlur("roles")}
              val={formik.values.roles}
              label="Enter Roles"
            />
            <div className="error">
              {formik.touched.roles && formik.errors.roles}
            </div>
          </div>
          <div className="mt-4">
            <CustomInput
              name="age"
              type="text"
              onCh={formik.handleChange("age")}
              onBlr={formik.handleBlur("age")}
              val={formik.values.age}
              label="Enter Age"
            />
            <div className="error">
              {formik.touched.age && formik.errors.age}
            </div>
          </div>
          <div className="mt-4">
            <CustomInput
              name="phone"
              type="text"
              onCh={formik.handleChange("age")}
              onBlr={formik.handleBlur("age")}
              val={formik.values.age}
              label="Enter Phone"
            />
            <div className="error">
              {formik.touched.phone && formik.errors.phone}
            </div>
          </div>
          <div className="mt-4">
            <CustomInput
              name="address"
              type="text"
              onCh={formik.handleChange("address")}
              onBlr={formik.handleBlur("address")}
              val={formik.values.address}
              label="Enter Address"
            />
            <div className="error">
              {formik.touched.address && formik.errors.address}
            </div>
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select genders"
            defaultValue={gender}
            onChange={(i) => handleGender(i)}
            options={gender}
          />

          <ReactQuill
            theme="snow"
            value={desc}
            onChange={(evt) => {
              handleDesc(evt);
            }}
            className="mt-4"
          />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
