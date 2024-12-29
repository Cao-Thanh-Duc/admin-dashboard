import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { UserApi } from '../../apis/user.api';
import Add from '../../components/add/AddSupplier';
import DataTable from '../../components/dataTable/DataTable';
import './Users.scss';
import DataTableUser from '../../components/dataTableUser/DataTableUser';
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: 'UserID', headerName: 'ID', width: 300 },
  {
    field: 'fullname',
    type: 'string',
    headerName: 'Họ và tên ',
    width: 500,
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    width: 400,
  },
];

const Users = () => {
  const [open, setOpen] = useState<boolean>(false);

  const {
    data: getUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => UserApi.getUsers(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className='users'>
      <div className='info'>
        <h1>Tài khoản</h1>
      </div>
      <DataTableUser
        slug='users'
        columns={columns}
        rows={getUser?.data || []}
        getRowId={(row: any) => row.UserID}
      />
      {open && <Add slug='user' columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
