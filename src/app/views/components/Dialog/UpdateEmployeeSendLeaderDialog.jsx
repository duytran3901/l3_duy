import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import {
  LEADER_POSITION,
} from "app/constants/constants";
import { EMPLOYEE, LEADER, PROCESS, PROPOSAL, SALARY } from "app/redux/actions/actions";
import React, { useEffect, useState } from "react";
import {
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const UpdateEmployeeSendLeaderDialog = (props) => {
  const {
    data,
    open,
    setOpen,
    employee,
    type,
    handleCloseDialog,
    setOpenForm,
  } = props;
  const [dataSendLeader, setDataSendLeader] = useState(data || {});
  const [dataInput, setDataInput] = useState({});
  const leaders = useSelector((state) => state.leader.leaders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LEADER.GET_LEADERS });
  }, []);

  useEffect(() => {
    if (employee?.leaderId && leaders.length > 0) {
      const defaultLeader = leaders?.find((item) => employee.leaderId === item?.id);
      if (defaultLeader) {
        setDataSendLeader({
          ...dataSendLeader,
          leaderId: defaultLeader.id,
        });
        setDataInput({
          nameLeader: defaultLeader?.leaderName,
          position: LEADER_POSITION?.find(leader => leader.id === defaultLeader.id)?.name || ''
        })
      }
    }
  }, [leaders, employee]);

  const handleCloseSendLeaderDialog = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
    switch (type) {
      case 'process':
        if (dataSendLeader?.id) {
          dispatch({
            type: PROCESS.UPDATE_PROCESS,
            payload: {
              id: dataSendLeader.id,
              data: {
                ...dataSendLeader,
                processStatus: '2'
              },
              type: 'sendLeader'
            }
          });
        } else {
          dispatch({
            type: PROCESS.CREATE_PROCESS,
            payload: {
              employeeId: employee.id,
              data: [{ ...dataSendLeader }],
              type: 'sendLeader'
            }
          });
        }
        break;
      case 'salary':
        if (dataSendLeader?.id) {
          dispatch({
            type: SALARY.UPDATE_SALARY,
            payload: {
              id: dataSendLeader.id,
              data: {
                ...dataSendLeader,
                salaryIncreaseStatus: '2'
              },
              type: 'sendLeader'
            }
          });
        } else {
          dispatch({
            type: SALARY.CREATE_SALARY,
            payload: {
              employeeId: employee.id,
              data: [{ ...dataSendLeader }],
              type: 'sendLeader'
            }
          });
        }
        break;
      case 'proposal':
        if (dataSendLeader?.id) {
          dispatch({
            type: PROPOSAL.UPDATE_PROPOSAL,
            payload: {
              id: dataSendLeader.id,
              data: {
                ...dataSendLeader,
                proposalStatus: 2
              },
              type: 'sendLeader'
            }
          });
        } else {
          dispatch({
            type: PROPOSAL.CREATE_PROPOSAL,
            payload: {
              employeeId: employee.id,
              data: [{ ...dataSendLeader }],
              type: 'sendLeader'
            }
          });
        }
        break;
      case 'resignation':
        if (dataSendLeader?.id) {
          dispatch({
            type: EMPLOYEE.UPDATE_EMPLOYEE,
            payload: {
              id: employee.id,
              data: {
                ...dataSendLeader,
                submitProfileStatus: '6'
              },
              type: 'sendLeader'
            }
          });
        }
        break;
      default:
        break;
    }

    handleCloseSendLeaderDialog();
    setOpenForm(false);
    handleCloseDialog();
  };

  return (
    <Dialog open={open} onClose={handleCloseSendLeaderDialog} fullWidth={true} maxWidth={"xs"}>
      <DialogTitle>
        <Grid container justify="space-between" alignContent="center">
          <Grid item>
            <h3 className="p-0">Trình lãnh đạo</h3>
          </Grid>
        </Grid>
      </DialogTitle>
      <ValidatorForm onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font">
                    Tên lãnh đạo
                  </span>
                }
                name="nameLeader"
                type="text"
                value={dataInput?.nameLeader || ''}
                disabled
                size="small"
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6} md={6}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font">
                    Chức vụ
                  </span>
                }
                name="position"
                type="text"
                value={dataInput?.position || ''}
                disabled
                size="small"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="flex-center my-12" dividers>
          <Button variant="contained" color="secondary" onClick={handleCloseSendLeaderDialog}>
            Hủy
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Trình lãnh đạo
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};
export default UpdateEmployeeSendLeaderDialog;
