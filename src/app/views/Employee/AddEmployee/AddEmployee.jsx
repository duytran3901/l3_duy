import React, { useState } from "react";
import { Grid, Button, IconButton, Input, InputAdornment } from '@material-ui/core';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Notifications as NotificationsIcon,
    Description as DescriptionIcon,
} from "@material-ui/icons";
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import { Breadcrumb, ConfirmationDialog } from 'egret';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EMPLOYEE } from "../../../redux/actions/actions";
import CustomTable from "../../components/Custom/CustomTable";
import { CustomColumnsEmployee } from "../../components/Custom/CustomColumns";
import { ACTION_EMPLOYEE, EMPLOYEE_STATUS } from "app/constants/constants";
import AddEmployeeDialog from '../../components/Dialog/AddEmployeeDialog';
import RegisterEmployeeDialog from "app/views/components/Dialog/RegisterEmployeeDialog";
import NotificationDialog from "app/views/components/Dialog/NotificationDialog";
import { toast } from "react-toastify";

const AddEmployee = () => {
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(0);
    const [isConfirmDeleteEmployeeOpen, setIsConfirmDeleteEmployeeOpen] = useState(false);
    const [isEditEmployeeDialogOpen, setIsEditEmployeeDialogOpen] = useState(false);
    const [isRegisterEmployeeDialogOpen, setIsRegisterEmployeeDialogOpen] = useState(false);
    const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
    const [employeeSelected, setEmployeeSelected] = useState({});
    const [searchKeyword, setSearchKeyword] = useState('');
    const [action, setAction] = useState('');
    const dispatch = useDispatch();
    const { employees, totalElements, reload } = useSelector((state) => state.employee);
    const dataTable = employees?.map((employee) => ({ ...employee }));

    const reloadTable = () => {
        const objectPage = {
            keyword: searchKeyword,
            pageIndex: page + 1,
            pageSize: pageSize,
            listStatus: EMPLOYEE_STATUS.ADD,
        };
        dispatch({ type: EMPLOYEE.SEARCH_EMPLOYEE, payload: objectPage });
    }

    useEffect(() => {
        if (searchKeyword.length <= 255) {
            reloadTable();
        } else {
            toast.error('Nội dung tìm kiếm vượt quá 255 ký tự!')
        }
    }, [searchKeyword, pageSize, page, reload]);

    const handleOpenDialogEdit = (rowData) => {
        if (rowData) {
            setEmployeeSelected(rowData);
        } else {
            setEmployeeSelected({});
        }
        setIsEditEmployeeDialogOpen(true);
        setAction('register')
    }

    const handleOpenDialogView = (rowData) => {
        setEmployeeSelected(rowData);
        setIsRegisterEmployeeDialogOpen(true);
        setAction('view');
    }

    const handleClickDelete = (rowData) => {
        setEmployeeSelected(rowData);
        setIsConfirmDeleteEmployeeOpen(true);
    }

    const handleDeleteEmployee = (id) => {
        dispatch({ type: EMPLOYEE.DELETE_EMPLOYEE, payload: id });
        setIsConfirmDeleteEmployeeOpen(false);
        setEmployeeSelected({});
    }

    const handleOpenDialogNotification = (rowData) => {
        setEmployeeSelected(rowData);
        setIsNotificationDialogOpen(true);
    }

    const actions = ({ rowData }) => {
        return (
            <div>
                {ACTION_EMPLOYEE.EDIT.includes(Number(rowData?.submitProfileStatus)) && (
                    <IconButton size="small" onClick={() => handleOpenDialogEdit(rowData)}>
                        <EditIcon color="primary" fontSize="small" />
                    </IconButton>
                )}
                {ACTION_EMPLOYEE.DELETE.includes(Number(rowData?.submitProfileStatus)) && (
                    <IconButton size="small" onClick={() => handleClickDelete(rowData)}>
                        <DeleteIcon className="text-error" fontSize="small" />
                    </IconButton>
                )}
                {ACTION_EMPLOYEE.VIEW.includes(Number(rowData?.submitProfileStatus)) && (
                    <IconButton size="small" onClick={() => handleOpenDialogView(rowData)}>
                        <VisibilityIcon color="secondary" fontSize="small" />
                    </IconButton>
                )}
                {ACTION_EMPLOYEE.PENDING_END.includes(Number(rowData?.submitProfileStatus)) && (
                    <IconButton size="small" onClick={() => handleOpenDialogView(rowData)}>
                        <DescriptionIcon color="primary" fontSize="small" />
                    </IconButton>
                )}
                {ACTION_EMPLOYEE.REQUEST.includes(Number(rowData.submitProfileStatus)) && (
                    <IconButton size="small" onClick={() => handleOpenDialogNotification(rowData)}>
                        <NotificationsIcon color="secondary" fontSize="small" />
                    </IconButton>
                )}
                {ACTION_EMPLOYEE.REJECT.includes(Number(rowData.submitProfileStatus)) && (
                    <IconButton size="small" onClick={() => handleOpenDialogNotification(rowData)}>
                        <NotificationsIcon color="secondary" fontSize="small" />
                    </IconButton>
                )}
            </div>
        );
    };

    const columns = CustomColumnsEmployee({ Action: actions, page, pageSize })

    return (
        <div className="mx-30 mt-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[{ name: "Thêm nhân viên mới" }]}
                />
            </div>
            <Grid container spacing={2} justifyContent="space-between">
                <Grid item lg={5} md={5} sm={5} xs={12}>
                    <Button
                        variant="contained"
                        className="mb-4 mr-16 align-bottom"
                        color="primary"
                        onClick={() => handleOpenDialogEdit()}
                    >
                        Thêm nhân viên mới
                    </Button>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
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
                        height='calc(100vh - 326px)'
                    />
                </Grid>
            </Grid>
            {isEditEmployeeDialogOpen && (
                <AddEmployeeDialog
                    open={isEditEmployeeDialogOpen}
                    setOpen={setIsEditEmployeeDialogOpen}
                    employee={employeeSelected}
                    setEmployee={setEmployeeSelected}
                    action={action}
                />
            )}
            {isConfirmDeleteEmployeeOpen && (
                <ConfirmationDialog
                    title='Bạn có chắc chắn muốn xóa nhân viên này không?'
                    open={isConfirmDeleteEmployeeOpen}
                    onConfirmDialogClose={() => setIsConfirmDeleteEmployeeOpen(false)}
                    onYesClick={() => handleDeleteEmployee(employeeSelected.id)}
                    Yes='Xác nhận'
                    No='Hủy'
                />
            )}
            {isRegisterEmployeeDialogOpen && (
                <RegisterEmployeeDialog
                    open={isRegisterEmployeeDialogOpen}
                    setOpen={setIsRegisterEmployeeDialogOpen}
                    idEmployee={employeeSelected.id}
                    action={action}
                />
            )}
            {isNotificationDialogOpen && (
                <NotificationDialog
                    open={isNotificationDialogOpen}
                    setOpen={setIsNotificationDialogOpen}
                    data={employeeSelected}
                    type='employee'
                />
            )}
        </div>
    )
}

export default AddEmployee;