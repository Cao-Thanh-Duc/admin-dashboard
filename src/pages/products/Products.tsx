import { useState } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Ảnh ",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "ten",
    type: "string",
    headerName: "Tên sản phẩm",
    width: 300,
  },
  {
    field: "mota",
    type: "string",
    headerName: "Mô tả  ",
    width: 300,
  },
  {
    field: "mau",
    type: "string",
    headerName: "Màu sắc ",
    width: 100,
  },
  {
    field: "price",
    type: "string",
    headerName: "Giá ",
    width: 100,
  },
  {
    field: "thuonghieu",
    headerName: "Thương hiệu",
    type: "string",
    width: 100,
  },
  {
    field: "ngaynhap",
    headerName: "Ngày nhập ",
    width: 100,
    type: "string",
  },
  {
    field: "tonkho",
    headerName: "Tồn kho",
    width: 110,
    type: "boolean",
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);



  return (
    <div className="products">
      <div className="info">
        <h1>Sản phẩm </h1>
        <button onClick={() => setOpen(true)}>+ Thêm sản phẩm mới </button>
      </div>
      <DataTable slug="products" columns={columns} rows={products} />
    
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
