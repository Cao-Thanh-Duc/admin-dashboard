import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { userRows } from "../../data";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "ledaianh.png"} alt="AVT" />;
    },
  },
  {
    field: "hoten",
    type: "string",
    headerName: "Họ và tên ",
    width: 250,
  },
  {
    field: "diachi",
    type: "string",
    headerName: "Địa chỉ ",
    width: 250,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Số điện thoại ",
    width: 150,
  },
  {
    field: "ngaytao",
    headerName: "Ngày tạo ",
    width: 100,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Xác minh ",
    width: 150,
    type: "boolean",
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);



  return (
    <div className="users">
      <div className="info">
        <h1>Tài khoản</h1>
        <button onClick={() => setOpen(true)}> + Thêm tài khoản mới </button>
      </div>
      <DataTable slug="users" columns={columns} rows={userRows} />
     
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
