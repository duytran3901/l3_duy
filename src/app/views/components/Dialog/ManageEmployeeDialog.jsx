import React from "react";
import {
    Grid,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    makeStyles,
} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import '../../../../styles/views/_style.scss';
import '../../../../styles/utilities/_positionings.scss';
import { CustomTab } from "app/views/components/Custom/CustomTabs";
import { resetEmployeeId } from "app/redux/reducers/EmployeeReducer";
import { useDispatch } from "react-redux";
import RegisterEmployeeDialog from "app/views/components/Dialog/RegisterEmployeeDialog";
import moment from "moment";
import { GENDER } from "app/constants/constants";
import TabSalaryIncrease from "app/views/Tabs/TabsManageEmployee/TabSalaryIncrease";
import TabProposal from "app/views/Tabs/TabsManageEmployee/TabProposal";
import TabProcess from "app/views/Tabs/TabsManageEmployee/TabProcess";

toast.configure({
    autoClose: 3000,
    draggable: false,
    limit: 3
});

const useStyles = makeStyles({
    largeAvatar: {
        width: 140,
        height: 140,
    },
});

const ManageEmployeeDialog = (props) => {
    const classes = useStyles();
    const { open, setOpen, employee, setEmployee, action } = props;
    const [id, setId] = useState(employee.id || 0);
    const [isRegisterEmployeeDialogOpen, setIsRegisterEmployeeDialogOpen] = useState(false);
    const dispatch = useDispatch();

    console.log('id: ', id);

    const handleCloseDialog = () => {
        setOpen(false);
    }

    const handleClickView = () => {
        setIsRegisterEmployeeDialogOpen(true);
    }

    const tabs = [
        {
            label: "Tăng lương",
            a11yPropsIndex: 0,
            content: <TabSalaryIncrease employee={employee} />
        },
        {
            label: "Thăng chức",
            a11yPropsIndex: 1,
            content: <TabProcess employee={employee} />
        },
        {
            label: "Đề xuất",
            a11yPropsIndex: 2,
            content: <TabProposal employee={employee} />
        }
    ]

    return (
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            maxWidth="lg"
            fullWidth={true}
        >
            <DialogTitle className="mt-10">
                <span className="h3 text-green font-weight-bold">
                    Cập nhật nhân viên
                </span>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3} className="text-center">
                            <Avatar
                                alt="avatar"
                                src={
                                    employee?.image
                                        ? employee?.image
                                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht9-qZYmqErdGMhJVbRf7BfhLRGspNWaFnR8nddu3x7Da7nqh23vsG6VWtG_VE9G9kLU&usqp=CAU"
                                }
                                className={`m-auto ${classes.largeAvatar}`}
                            />
                        </Grid>
                        <Grid item xs={12} md={9} className="mt-20">
                            <Grid container spacing={2}>
                                <Grid item lg={4} md={4} sm={12} xs={12} className="mb-14">
                                    <TextField
                                        disabled
                                        className="w-100"
                                        size="small"
                                        label={<span className="font">Tên nhân viên</span>}
                                        variant="outlined"
                                        value={employee.name}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} className="mb-14">
                                    <TextField
                                        disabled
                                        className="w-100 p-2"
                                        label={<span className="font">Mã nhân viên</span>}
                                        size="small"
                                        variant="outlined"
                                        value={employee.code}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} className="mb-14">
                                    <TextField
                                        disabled
                                        className="w-100"
                                        size="small"
                                        label={<span className="font">Ngày sinh</span>}
                                        variant="outlined"
                                        value={employee?.dateOfBirth ? moment(employee?.dateOfBirth).format("DD/MM/YYYY") : ""}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} className="mb-14">
                                    <TextField
                                        disabled
                                        className="w-100 p-2"
                                        label={<span className="font">Giới tính</span>}
                                        size="small"
                                        variant="outlined"
                                        value={GENDER.find((gender) => gender.id === employee?.gender)?.name || ""
                                        }
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} className="mb-14">
                                    <TextField
                                        disabled
                                        className="w-100"
                                        size="small"
                                        label={<span className="font">Số điện thoại</span>}
                                        variant="outlined"
                                        value={employee.phone}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} className="mb-14">
                                    <TextField
                                        disabled
                                        className="w-100"
                                        label={<span className="font">Email</span>}
                                        size="small"
                                        variant="outlined"
                                        value={employee.email}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className="mt-20">
                        <CustomTab tabs={tabs}></CustomTab>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className="my-12 flex-center">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseDialog}
                    className="mr-12"
                >
                    Đóng
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    // onClick={handleLeaderClickReject}
                    className="mr-12"
                >
                    Kết thúc
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickView}
                    className="mr-12"
                >
                    Xem hồ sơ
                </Button>
            </DialogActions>
            {isRegisterEmployeeDialogOpen && (
                <RegisterEmployeeDialog
                    open={isRegisterEmployeeDialogOpen}
                    setOpen={setIsRegisterEmployeeDialogOpen}
                    idEmployee={employee.id}
                    action='view'
                />
            )}
        </Dialog>
    )
}

export default ManageEmployeeDialog;