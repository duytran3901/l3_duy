import React from "react";
import {
    Grid,
    DialogActions,
    Button,
    Dialog,
    MenuItem,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { DialogContent, DialogTitle } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import '../../../../styles/views/_style.scss';
import '../../../../styles/utilities/_positionings.scss';
import { useDispatch, useSelector } from "react-redux";
import { DISTRICT, EMPLOYEE, PROVINCE } from "app/redux/actions/actions";
import { IconButton, Icon } from '@material-ui/core';
import MaterialTable from 'material-table'
// import CertificateDialog from "../Certificate/CertificateDialog";
import { ConfirmationDialog } from 'egret';
import { CustomTab } from "app/views/components/Custom/CustomTabs";

toast.configure({
    autoClose: 3000,
    draggable: false,
    limit: 3
});

const AddEmployeeDialog = (props) => {
    const { open, setOpen, employee } = props;
    const [employeeNew, setEmployeeNew] = useState(employee || '');
    // const provinces = useSelector(state => state.province.provinces);
    // const districts = useSelector(state => state.province.districts);
    // const wards = useSelector(state => state.district.wards);
    const dispatch = useDispatch();
    // const certificates = employee?.certificates;
    // const [isConfirmDeleteCertificateOpen, setIsConfirmDeleteCertificateOpen] = useState(false);
    // const [isEditCertificateDialogOpen, setIsEditCertificateDialogOpen] = useState(false);
    // const [certificateSelected, setCertificateSelected] = useState({});

    const handleCloseDialog = () => {
        setOpen(false);
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setEmployeeNew({
            ...employeeNew,
            [name]: value
        })
    };

    const handleBlurInput = (e) => {
        const { name, value } = e.target;
        const inputValue = value.trim();
        setEmployeeNew({
            ...employeeNew,
            [name]: inputValue
        })
    };

    const handleSubmitForm = () => {
        if (employee.id) {
            dispatch({ type: EMPLOYEE.UPDATE_EMPLOYEE, payload: { id: employee.id, data: employeeNew } })
        } else {
            dispatch({ type: EMPLOYEE.CREATE_EMPLOYEE, payload: employeeNew });
        }
        setOpen(false);
    };

    const handleChangeAddress = (e) => {
        const typeSelect = e.target.name;
        const valueSelect = e.target.value;
        if (typeSelect === 'province') {
            setEmployeeNew({
                ...employeeNew,
                provinceId: valueSelect,
                districtId: '',
                wardsId: ''
            });
        } else if (typeSelect === 'district') {
            setEmployeeNew({
                ...employeeNew,
                districtId: valueSelect,
                wardsId: ''
            });
        } else {
            setEmployeeNew({
                ...employeeNew,
                wardsId: valueSelect
            });
        }
    };

    // const handleOpenDialog = (rowData) => {
    //     if (rowData) {
    //         // setCertificateSelected(rowData);
    //     } else {
    //         setCertificateSelected({});
    //     }
    //     setIsEditCertificateDialogOpen(true);
    // }

    // const handleClickDelete = (rowData) => {
    //     setIsConfirmDeleteCertificateOpen(true);
    //     setCertificateSelected(rowData);
    // }

    // const handleDeleteCertificate = (id) => {
    //     const certificates = certificatesState?.filter(c => c.id !== id);
    //     toast.success('Xoá chứng chỉ thành công!');
    //     setCertificatesState(certificates);
    //     setIsConfirmDeleteCertificateOpen(false);
    //     setCertificateSelected({});
    // }

    // const getProvinceName = (provinceId) => {
    //     const province = provinces.find(p => p.id === provinceId);
    //     return province ? province.name : 'Không xác định';
    // };

    useEffect(() => {
        // dispatch({ type: PROVINCE.GET_PROVINCES });
    }, [dispatch]);

    // useEffect(() => {
    //     setEmployeeNew({
    //         ...employeeNew,
    //         certificates: certificatesState
    //     })
    // }, [certificatesState]);

    // useEffect(() => {
    //     if (employeeNew.provinceId) {
    //         dispatch({ type: PROVINCE.GET_DISTRICTS, payload: employeeNew.provinceId });
    //     }
    //     if (employeeNew.districtId) {
    //         dispatch({ type: DISTRICT.GET_WARDS, payload: employeeNew.districtId });
    //     }
    // }, [dispatch, employeeNew.provinceId, employeeNew.districtId]);
    const tabs = [
        { label: "Thông tin nhân viên", a11yPropsIndex: 0, content: "tab 1" },
        { label: "Thông tin văn bằng", a11yPropsIndex: 1, content: "tab 2" },
        { label: "Thông tin gia đình", a11yPropsIndex: 2, content: "tab 3" }
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
            {/* <ValidatorForm onSubmit={handleSubmitForm}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextValidator
                                className="w-100"
                                label={
                                    <span className="font">
                                        <span className="span-required"> * </span>
                                        Mã nhân viên
                                    </span>
                                }
                                onChange={e => handleChangeInput(e)}
                                onBlur={e => handleBlurInput(e)}
                                type="text"
                                size="small"
                                name="code"
                                variant="outlined"
                                value={employeeNew.code}
                                placeholder="Mã nhân viên"
                                validators={[
                                    "required",
                                    "matchRegexp:(?!\\s)([a-zA-Z0-9]{6,10})+$",
                                ]}
                                errorMessages={[
                                    "Trường này bắt buộc nhập",
                                    "Mã nhân viên sai định dạng (6-10 ký tự, không chứa dấu cách và các ký tự đặc biệt)"
                                ]}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextValidator
                                className="w-100"
                                size="small"
                                label={
                                    <span className="font">
                                        <span className="span-required"> * </span>
                                        Tên nhân viên
                                    </span>
                                }
                                variant="outlined"
                                onChange={e => handleChangeInput(e)}
                                onBlur={e => handleBlurInput(e)}
                                type="text"
                                name="name"
                                value={employeeNew.name}
                                placeholder="Tên nhân viên"
                                validators={[
                                    "required",
                                    "matchRegexp:^[^0-9!@#\$%\^\&*\)\(+=._-]+$"
                                ]}
                                errorMessages={[
                                    "Trường này bắt buộc nhập",
                                    "Tên chỉ chứa chữ cái"
                                ]}
                            />
                        </Grid>
                        <Grid item lg={4} md={6} sm={12} xs={12}>
                            <TextValidator
                                className="w-100"
                                label={
                                    <span className="font">
                                        <span className="span-required"> * </span>
                                        Tuổi
                                    </span>
                                }
                                onChange={e => handleChangeInput(e)}
                                onBlur={e => handleBlurInput(e)}
                                type="number"
                                name="age"
                                size="small"
                                variant="outlined"
                                value={employeeNew.age}
                                placeholder='Tuổi'
                                validators={[
                                    "required",
                                    "matchRegexp:^(1[9]|[2-5]\\d|59)$",
                                ]}
                                errorMessages={[
                                    "Trường này bắt buộc nhập",
                                    "Tuổi nhân viên lớn hơn 18 và nhỏ hơn 60"
                                ]}
                            />
                        </Grid>
                        <Grid item lg={4} md={6} sm={12} xs={12}>
                            <TextValidator
                                className="w-100"
                                label={
                                    <span className="font">
                                        <span className="span-required"> * </span>
                                        Số điện thoại
                                    </span>
                                }
                                onChange={e => handleChangeInput(e)}
                                onBlur={e => handleBlurInput(e)}
                                type="text"
                                name="phone"
                                size="small"
                                variant="outlined"
                                value={employeeNew.phone}
                                placeholder="Số điện thoại"
                                validators={[
                                    "required",
                                    "matchRegexp:^(0[3|5|7|8|9])([0-9]{8})+$"
                                ]}
                                errorMessages={[
                                    "Trường này bắt buộc nhập",
                                    "Số điện thoại sai định dạnh (10 số)"
                                ]}
                            />
                        </Grid>
                        <Grid item sm={12} xs={12} lg={4}>
                            <TextValidator
                                className="w-100"
                                label={
                                    <span className="font">
                                        <span className="span-required"> * </span>
                                        Email
                                    </span>
                                }
                                onChange={e => handleChangeInput(e)}
                                onBlur={e => handleBlurInput(e)}
                                type="text"
                                name="email"
                                size="small"
                                variant="outlined"
                                value={employeeNew.email}
                                placeholder="Email"
                                validators={[
                                    "required",
                                    "isEmail"
                                ]}
                                errorMessages={[
                                    "Trường này bắt buộc nhập",
                                    "Email sai định dạng"
                                ]}
                            />
                        </Grid>
                        <Grid item sm={4} xs={4}>
                            <SelectValidator
                                className="w-100"
                                label={
                                    <span className="font">
                                        <span className="span-required"> * </span>
                                        Tỉnh/Thành phố
                                    </span>
                                }
                                onChange={e => handleChangeAddress(e)}
                                type="text"
                                name="province"
                                size="small"
                                variant="outlined"
                                value={employeeNew.provinceId}
                                validators={["required"]}
                                errorMessages={["Trường này bắt buộc chọn"]}
                            >
                                {}
                            </SelectValidator>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className="my-20 flex-center">
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCloseDialog}
                        className="mr-12"
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="mr-12"
                    >
                        Lưu
                    </Button>
                </DialogActions>
            </ValidatorForm> */}
        </Dialog>
    )
}

export default AddEmployeeDialog;