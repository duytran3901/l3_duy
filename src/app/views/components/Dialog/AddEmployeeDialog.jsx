import React, { useEffect } from "react";
import {
    Grid,
    Dialog,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import '../../../../styles/views/_style.scss';
import '../../../../styles/utilities/_positionings.scss';
import { CustomTab } from "app/views/components/Custom/CustomTabs";
import TabEmployee from "app/views/Tabs/TabsAddEmployee/TabEmployee";
import TabCertificate from "app/views/Tabs/TabsAddEmployee/TabCertificate";
import TabFamily from "app/views/Tabs/TabsAddEmployee/TabFamily";
import { useDispatch } from "react-redux";
import RegisterEmployeeDialog from "app/views/components/Dialog/RegisterEmployeeDialog";
import { EMPLOYEE } from "app/redux/actions/actions";
import { resetEmployee } from "app/redux/reducers/EmployeeReducer";

toast.configure({
    autoClose: 3000,
    draggable: false,
    limit: 3
});

const AddEmployeeDialog = (props) => {
    const { open, setOpen, employee, setEmployee, action } = props;
    const [isRegisterEmployeeDialogOpen, setIsRegisterEmployeeDialogOpen] = useState(false);
    const dispatch = useDispatch();

    const handleCloseDialog = () => {
        setOpen(false);
    }

    useEffect(() => {
        dispatch(resetEmployee());
      }, [open])

    const handleRegisterEmployee = () => {
        if (employee?.id) {
            dispatch({
                type: EMPLOYEE.UPDATE_EMPLOYEE,
                payload: {
                    id: employee?.id,
                    data: employee
                }
            })
        }
        setIsRegisterEmployeeDialogOpen(true);
    }

    const tabs = [
        {
            label: "Thông tin nhân viên",
            a11yPropsIndex: 0,
            content: <TabEmployee
                employee={employee}
                setOpen={setOpen}
                setEmployee={setEmployee}
                handleRegisterEmployee={handleRegisterEmployee}
            />
        },
        {
            label: "Thông tin văn bằng",
            a11yPropsIndex: 1,
            disabled: employee?.id ? false : true,
            content: <TabCertificate
                employee={employee}
                idEmployee={employee ? employee?.id : 0}
                setOpen={setOpen}
                handleRegisterEmployee={handleRegisterEmployee}
            />
        },
        {
            label: "Thông tin gia đình",
            a11yPropsIndex: 2,
            disabled: employee?.id ? false : true,
            content: <TabFamily
                employee={employee}
                idEmployee={employee ? employee?.id : 0}
                setOpen={setOpen}
                handleRegisterEmployee={handleRegisterEmployee}
            />
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
                <span className="h3 font-weight-bold text-primary">
                    {(!employee?.id ? "Thêm nhân viên" : "Sửa thông tin nhân viên")}
                </span>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container>
                    <Grid item lg={12}>
                        <CustomTab tabs={tabs}></CustomTab>
                    </Grid>
                </Grid>
            </DialogContent>
            {isRegisterEmployeeDialogOpen && (
                <RegisterEmployeeDialog
                    open={isRegisterEmployeeDialogOpen}
                    setOpen={setIsRegisterEmployeeDialogOpen}
                    setOpenEditDialog={setOpen}
                    idEmployee={employee?.id}
                    action={action}
                />
            )}
        </Dialog>
    )
}

export default AddEmployeeDialog;