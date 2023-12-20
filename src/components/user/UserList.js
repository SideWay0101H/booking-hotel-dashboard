import React, { useEffect, useState } from "react";
import TableData from "../common/TableData";
import requestApi from "../../helpers/api";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [numOfPage, setNumOfPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteType, setDeletetype] = useState("single");
  const [showModal,setShowModal] = useState(false)
  const [refresh,setRefresh] = useState(Date.now())

  const columns = [
    {
      name: "STT",
      element: (row) => row.id,
    },
    {
      name: "Họ và tên",
      element: (row) => row.fullname,
    },
    {
      name: "Email",
      element: (row) => row.email,
    },
    {
      name: "Vai trò",
      element: (row) => row.roles,
    },
    {
      name: "Số điện thoại",
      element: (row) => row.phone,
    },
    {
      name: "Tuổi",
      element: (row) => row.age,
    },
    {
      name: "Địa chỉ",
      element: (row) => row.address,
    },
    // {
    //   name: "Giới tính",
    //   element: (row) => row.gender,
    // },
    {
      name: "Ngày tạo",
      element: (row) => row.create_at,
    },
    {
      name: "Ngày cập nhật",
      element: (row) => row.update_at,
    },
    {
      name: "Actions",
      element: (row) => (
        <div className="btn-group">
          <Link to={`/users/edit/${row.id}`} className="btn btn-sm btn-warning me-1"><i className="fa fa-pencil"></i> </Link>
          <button type="button" className="btn btn-sm btn-danger me-1" onClick={() => handleDelete(row.id)}>
            <i className="fa fa-trash"></i> 
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    console.log("single delete with id =>", id);
    setShowModal(true)
    setDeleteItem(id)
    setDeletetype("single")
  };

  const handleMultiDelete = () => {
    console.log("Multi delete =>", selectedRows);
    setShowModal(true)
    setDeletetype("multi")
  };


  const requestDeleteApi = () =>{
    if(deleteType === "single"){
      dispatch(actions.controlLoading(true))
      requestApi(`v1/users/${deleteItem}`,'DELETE', []).then(response =>{
        setShowModal(false)
        setRefresh(Date.now())
        dispatch(actions.controlLoading(false))
      }).catch(err =>{
        console.log(err)
        setShowModal(false)
        dispatch(actions.controlLoading(false))
      })
    }else {
      dispatch(actions.controlLoading(true))
      requestApi(`v1/users/multiple?ids=${selectedRows.toString()}`,'DELETE',[]).then(response =>{
        setShowModal(false)
        setSelectedRows([])
        setRefresh(Date.now())
        dispatch(actions.controlLoading(false))
      }).catch(err => {
        console.log(err)
        setShowModal(false)
        dispatch(actions.controlLoading(false))
      })
    }
  }

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    let query = `?item_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;
    requestApi(`v1/users${query}`, "GET", [])
      .then((response) => {
        console.log("Response=>", response);
        setUsers(response.data.data);
        setNumOfPage(response.data.lastPage);
        dispatch(actions.controlLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(actions.controlLoading(false));
      });
  }, [currentPage, itemsPerPage, searchString,refresh]);

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Bảng</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <a>DashBoard</a>
            </li>
            <li className="breadcrumb-item active">Bảng</li>
          </ol>
          <div className="mb-3">
              <Link className="btn btn-sm btn-success me-2" to="/users/add"><i className="fa fa-plus"></i>Thêm mới</Link>
            {selectedRows.length > 0 && (
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={handleMultiDelete}
              >
                <i className="fa fa-trash"></i>Delete
              </button>
            )}
          </div>
          <TableData
            name="Danh sach người dùng"
            data={users}
            columns={columns}
            numOfPage={numOfPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onChangeItemsPerPage={setItemsPerPage}
            onKeySearch={(keyword) => {
              console.log("Keyword in user list comp=>", keyword);
              setSearchString(keyword);
            }}
            onSelectedRows={(rows) => {
              console.log("selected rows in user list =>", rows);
              setSelectedRows(rows);
            }}
          />
        </div>
      </main>
      <Modal show={showModal} onClick={() => setShowModal(false)} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete ?</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
          <Button className="btn-danger" onClick={requestDeleteApi}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
