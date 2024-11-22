import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Grid,
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
    handleApprove,
    handleReject,
    handleRequest,

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
          title: 'Ngày duyệt',
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

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setContentDialog({
      ...contentDialog,
      [name]: value,
    });
  };

  const handleSubmitForm = () => {
    switch (action) {
      case 'approve':
        handleApprove(contentDialog);
        break;
      case 'request':
        handleRequest(contentDialog);
        break;
      case 'reject':
        handleReject(contentDialog);
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
                      Ngày từ chối
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
                    {action === 'approve' ? 'Ngày duyệt' : 'Nội dung'}
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
                  min: contentDialog?.content ? moment(contentDialog?.content).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")
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
