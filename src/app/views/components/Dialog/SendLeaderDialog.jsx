import React, { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  MenuItem,
} from "@material-ui/core";
import { ValidatorForm, TextValidator, SelectValidator } from "react-material-ui-form-validator";
import moment from 'moment';
import { LEADER, LEADER_POSITION } from 'app/constants/constants';
import { useDispatch } from 'react-redux';
import { EMPLOYEE } from 'app/redux/actions/actions';

const SendLeaderDialog = (props) => {
  const { employee, setOpen, setOpenRegisterDialog, setOpenEditDialog, open } = props;
  const [dataSendLeader, setDataSendLeader] = useState({
    ...employee,
    submitContent: '',
    submitDay: employee?.submitDay
      ? moment(employee.submitDay).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD"),
  });
  const dispatch = useDispatch();

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDataSendLeader({
      ...dataSendLeader,
      [name]: value,
    });
  };

  const handleBlurInput = (e) => {
    const { name, value } = e.target;
    const inputValue = value.trim();
    setDataSendLeader({
      ...dataSendLeader,
      [name]: inputValue,
    })
  };

  useEffect(() => {
    if (dataSendLeader?.leaderName) {
      let leader = LEADER.find(leader => leader.leaderName === dataSendLeader.leaderName);
      setDataSendLeader({
        ...dataSendLeader,
        leaderPosition: leader?.leaderPosition
      });
    }
  }, [dataSendLeader?.leaderName]);

  const handleSubmitForm = () => {
    if (employee.id) {
      dispatch({
        type: EMPLOYEE.UPDATE_EMPLOYEE,
        payload: {
          id: employee.id,
          data: {
            ...dataSendLeader,
            submitProfileStatus: '2'
          },
          action: 'sendLeader'
        }
      })
    } 
    setOpen(false);
    setOpenRegisterDialog(false);
    setOpenEditDialog(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle className="mt-10">
        <span className="h3 text-green font-weight-bold">
          Trình lãnh đạo
        </span>
      </DialogTitle>
      <DialogContent dividers>
        <ValidatorForm onSubmit={handleSubmitForm}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font pr-10">
                    {/* <span className="span-required"> * </span> */}
                    Ngày trình
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="date"
                name="submitDay"
                size="small"
                variant="outlined"
                value={dataSendLeader?.submitDay ? moment(dataSendLeader?.submitDay).format("YYYY-MM-DD") : ''}
                // validators={[
                //   "required",
                // ]}
                // errorMessages={[
                //   "Trường này bắt buộc nhập",
                // ]}
                inputProps={{
                  max: moment().format("YYYY-MM-DD")
                }}
                disabled
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <SelectValidator
                className="w-100"
                label={
                  <span className="font">
                    <span className="span-required"> * </span>
                    Tên lãnh đạo
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                name="leaderName"
                size="small"
                variant="outlined"
                value={dataSendLeader?.leaderName || ''}
                validators={["required"]}
                errorMessages={["Trường này bắt buộc chọn"]}
              >
                {LEADER?.map((leader) => (
                  <MenuItem key={leader.id} value={leader?.leaderName}>
                    {leader?.leaderName}
                  </MenuItem>
                ))}
              </SelectValidator>
            </Grid>
            <Grid item md={4} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font">
                    Chức vụ
                  </span>
                }
                disabled
                type="text"
                name="leaderPosition"
                size="small"
                variant="outlined"
                value={LEADER_POSITION?.find(item => item?.id === dataSendLeader?.leaderPosition)?.name || ''}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font">
                    <span className="span-required"> * </span>
                    Nội dung
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="text"
                name="submitContent"
                size="small"
                variant="outlined"
                value={dataSendLeader?.submitContent || ''}
                placeholder="Nội dung"
                validators={[
                  "required"
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập"
                ]}
              />
            </Grid>
          </Grid>
          <DialogActions className='mt-12 flex-center'>
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
              className="mr-12"
              type='submit'
            >
              Trình lãnh đạo
            </Button>
          </DialogActions>
        </ValidatorForm>
      </DialogContent>
    </Dialog>
  );
};

export default SendLeaderDialog;