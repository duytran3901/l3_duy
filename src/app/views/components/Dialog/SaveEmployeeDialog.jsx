import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import { EMPLOYEE } from "app/redux/actions/actions";

const SaveEmployeeDialog = (props) => {
  const { open, setOpen, employee } = props;
  const [submitCode, setSubmitCode] = useState({
    ...employee,
  });
  const dispatch = useDispatch();

  const handleCloseDialog = () => {
    setOpen(false);
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSubmitCode({
      ...submitCode,
      [name]: value,
    });
  };


  const handleSubmit = () => {
    const now = new Date();
    const formattedMonth = `${(now.getMonth() + 1).toString().padStart(2, "0")}`;
    const codePrefix = `NL${formattedMonth}${now.getFullYear()}/`;
    const employeeCode = `${codePrefix}${submitCode.numberSaved}`;
    const data = {
      ...submitCode,
      numberSaved: employeeCode,
      submitProfileStatus: '0',
    };
    if (employee?.id) {
      dispatch({
        type: EMPLOYEE.UPDATE_EMPLOYEE,
        payload: { id: employee.id, data },
      });
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="m-sm-24">
        <Dialog open={open} onClose={handleCloseDialog} fullWidth={true} maxWidth={"xs"}>
          <DialogTitle className="mt-10">
            <span className="h3 text-primary font-weight-bold">
              Lưu hồ sơ
            </span>
          </DialogTitle>
          <ValidatorForm onSubmit={handleSubmit}>
            <DialogContent className="py-10 overflow-hidden">
              <Grid xs={12}>
                <TextValidator
                  className="w-100 p-2"
                  label={
                    <span className="font">
                      <span className="span-required"> * </span>
                      Mã lưu hồ sơ
                    </span>
                  }
                  onChange={e => handleChangeInput(e)}
                  type="text"
                  size="small"
                  variant="outlined"
                  name="numberSaved"
                  value={submitCode.numberSaved || ''}
                  validators={[
                    "required",
                    "minStringLength:3",
                    "maxStringLength:3",
                  ]}
                  errorMessages={[
                    "Trường này bắt buộc nhập",
                    "Vui nhập đủ 3 ký tự",
                    "Vui nhập đúng 3 ký tự",
                  ]}
                />
              </Grid>
            </DialogContent>
            <DialogActions className="flex-center my-12" >
              <Button variant="contained" color="secondary" onClick={handleCloseDialog}>
                Hủy
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Lưu
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    </div>
  );
};


export default SaveEmployeeDialog;