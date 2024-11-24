import React from "react";
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
import { resetEmployeeId } from "app/redux/reducers/EmployeeReducer";
import { useDispatch } from "react-redux";
import RegisterEmployeeDialog from "app/views/components/Dialog/RegisterEmployeeDialog";

toast.configure({
    autoClose: 3000,
    draggable: false,
    limit: 3
});

const EditEmployeeDialog = (props) => {
    const { open, setOpen, employee, setEmployee, action } = props;
    const [id, setId] = useState(employee.id || 0);
    const [isRegisterEmployeeDialogOpen, setIsRegisterEmployeeDialogOpen] = useState(false);
    const dispatch = useDispatch();

    console.log('id: ', id);
    console.log('employee: ', employee);


    const handleCloseDialog = () => {
        setOpen(false);
        dispatch(resetEmployeeId());
    }

    const handleRegisterEmployee = () => {
        console.log('click dang ki!');
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
                id={id}
                setId={setId}
                handleRegisterEmployee={handleRegisterEmployee}
            />
        },
        {
            label: "Thông tin văn bằng",
            a11yPropsIndex: 1,
            disabled: id ? false : true,
            content: <TabCertificate
                idEmployee={employee ? id : 0}
                setOpen={setOpen}
                handleRegisterEmployee={handleRegisterEmployee}
            />
        },
        {
            label: "Thông tin gia đình",
            a11yPropsIndex: 2,
            disabled: id ? false : true,
            content: <TabFamily
                idEmployee={employee ? id : 0}
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
                <span className="h3 text-green font-weight-bold">
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
                    idEmployee={id}
                    action={action}
                />
            )}
        </Dialog>
    )
}

export default EditEmployeeDialog;