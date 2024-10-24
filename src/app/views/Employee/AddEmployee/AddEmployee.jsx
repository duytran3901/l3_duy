import React, { useState } from "react";
import { Grid, Button, IconButton, Input, InputAdornment } from '@material-ui/core';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Notifications as NotificationsIcon,
} from "@material-ui/icons";
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import { Breadcrumb, ConfirmationDialog } from 'egret';
import AddEmployeeDialog from './AddEmployeeDialog';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EMPLOYEE } from "../../../redux/actions/actions";
import CustomTable from "../../components/CustomTable";
import { CustomColumnsEmployee } from "app/views/components/CustomColumns";
import { ACTION_EMPLOYEE } from "app/constants/constants";

const Employee = () => {
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(0);
    const [isConfirmDeleteEmployeeOpen, setIsConfirmDeleteEmployeeOpen] = useState(false);
    const [isEditEmployeeDialogOpen, setIsEditEmployeeDialogOpen] = useState(false);
    const [employeeSelected, setEmployeeSelected] = useState({});
    const [searchKeyword, setSearchKeyword] = useState('');
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employee.employees);
    const totalEmployees = useSelector((state) => state.employee.totalElements);
    const reload = useSelector((state) => state.employee.reload);
    const dataTable = employees?.map((employee) => ({ ...employee }));

    const reloadTable = () => {
        const objectPage = {
            keyword: searchKeyword,
            pageIndex: page + 1,
            pageSize: pageSize,
            listStatus: '1,2,4,5',
        };
        dispatch({ type: EMPLOYEE.SEARCH_EMPLOYEE, payload: objectPage });
    }

    useEffect(() => {
        reloadTable();
    }, [searchKeyword, pageSize, page, reload]);

    const handleOpenDialog = (rowData) => {
        if (rowData) {
            setEmployeeSelected(rowData);
        } else {
            setEmployeeSelected({});
        }
        setIsEditEmployeeDialogOpen(true);
    }

    const handleClickDelete = (rowData) => {
        setIsConfirmDeleteEmployeeOpen(true);
        setEmployeeSelected(rowData);
    }

    const handleDeleteEmployee = (id) => {
        dispatch({ type: EMPLOYEE.DELETE_EMPLOYEE, payload: id })
        setIsConfirmDeleteEmployeeOpen(false);
        setEmployeeSelected({});
    }

    const handleEdit = () => {
        console.log(123);

    }

    const action = ({ rowData }) => {
        return (
            <div>
                {ACTION_EMPLOYEE.EDIT.includes(Number(rowData?.submitProfileStatus)) && (
                    <IconButton size="small" onClick={() => handleOpenDialog(rowData)}>
                        <EditIcon color="primary" fontSize="small" />
                    </IconButton>
                )}
                {ACTION_EMPLOYEE.DELETE.includes(Number(rowData?.submitProfileStatus)) && (
                    <IconButton size="small" onClick={() => handleClickDelete(rowData)}>
                        <DeleteIcon className="text-error" fontSize="small" />
                    </IconButton>
                )}
                {ACTION_EMPLOYEE.VIEW.includes(Number(rowData?.submitProfileStatus)) && (
                    <IconButton size="small" onClick={() => handleOpenDialog(rowData)}>
                        <VisibilityIcon color="secondary" fontSize="small"
                        //   onClick={() => handleOpenRegisterDialog(item)}
                        />
                    </IconButton>
                )}
                {ACTION_EMPLOYEE.REQUEST.includes(Number(rowData.submitProfileStatus)) && (
                    <IconButton size="small">
                        <NotificationsIcon color="secondary" fontSize="small"
                        // onClick={() => handleOpenRequestDialog(rowData)}
                        />
                    </IconButton>
                )}
                {ACTION_EMPLOYEE.REJECT.includes(Number(rowData.submitProfileStatus)) && (
                    <IconButton size="small">
                        <NotificationsIcon
                            color="secondary"
                            fontSize="small"
                        // onClick={() => handleOpenRejectDialog(rowData)}
                        />
                    </IconButton>
                )}
            </div>
        );
    };

    const columns = CustomColumnsEmployee({ Action: action, page, pageSize })

    return (
        <div className="m-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[{ name: "Thêm nhân viên mới" }]}
                />
            </div>
            <Grid container spacing={2} justifyContent="space-between">
                <Grid item lg={5} md={5} sm={5} xs={12}>
                    <Button
                        variant="contained"
                        className="mb-8 mr-16 align-bottom"
                        color="primary"
                        onClick={() => handleOpenDialog({})}
                    >
                        Thêm nhân viên mới
                    </Button>
                </Grid>
                <Grid item lg={2} md={3} sm={3} xs={12}>
                    <Input
                        type="text"
                        name="keyword"
                        onChange={(e) => {
                            setSearchKeyword(e.target.value.toLowerCase());
                            setPage(0);
                        }}
                        className="w-100 mb-8 mr-10"
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
                        total={totalEmployees}
                        pageSize={pageSize}
                        page={page}
                        setPageSize={setPageSize}
                        setPage={setPage}
                        rowsPerPageOptions={[5, 10, 20, 50, 100]}
                        height='calc(100vh - 356px)'
                    />
                </Grid>
            </Grid>
            {isEditEmployeeDialogOpen && (
                <AddEmployeeDialog
                    open={isEditEmployeeDialogOpen}
                    setOpen={setIsEditEmployeeDialogOpen}
                    employee={employeeSelected}
                    setEmployee={setEmployeeSelected}
                    renderActions={action}
                />
            )}
            {isConfirmDeleteEmployeeOpen && (
                <ConfirmationDialog
                    title='Bạn có chắc chắn muốn xóa nhân viên này không?'
                    open={isConfirmDeleteEmployeeOpen}
                    onConfirmDialogClose={() => setIsConfirmDeleteEmployeeOpen(false)}
                    onYesClick={() => handleDeleteEmployee(employeeSelected.id)}
                    Yes='Có'
                    No='Không'
                />
            )}
        </div>
    )
}

export default Employee;