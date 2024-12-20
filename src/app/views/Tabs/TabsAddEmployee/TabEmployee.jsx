import React, { useEffect, useState } from 'react';
import {
  Grid,
  DialogActions,
  Button,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import { useDispatch, useSelector } from 'react-redux';
import { EMPLOYEE } from 'app/redux/actions/actions';
import { GENDER, TEAM } from 'app/constants/constants';
import moment from 'moment';
import { resetEmployee } from 'app/redux/reducers/EmployeeReducer';

const useStyles = makeStyles({
  largeAvatar: {
    width: 200,
    height: 200,
  },
});

const TabEmployee = (props) => {
  const classes = useStyles();
  const { employee, setEmployee, setOpen, handleRegisterEmployee } = props;
  const [showRegisterButton, setShowRegisterButton] = useState(employee?.id ? true : false);
  const dispatch = useDispatch();
  const employeeState = useSelector((state) => state.employee?.employee);

  useEffect(() => {
    if (employeeState) {
      setEmployee(employeeState);
    }
  }, [employeeState]);

  const handleCloseDialog = () => {
    setOpen(false);
    dispatch(resetEmployee());
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('validateEmployeeCode', (value) => {
      if (!value) return true;
      const currentYear = new Date().getFullYear();
      const yearSuffix = currentYear.toString().slice(-2);
      const regex = new RegExp(`^NV${yearSuffix}\\d{3}$`);
      return regex.test(value);
    });
    ValidatorForm.addValidationRule('isValidAge', (value) => {
      if (!value) return true;
      const dob = moment(value, "YYYY-MM-DD");
      const age = moment().diff(dob, 'years');
      return age >= 18 && age <= 60;
    });
    ValidatorForm.addValidationRule('isValidCCCD', (value) => {
      if (!value) return true;
      const regex = /^(?:\d{9}|\d{12})$/;
      return regex.test(value);
    });

    return () => {
      ValidatorForm.removeValidationRule('validateEmployeeCode');
      ValidatorForm.removeValidationRule('isValidAge');
      ValidatorForm.removeValidationRule('isValidCCCD');
    };
  }, []);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const handleBlurInput = (e) => {
    const { name, value } = e.target;
    const inputValue = value.trim();
    setEmployee({
      ...employee,
      [name]: inputValue
    });
  };

  const handleChangeFileUpLoad = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      event.target.value = null;
      return;
    }
    const reader = new FileReader();
    const formData = new FormData();
    formData.append("file", file);
    reader.onloadend = () => {
      setEmployee({
        ...employee,
        image: reader.result,
        file: file,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = () => {
    if (employee?.id) {
      dispatch({ type: EMPLOYEE.UPDATE_EMPLOYEE, payload: { id: employee?.id, data: employee } });
    } else {
      dispatch({ type: EMPLOYEE.CREATE_EMPLOYEE, payload: employee });
      setShowRegisterButton(true);
    }
    setEmployee(employee);
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmitForm}>
        <Grid container spacing={2}>
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
            <Button
              variant="contained"
              color="primary"
              component="label"
              className="mt-30"
            >
              <AddAPhotoIcon />
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleChangeFileUpLoad}
                style={{ display: "none" }}
                name="image"
              />
            </Button>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 p-2"
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
                  value={employee.code || ''}
                  placeholder="Mã nhân viên"
                  validators={[
                    "required",
                    "validateEmployeeCode"
                  ]}
                  errorMessages={[
                    "Trường này bắt buộc nhập",
                    "Mã nhân viên sai định dạng (7 ký tự, NV + 2 số cuối năm hiện tại + 3 số)"
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
                  value={employee.name || ''}
                  placeholder="Tên nhân viên"
                  validators={[
                    "required",
                    "matchRegexp:^[^0-9!@#\$%\^\&*\)\(+=._-]+$",
                    "maxStringLength:50"
                  ]}
                  errorMessages={[
                    "Trường này bắt buộc nhập",
                    "Tên chỉ chứa chữ cái",
                    "Tên không được vượt quá 50 ký tự"
                  ]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <SelectValidator
                  className="w-100"
                  label={
                    <span className="font">
                      <span className="span-required"> * </span>
                      Giới tính
                    </span>
                  }
                  onChange={e => handleChangeInput(e)}
                  type="text"
                  name="gender"
                  size="small"
                  variant="outlined"
                  value={employee.gender || ''}
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
              <Grid item lg={6} md={6} sm={12} xs={12}>
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
                  value={employee.dateOfBirth ? moment(employee.dateOfBirth).format("YYYY-MM-DD") : ''}
                  validators={[
                    "required",
                    "isValidAge"
                  ]}
                  errorMessages={[
                    "Trường này bắt buộc nhập",
                    "Tuổi nhân viên lớn hơn 18 và nhỏ hơn 60"
                  ]}
                  inputProps={{
                    max: moment().format("YYYY-MM-DD")
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
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
                  value={employee.phone || ''}
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
              <Grid item lg={6} md={6} sm={12} xs={12}>
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
                  value={employee.email || ''}
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
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <SelectValidator
                  className="w-100"
                  label={
                    <span className="font">
                      <span className="span-required"> * </span>
                      Nhóm
                    </span>
                  }
                  onChange={e => handleChangeInput(e)}
                  type="text"
                  name="team"
                  size="small"
                  variant="outlined"
                  value={employee.team || ''}
                  validators={["required"]}
                  errorMessages={["Trường này bắt buộc chọn"]}
                >
                  {TEAM?.map((team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </SelectValidator>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
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
                  value={employee.citizenIdentificationNumber || ''}
                  placeholder='Số Căn cước công dân / Chứng minh thư'
                  validators={[
                    "required",
                    "isValidCCCD",
                  ]}
                  errorMessages={[
                    "Trường này bắt buộc nhập",
                    "Số CMT/CCCD phải có 9 hoặc 12 chữ số"
                  ]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label={
                    <span className="font pr-10">
                      <span className="span-required"> * </span>
                      Ngày cấp
                    </span>
                  }
                  onChange={e => handleChangeInput(e)}
                  onBlur={e => handleBlurInput(e)}
                  type="date"
                  name="dateOfIssuanceCard"
                  size="small"
                  variant="outlined"
                  value={employee.dateOfIssuanceCard ? moment(employee.dateOfIssuanceCard).format("YYYY-MM-DD") : ''}
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
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label={
                    <span className="font pr-10">
                      <span className="span-required"> * </span>
                      Nơi cấp
                    </span>
                  }
                  onChange={e => handleChangeInput(e)}
                  onBlur={e => handleBlurInput(e)}
                  type="text"
                  name="placeOfIssueCard"
                  size="small"
                  variant="outlined"
                  value={employee.placeOfIssueCard || ''}
                  placeholder='Nơi cấp thẻ'
                  validators={[
                    "required",
                    "maxStringLength:255"
                  ]}
                  errorMessages={[
                    "Trường này bắt buộc nhập",
                    "Email không được vượt quá 255 ký tự"
                  ]}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
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
                  value={employee.address || ''}
                  placeholder='Địa chỉ'
                  validators={[
                    "required",
                    "maxStringLength:255"
                  ]}
                  errorMessages={[
                    "Trường này bắt buộc nhập",
                    "Địa chỉ không được vượt quá 255 ký tự"
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <DialogActions className="mt-20 flex-center">
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
            type="submit"
          >
            Lưu
          </Button>
          {showRegisterButton && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegisterEmployee}
              className="mr-12"
            >
              Đăng ký
            </Button>
          )}
        </DialogActions>
      </ValidatorForm>
    </div>
  );
};

export default TabEmployee;
