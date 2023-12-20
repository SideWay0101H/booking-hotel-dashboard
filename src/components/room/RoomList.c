// import React, { useEffect } from "react";
// import { Table } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { getRooms } from "../../features/room/RoomSlice";
// import validator from "validator";
// import { Select } from "antd";

// const columns = [
//   {
//     title: "STT",
//     dataIndex: "key",
//   },
//   {
//     title: "Tên Phòng",
//     dataIndex: "room_number",
//   },
//   {
//     title: "Sức chứa",
//     dataIndex: "occupancy",
//   },
//   {
//     title: "thumbnail",
//     dataIndex: "thumbnail",
//     render: (thumbnail) => (
//       <img
//         src={
//           validator.isBase64(thumbnail)
//             ? `data:image/png; base64,${thumbnail}`
//             : thumbnail
//         }
//         alt="Thumbnail"
//         style={{ width: "50px", height: "50px" }}
//       />
//     ),
//   },
//   {
//     title: "Giá/Đêm",
//     dataIndex: "price_at_night",
//   },
//   {
//     title: "Diện Tích",
//     dataIndex: "area",
//   },
//   {
//     title: "Trạng thái phòng",
//     dataIndex: "roomAvailable",
//     render: (roomAvailable, record) => (
//       <Select
//         value={roomAvailable} 
//         className="form-control"
//         >
//         {roomStatusOptions.map((option) => (
//           <Select.Option key={option.value} value={option.value}>
//             {option.label}
//           </Select.Option>
//         ))}
//       </Select>
//     ),
//   },
//   {
//     title: "Ngày tạo",
//     dataIndex: 'create_at'
//   },
//   {
//     title: "Ngày Cập nhật",
//     dataIndex: 'update_at'
//   }
// ];

// const roomStatusOptions = [
//   { value: "available", label: "Available" },
//   { value: "occupied", label: "Occupied" },
//   { value: "maintenance", label: "Maintenance" },
//   // ...Thêm các tùy chọn khác nếu cần
// ];

// const RoomList = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getRooms());
//   }, []);
//   const roomState = useSelector((state) => state.room.rooms);
//   const data = [];
//   for (let i = 0; i < roomState.length; i++) {
//     data.push({
//       key: i + 1,
//       room_number: roomState[i].room_number,
//       occupancy: roomState[i].occupancy,
//       thumbnail: roomState[i].thumbnail,
//       price_at_night: roomState[i].price_at_night,
//       area: roomState[i].area,
//       roomAvailable: roomState[i].roomAvailable,
//       create_at: roomState[i].create_At,
//       update_at: roomState[i].update_At,
//     });
//   }
//   return (
//     <div>
//       <h3 className="mb-4 title">Room List</h3>
//       <div>
//         <Table columns={columns} dataSource={data} />
//       </div>
//     </div>
//   );
// };

// export default RoomList;
