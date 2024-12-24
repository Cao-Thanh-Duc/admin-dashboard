import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./suppliers.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { supplier } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
 
  {
    field: "hoten",
    type: "string",
    headerName: "Tên nhà cung cấp  ",
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
    field: "ngaygiao",
    headerName: "Ngày giao ",
    width: 120,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Xác minh (true/false) ",
    width: 150,
    type: "boolean",
  },
];

const Suppliers = () => {
  const [open, setOpen] = useState(false);



  return (
    <div className="suppliers">
      <div className="info">
        <h1>Nhà cung cấp </h1>
        <button onClick={() => setOpen(true)}> + Thêm nhà cung cấp mới  </button>
      </div>
      <DataTable slug="suppliers" columns={columns} rows={supplier} />
     
      {open && <Add slug="nhà cung cấp" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Suppliers;
