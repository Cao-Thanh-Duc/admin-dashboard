import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./categorys.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { category } from "../../data";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 200 },
  
  {
    field: "ten",
    type: "string",
    headerName: "Tên danh mục ",
    width: 550,
  },
  {
    field: "notes",
    type: "string",
    headerName: "Ghi chú  ",
    width: 450,
  },
 
];

const Categorys = () => {
  const [open, setOpen] = useState(false);



  return (
    <div className="categorys">
      <div className="info">
        <h1>Danh mục </h1>
        <button onClick={() => setOpen(true)}> + Thêm danh mục mới </button>
      </div>
      <DataTable slug="categorys" columns={columns} rows={category} />
     
      {open && <Add slug="danh mục" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Categorys;
