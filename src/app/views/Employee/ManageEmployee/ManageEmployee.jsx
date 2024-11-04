import React, { useState } from "react";
import { Grid, Button, IconButton } from '@material-ui/core';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    Notifications as NotificationsIcon,
} from "@material-ui/icons";
import { Breadcrumb, ConfirmationDialog } from 'egret';
import AddEmployeeDialog from './ManageEmployeeDialog';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EMPLOYEE } from "../../../redux/actions/actions";
import CustomTable from "../../components/Custom/CustomTable";
import { CustomColumnsEmployee } from "../../components/Custom/CustomColumns";
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
                    <IconButton size="small" onClick={() => handleEdit(rowData)}>
                        <EditIcon color="primary" fontSize="small" />
                    </IconButton>
                )}
                {ACTION_EMPLOYEE.DELETE.includes(Number(rowData?.submitProfileStatus)) && (
                    <IconButton size="small" onClick={() => handleOpenDialog(rowData)}>
                        <DeleteIcon
                            className="text-error"
                            fontSize="small"
                        //   onClick={() => handleDelete(item)}
                        />
                    </IconButton>
                )}
                {ACTION_EMPLOYEE.VIEW.includes(Number(rowData?.submitProfileStatus)) && (
                    <IconButton size="small" onClick={() => handleOpenDialog(rowData)}>
                        <VisibilityIcon
                            color="secondary"
                            fontSize="small"
                        //   onClick={() => handleOpenRegisterDialog(item)}
                        />
                    </IconButton>
                )}
                {ACTION_EMPLOYEE.REQUEST.includes(Number(rowData.submitProfileStatus)) && (
                    <IconButton size="small">
                        <NotificationsIcon
                            color="secondary"
                            fontSize="small"
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
                    routeSegments={[{ name: "Quản lý nhân viên" }]}
                />
            </div>
            <Grid container spacing={2} justifyContent="space-between">
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
                        height='calc(100vh - 296px)'
                    />
                </Grid>
            </Grid>
            {isEditEmployeeDialogOpen && (
                <AddEmployeeDialog
                    open={isEditEmployeeDialogOpen}
                    setOpen={setIsEditEmployeeDialogOpen}
                    employee={employeeSelected}
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