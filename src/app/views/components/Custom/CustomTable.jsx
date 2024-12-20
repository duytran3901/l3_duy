import MaterialTable, { MTableToolbar } from 'material-table';
import { TablePagination } from "@material-ui/core";
import React from 'react';

const CustomTable = (props) => {
  const {
    data,
    columns,
    total,
    pageSize,
    page,
    setPageSize,
    setPage,
    rowsPerPageOptions,
    height
  } = props;
  return (
    <>
      <MaterialTable
        data={data}
        columns={columns}
        components={{
          Toolbar: (props) => <MTableToolbar {...props} />,
        }}
        options={{
          actionsColumnIndex: -1,
          search: true,
          rowStyle: (rowData, index) => ({
            backgroundColor: (index % 2 === 1) ? '#EEE' : '#FFF',
          }),
          maxBodyHeight: height,
          headerStyle: {
            backgroundColor: '#7467ef',
            color: "#fff",
            border: "1px solid #e6e6e6",
            textAlign: "center",
            padding: "8px 12px",
            height: "46px"
          },
          cellStyle: {
            padding: "8px 12px",
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            border: "1px solid #e6e6e6",
            height: "46px"
          },
          padding: 'dense',
          toolbar: false,
          paging: false,
          sorting: false
        }}
        localization={{
          body: {
            emptyDataSourceMessage: 'Không có nội dung để hiển thị',
          }
        }}
      />
      <TablePagination
        align="left"
        className="px-16 w-100"
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        labelRowsPerPage="Số hàng mỗi trang:"
        labelDisplayedRows={({ from, to, count }) => {
          if (from > to) setPage(page - 1);
          return `${from}-${to} trong ${count}`
        }
        }
        count={total}
        rowsPerPage={pageSize}
        page={page}
        backIconButtonProps={{
          "aria-label": "Trang trước",
        }}
        nextIconButtonProps={{
          "aria-label": "Trang sau",
        }}
        onPageChange={(event, newPage) => {
          setPage(newPage);
        }}
        onRowsPerPageChange={(event) => {
          setPageSize(event?.target?.value);
          setPage(0);
        }}
      />
    </>
  );
};

export default CustomTable;