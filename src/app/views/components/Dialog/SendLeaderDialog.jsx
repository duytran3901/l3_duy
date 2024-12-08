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
import { LEADER_POSITION } from 'app/constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { EMPLOYEE, LEADER } from 'app/redux/actions/actions';
import { resetEmployee } from 'app/redux/reducers/EmployeeReducer';

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
  const leaders = useSelector(state => state.leader.leaders);

  useEffect(() => {
    dispatch({ type: LEADER.GET_LEADERS });
  }, [])

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
      let leader = leaders.find(leader => leader.leaderName === dataSendLeader.leaderName);
      setDataSendLeader({
        ...dataSendLeader,
        leaderPosition: leader?.leaderPosition,
        leaderId: leader?.id
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
    dispatch(resetEmployee());
    setOpen(false);
    setOpenRegisterDialog(false);
    if (setOpenEditDialog) setOpenEditDialog(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle className="mt-10">
        <span className="h3 text-primary font-weight-bold">
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
                {leaders?.map((leader) => (
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
                  "required",
                  "maxStringLength:1000"
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập",
                  "Nội dung không được vượt quá 1000 ký tự"
                ]}
              />
            </Grid>
          </Grid>
          <DialogActions className='mt-12 flex-center'>
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