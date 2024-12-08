import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  MenuItem,
  DialogActions
} from "@material-ui/core";
import { IconButton, Icon } from '@material-ui/core';
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from 'react-redux';
import { FAMILY } from 'app/redux/actions/actions';
import moment from 'moment';
import CustomTable from '../../components/Custom/CustomTable';
import { CustomColumnsFamily } from '../../components/Custom/CustomColumns';
import { ConfirmationDialog } from 'egret';
import { FAMILY_MEMBER, GENDER } from 'app/constants/constants';
import { resetEmployee } from 'app/redux/reducers/EmployeeReducer';

const TabFamily = (props) => {
  const [pageSize, setPageSize] = useState(3);
  const [page, setPage] = useState(0);
  const { idEmployee, setOpen, handleRegisterEmployee } = props;
  const family = useSelector((state) => state.family.family);
  const totalElements = useSelector(state => state.family.totalElements);
  const [familyMember, setFamilyMember] = useState({});
  const [familyMemberSelected, setFamilyMemberSelected] = useState({});
  const [isConfirmDeleteFamilyMemberOpen, setIsConfirmDeleteFamilyMemberOpen] = useState(false);
  const dispatch = useDispatch();
  const dataTable = family?.map((familyMember) => ({ ...familyMember }));

  useEffect(() => {
    reloadTable();
  }, [totalElements]);

  const handleCloseDialog = () => {
    setOpen(false);
    dispatch(resetEmployee());
  }

  useEffect(() => {
    ValidatorForm.addValidationRule('isValidCCCD', (value) => {
      if (!value) return true;
      const regex = /^(?:\d{9}|\d{12})$/;
      return regex.test(value);
    });
    return () => {
      ValidatorForm.removeValidationRule('isValidCCCD');
    };
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFamilyMember({
      ...familyMember,
      [name]: value,
    })
  };

  const handleBlurInput = (e) => {
    const { name, value } = e.target;
    const inputValue = value.trim();
    setFamilyMember({
      ...familyMember,
      [name]: inputValue,
    })
  };

  const handleCancel = () => {
    setFamilyMember({
      name: '',
      gender: '',
      dateOfBirth: '',
      relationShip: '',
      citizenIdentificationNumber: '',
      address: '',
      email: '',
      phoneNumber: '',
    })
  }

  const handleEditFamilyMember = (rowData) => {
    if (rowData) {
      setFamilyMember(rowData);
    }
  }

  const handleClickDelete = (rowData) => {
    setIsConfirmDeleteFamilyMemberOpen(true);
    setFamilyMemberSelected(rowData);
  }

  const handleDeleteFamilyMember = (id) => {
    dispatch({ type: FAMILY.DELETE_FAMILY_MEMBER, payload: id })
    setIsConfirmDeleteFamilyMemberOpen(false);
    setFamilyMemberSelected({});
    setFamilyMember({});
  }

  const reloadTable = () => {
    if (idEmployee) dispatch({ type: FAMILY.GET_FAMILY, payload: { employeeId: idEmployee } })
  }

  const action = ({ rowData }) => {
    return (
      <div>
        <IconButton size="small" onClick={() => handleEditFamilyMember(rowData)}>
          <Icon fontSize="small" color="primary">edit</Icon>
        </IconButton>
        <IconButton size="small" onClick={() => handleClickDelete(rowData)}>
          <Icon fontSize="small" color="error">delete</Icon>
        </IconButton>
      </div>
    )
  };

  const columns = CustomColumnsFamily({ Action: action, page, pageSize });

  const handleSubmitForm = () => {
    if (familyMember.id) {
      dispatch({ type: FAMILY.UPDATE_FAMILY, payload: { id: familyMember.id, data: familyMember } })
    } else {
      dispatch({ type: FAMILY.CREATE_FAMILY_MEMBER, payload: { employeeId: idEmployee, data: [familyMember] } });
    }
    handleCancel();
    reloadTable();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ValidatorForm onSubmit={handleSubmitForm}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} xs={12}>
              <TextValidator
                className="w-100"
                size="small"
                label={
                  <span className="font">
                    <span className="span-required"> * </span>
                    Họ và tên
                  </span>
                }
                variant="outlined"
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="text"
                name="name"
                value={familyMember.name || ''}
                placeholder="Họ và tên"
                validators={[
                  "required",
                  "matchRegexp:^[^0-9!@#\$%\^\&*\)\(+=._-]+$",
                  "maxStringLength:100"
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập",
                  "Tên chỉ chứa chữ cái",
                  "Tên không được vượt quá 100 ký tự"
                ]}
              />
            </Grid>
            <Grid item lg={2} md={2} xs={6}>
              <SelectValidator
                className="w-100"
                label={
                  <span className="font">
                    <span className="span-required"> * </span>
                    Giới tính
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                name="gender"
                size="small"
                variant="outlined"
                value={familyMember.gender || ''}
                validators={["required"]}
                errorMessages={["Trường này bắt buộc chọn"]}
              >
                {GENDER?.map((gender) => (
                  <MenuItem key={gender.id} value={gender.id}>
                    {gender.name}
                  </MenuItem>
                ))}
              </SelectValidator>
            </Grid>
            <Grid item lg={2} md={2} xs={6}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font pr-10">
                    <span className="span-required"> * </span>
                    Ngày sinh
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="date"
                name="dateOfBirth"
                size="small"
                variant="outlined"
                value={familyMember.dateOfBirth ? moment(familyMember.dateOfBirth).format("YYYY-MM-DD") : ''}
                validators={[
                  "required",
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập",
                ]}
                inputProps={{
                  max: moment().format("YYYY-MM-DD")
                }}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <SelectValidator
                className="w-100"
                label={
                  <span className="font">
                    <span className="span-required"> * </span>
                    Quan hệ
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                name="relationShip"
                size="small"
                variant="outlined"
                value={familyMember.relationShip || ''}
                validators={["required"]}
                errorMessages={["Trường này bắt buộc chọn"]}
              >
                {FAMILY_MEMBER?.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    {member.name}
                  </MenuItem>
                ))}
              </SelectValidator>
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
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
                value={familyMember.email || ''}
                placeholder="Email"
                validators={[
                  "required",
                  "isEmail",
                  "maxStringLength:255"
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập",
                  "Email sai định dạng",
                  "Email không được vượt quá 255 ký tự"
                ]}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
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
                name="phoneNumber"
                size="small"
                variant="outlined"
                value={familyMember.phoneNumber || ''}
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
            <Grid item lg={4} md={4} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font pr-10">
                    <span className="span-required"> * </span>
                    Số CCCD/CMT
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="number"
                name="citizenIdentificationNumber"
                size="small"
                variant="outlined"
                value={familyMember.citizenIdentificationNumber || ''}
                placeholder='Số Căn cước công dân / Chứng minh thư'
                validators={[
                  "required",
                  "isValidCCCD"
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập",
                  "Số CMT/CCCD phải có 9 hoặc 12 chữ số"
                ]}
              />
            </Grid>
            <Grid item lg={8} md={8} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font pr-10">
                    <span className="span-required"> * </span>
                    Địa chỉ
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="text"
                name="address"
                size="small"
                variant="outlined"
                value={familyMember.address || ''}
                placeholder='Địa chỉ'
                validators={[
                  "required",
                  "maxStringLength:255"
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập",
                  "Nội dung không được vượt quá 255 ký tự"
                ]}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12} className='text-center'>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
                className="mr-8"
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                color="primary"
                type='submit'
              >
                Lưu
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
      <Grid item xs={12}>
        <CustomTable
          data={totalElements <= pageSize ? dataTable : dataTable.slice(page * pageSize, page * pageSize + pageSize)}
          columns={columns}
          total={totalElements}
          pageSize={pageSize}
          page={page}
          setPageSize={setPageSize}
          setPage={setPage}
          rowsPerPageOptions={[1, 2, 3, 5, 10]}
          height='calc(100vh - 556px)'
        />
      </Grid>
      <Grid item xs={12}>
        <DialogActions className="flex-center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseDialog}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegisterEmployee}
          >
            Đăng ký
          </Button>
        </DialogActions>
      </Grid>
      {isConfirmDeleteFamilyMemberOpen && (
        <ConfirmationDialog
          title='Bạn có chắc chắn muốn xóa người này không?'
          open={isConfirmDeleteFamilyMemberOpen}
          onConfirmDialogClose={() => setIsConfirmDeleteFamilyMemberOpen(false)}
          onYesClick={() => handleDeleteFamilyMember(familyMemberSelected.id)}
          Yes='Có'
          No='Không'
        />
      )}
    </Grid>
  );
};

export default TabFamily;