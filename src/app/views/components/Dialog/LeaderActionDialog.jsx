import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Icon,
  IconButton,
  Grid,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { EMPLOYEE } from '../../../redux/actions/actions'
import moment from "moment/moment";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const LeaderActionDialog = (props) => {
  const {
    open,
    handleCloseRegisterDialog,
    action,
    employee,
    setOpen,
  } = props;
  const dispatch = useDispatch();
  const [contentDialog, setContentDialog] = useState({
    title: "",
    type: "",
    value: "",
  });
  const todayFormatted = moment().format("YYYY-MM-DD");

  const handleCloseLeaderActionDialog = () => {
    setOpen(false);
    setContentDialog({});
  }

  useEffect(() => {
    switch (action) {
      case 'approve':
        setContentDialog({
          title: 'Ngày hẹn',
          type: 'date',
          value: todayFormatted
        })
        break;
      case 'request':
        setContentDialog({
          title: 'Yêu cầu bổ sung',
          type: 'text',
          value: ''
        })
        break;
      case 'reject':
        setContentDialog({
          title: 'Từ chối',
          type: 'text',
          value: ''
        })
        break;
      default:
        break;
    }
  }, []);

  // const setStatusBasedOnDialog = useCallback((action) => {
  //   switch (action) {
  //     case 0:
  //       return {
  //         action: "Ngày hẹn",
  //         statusType: "date",
  //         inputValue: '',
  //       };
  //     case 1:
  //       return { action: "Nội dung bổ sung", statusType: "text" };
  //     case 2:
  //       return { action: "Nội dung từ chối", statusType: "text" };
  //     default:
  //       return { action: "", statusType: "text" };
  //   }
  // }, []);
  // useEffect(() => {
  //   setFormNotify((prevState) => ({
  //     ...prevState,
  //     ...setStatusBasedOnDialog(action),
  //   }));
  // }, [action, setStatusBasedOnDialog]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setContentDialog({
      ...contentDialog,
      [name]: value,
    });
  };

  const handleApproveEmployee = () => {
    dispatch({
      type: EMPLOYEE.UPDATE_EMPLOYEE,
      payload: {
        id: employee.id,
        data: {
          ...employee,
          submitProfileStatus: '3',
          appointmentDate: contentDialog.content,
        }
      }
    });
  };

  const handleRequestEmployee = () => {
    dispatch({
      type: EMPLOYEE.UPDATE_EMPLOYEE,
      payload: {
        id: employee.id,
        data: {
          ...employee,
          submitProfileStatus: '4',
          additionalRequest: contentDialog.content,
        }
      }
    });
  };

  const handleRejectEmployee = () => {
    dispatch({
      type: EMPLOYEE.UPDATE_EMPLOYEE,
      payload: {
        id: employee.id,
        data: {
          ...employee,
          submitProfileStatus: '5',
          reasonForRejection: contentDialog.content,
        }
      }
    });
  };

  const handleSubmitForm = () => {
    switch (action) {
      case 'approve':
        handleApproveEmployee();
        break;
      case 'request':
        handleRequestEmployee();
        break;
      case 'reject':
        handleRejectEmployee();
        break;
      default:
        break;
    }
    handleCloseRegisterDialog();
    handleCloseLeaderActionDialog();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseLeaderActionDialog}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle className="mt-10">
        <span className="h3 text-green font-weight-bold">
          {contentDialog.title}
        </span>
      </DialogTitle>
      <DialogContent dividers>
        <ValidatorForm onSubmit={handleSubmitForm}>
          <Grid container spacing={2}>
            {action === 'reject' && (
              <Grid item md={4} xs={12}>
                <TextValidator
                  className="w-100"
                  label={
                    <span className="font pr-10">
                      <span className="span-required"> * </span>
                      {contentDialog?.title}
                    </span>
                  }
                  onChange={e => handleChangeInput(e)}
                  type="date"
                  name="rejectionDate"
                  size="small"
                  variant="outlined"
                  value={todayFormatted}
                  disabled
                />
              </Grid>
            )}
            <Grid item md={12} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font pr-10">
                    <span className="span-required"> * </span>
                    {action === 'approve' ? 'Ngày hẹn' : 'Nội dung'}
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                type={contentDialog?.type}
                name="content"
                size="small"
                variant="outlined"
                value={contentDialog?.content || ''}
                placeholder="Nội dung"
                validators={[
                  "required"
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập"
                ]}
                inputProps={{
                  min: todayFormatted,
                }}
              />
            </Grid>
          </Grid>
          <DialogActions className='mt-12 flex-center'>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseLeaderActionDialog}
              className="mr-12"
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="mr-12"
              type='submit'
            >
              Lưu
            </Button>
          </DialogActions>
        </ValidatorForm>
      </DialogContent>
    </Dialog>
  );
};

export default LeaderActionDialog;
