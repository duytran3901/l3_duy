import React, { useState } from "react";
import { Grid, IconButton, Input, InputAdornment } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  Description as DescriptionIcon
} from "@material-ui/icons";
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EMPLOYEE } from "../../../redux/actions/actions";
import CustomTable from "../../components/Custom/CustomTable";
import { CustomColumnsEmployee } from "../../components/Custom/CustomColumns";
import { ACTION_EMPLOYEE, EMPLOYEE_STATUS } from "app/constants/constants";
import RegisterEmployeeDialog from "app/views/components/Dialog/RegisterEmployeeDialog";
import FormResignation from "app/views/components/Form/FormResignation";
import { toast } from "react-toastify";

const TabPending = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [isRegisterEmployeeDialogOpen, setIsRegisterEmployeeDialogOpen] = useState(false);
  const [isResignationFormOpen, setIsResignationFormOpen] = useState(false);
  const [employeeSelected, setEmployeeSelected] = useState({});
  const [searchKeyword, setSearchKeyword] = useState('');
  const [action, setAction] = useState('');
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const reload = useSelector((state) => state.employee.reload);
  const totalElements = useSelector((state) => state.employee.totalElements);
  const dataTable = employees?.map((employee) => ({ ...employee }));

  const reloadTable = () => {
    const objectPage = {
      keyword: searchKeyword,
      pageIndex: page + 1,
      pageSize: pageSize,
      listStatus: EMPLOYEE_STATUS.PENDING,
    };
    dispatch({ type: EMPLOYEE.SEARCH_EMPLOYEE, payload: objectPage });
  }

  useEffect(() => {
    if (searchKeyword.length <= 255) {
      reloadTable();
  } else {
      toast.error('Nội dung tìm kiếm vượt quá 255 ký tự!')
  }
  }, [searchKeyword, pageSize, page, totalElements, reload]);

  const handleOpenDialogPending = (rowData) => {
    setIsRegisterEmployeeDialogOpen(true);
    setEmployeeSelected(rowData);
    setAction('leaderProcess');
  }

  const handleOpenDialogPendingEnd = (rowData) => {
    setIsResignationFormOpen(true);
    setEmployeeSelected(rowData);
    setAction('leaderProcess');
  }

  const handleOpenDialogView = (rowData) => {
    setIsRegisterEmployeeDialogOpen(true);
    setEmployeeSelected(rowData);
    setAction('view');
  }

  const actions = ({ rowData }) => {
    return (
      <div>
        {ACTION_EMPLOYEE.PENDING.includes(Number(rowData?.submitProfileStatus)) && (
          <IconButton size="small" onClick={() => handleOpenDialogPending(rowData)}>
            <DescriptionIcon color="primary" fontSize="small" />
          </IconButton>
        )}
        {ACTION_EMPLOYEE.PENDING_END.includes(Number(rowData?.submitProfileStatus)) && (
          <IconButton size="small" onClick={() => handleOpenDialogPendingEnd(rowData)}>
            <DescriptionIcon color="primary" fontSize="small" />
          </IconButton>
        )}
        {ACTION_EMPLOYEE.PENDING_END.includes(Number(rowData?.submitProfileStatus)) && (
          <IconButton size="small" onClick={() => handleOpenDialogView(rowData)}>
            <VisibilityIcon color="secondary" fontSize="small" />
          </IconButton>
        )}
      </div>
    );
  };
  const columns = CustomColumnsEmployee({ Action: actions, page, pageSize });

  return (
    <div>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item lg={2} md={3} sm={3} xs={12}>
          <Input
            type="text"
            name="keyword"
            onChange={(e) => {
              setSearchKeyword(e.target.value.toLowerCase());
              setPage(0);
            }}
            className="w-100 mb-4 mr-10"
            id="search_box"
            placeholder='Nhập từ khóa tìm kiếm'
            startAdornment={
              <InputAdornment >
                <Link to="#">
                  <SearchIcon />
                </Link>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTable
            data={dataTable}
            columns={columns}
            total={totalElements}
            pageSize={pageSize}
            page={page}
            setPageSize={setPageSize}
            setPage={setPage}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            height='calc(100vh - 356px)'
          />
        </Grid>
      </Grid>
      {isRegisterEmployeeDialogOpen && (
        <RegisterEmployeeDialog
          open={isRegisterEmployeeDialogOpen}
          setOpen={setIsRegisterEmployeeDialogOpen}
          idEmployee={employeeSelected.id}
          action={action}
        />
      )}
      {isResignationFormOpen && (
        <FormResignation
          open={isResignationFormOpen}
          setOpen={setIsResignationFormOpen}
          employee={employeeSelected}
          action={action}
        />
      )}
    </div>
  );
};

export default TabPending;