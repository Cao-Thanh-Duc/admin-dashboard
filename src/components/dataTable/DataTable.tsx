import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductApi } from '../../apis/product.api';
import './dataTable.scss';

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  getRowId?: (row: object) => number;
};

const DataTable = (props: Props) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const mutationDelete = useMutation({
    mutationFn: (id: string) => ProductApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      toast.success('Xóa sản phẩm thành công!');
      setOpen(false); // Đóng modal sau khi xóa
    },
    onError: () => {
      toast.error('Không thể xóa sản phẩm. Vui lòng thử lại.');
    },
  });

  const handleOpen = (id: string) => {
    setSelectedId(id);
    setOpen(true); // Mở modal xác nhận
  };

  const handleClose = () => {
    setOpen(false); // Đóng modal
    setSelectedId(null); // Xóa trạng thái id đã chọn
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      mutationDelete.mutate(selectedId);
    }
  };

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Thao tác',
    width: 200,
    renderCell: (params) => (
      <div className='action'>
        <Link to={`/${props.slug}/${params.row.id}`}>
          <img src='/view.svg' alt='view' />
        </Link>
        <div className='delete' onClick={() => handleOpen(params.row.id)}>
          <img src='/delete.svg' alt='delete' />
        </div>
      </div>
    ),
  };

  return (
    <div className='dataTable'>
      <DataGrid
        className='dataGrid'
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        getRowId={props.getRowId}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />

      {/* Modal Xác Nhận Xóa */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>Bạn có chắc chắn muốn xóa sản phẩm này không?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color='primary' autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
