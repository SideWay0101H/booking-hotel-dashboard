// import React, { useEffect, useState } from 'react'
// import { Table } from "antd"
// import { useDispatch,useSelector } from 'react-redux';
// import { getUsers } from '../../features/user/UserSlice';

// const columns = [
//     {
//       title: 'STT',
//       dataIndex: 'key'
//     },
//     {
//       title: 'Họ và tên',
//       dataIndex: 'name',
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//     },
//     // {
//     //   title: 'Mật khẩu',
//     //   dataIndex: 'password',
//     // },
//     {
//       title: 'Vai Trò',
//       dataIndex: 'role'
//     },
//     {
//       title: 'Tuổi',
//       dataIndex: 'age',
//     },
//     {
//       title: 'Số điện thoại',
//       dataIndex: 'phone',
//     },
//     {
//       title: 'Địa chỉ',
//       dataIndex: 'address',
//     },
//     {
//       title: 'Giới tính',
//       dataIndex: 'gender'
//     },
    
//   ];
  
// const UserList = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getUsers());
//   },[]);
//   const userState = useSelector((state) => state.user.users);
//   console.log(useState);
//   const data = [];
//   for (let i = 0; i < userState.length; i++) {
//     data.push({
//       key: i +1,
//       name: userState[i].fullname,
//       email: userState[i].email,
//       // password: userState[i].password,
//       role: userState[i].roles,
//       age: userState[i].age,
//       phone: userState[i].phone,
//       address: userState[i].address,
//       gender: userState[i].gender,
//       create_at: userState[i].create_at,
//       update_at: userState[i].update_at,
//     });
//   }

//   return (
//     <div>
//       <h3 className="mb-4 title">User List</h3>
//         <div>
//             <Table columns={columns} dataSource={data} />
//         </div>
//     </div>
//   )
// }

// export default UserList
