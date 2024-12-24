import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./orders.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { orders } from "../../data";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "id", headerName: "Mã ĐH ", width: 90 },
  
  {
    field: "hoten",
    type: "string",
    headerName: "Tên khách hàng",
    width: 150,
  },
  {
    field: "dienthoai",
    type: "string",
    headerName: "Số điện thoại ",
    width: 150,
  },
  {
    field: "diachi",
    type: "string",
    headerName: "Địa chỉ  ",
    width: 275,
  },
  {
    field: "tensp",
    type: "string",
    headerName: "Tên sản phẩm ",
    width: 275,
  },
  {
    field: "soluong",
    type: "string",
    headerName: " Số lượng ",
    width: 80,
  },
  {
    field: "mau",
    headerName: "Màu sắc ",
    width: 80,
    type: "string",
  },
  {
    field: "thanhtoan",
    headerName: "Thanh toán",
    width: 100,
    type: "boolean",
  },
  {
    field: "ngaymua",
    headerName: "Ngày mua hàng ",
    width: 100,
    type: "string",
  },
];

const Orders  = () => {
  const [open, setOpen] = useState(false);



  return (
    <div className="orders">
      <div className="info">
        <h1>Hóa đơn bán hàng </h1>
        <button onClick={() => setOpen(true)}> + Thêm hóa đơn mới </button>
      </div>
      <DataTable slug="orders" columns={columns} rows={orders} />
     
      {open && <Add slug="hóa đơn" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Orders;
