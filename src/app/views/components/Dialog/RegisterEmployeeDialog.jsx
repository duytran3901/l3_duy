import React, { useEffect } from "react";
import {
  Grid,
  Dialog,
  DialogActions,
  Button
} from "@material-ui/core";
import { toast } from "react-toastify";
import { DialogContent, DialogTitle } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import '../../../../styles/views/_style.scss';
import '../../../../styles/utilities/_positionings.scss';
import { VerticalCustomTab } from "app/views/components/Custom/CustomTabs";
import TabCertificate from "app/views/Tabs/TabsRegisterEmployee/TabCertificate";
import TabCV from "app/views/Tabs/TabsRegisterEmployee/TabCV";
import TabInfomation from "app/views/Tabs/TabsRegisterEmployee/TabInfomation";
import { useDispatch, useSelector } from "react-redux";
import { EMPLOYEE } from "app/redux/actions/actions";
import SendLeaderDialog from "./SendLeaderDialog";
import LeaderActionDialog from "./LeaderActionDialog";

toast.configure({
  autoClose: 3000,
  draggable: false,
  limit: 3
});

const RegisterEmployeeDialog = (props) => {
  const { open, setOpen, setOpenEditDialog, idEmployee, action } = props;
  const [isSendLeaderDialogOpen, setIsSendLeaderDialogOpen] = useState(false);
  const [isLeaderActionDialogOpen, setIsLeaderActionDialogOpen] = useState(false);
  const [actionLeader, setActionLeader] = useState('');
  const employee = useSelector(state => state.employee.employee);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: EMPLOYEE.GET_EMPLOYEE_BY_ID, payload: idEmployee });
  }, [idEmployee])

  const handleCloseDialog = () => {
    setOpen(false);
  }

  const handleSendLeader = () => {
    setIsSendLeaderDialogOpen(true);
  }

  const handleLeaderClickReject = () => {
    setIsLeaderActionDialogOpen(true);
    setActionLeader('reject');
  }

  const handleLeaderClickRequest = () => {
    setIsLeaderActionDialogOpen(true);
    setActionLeader('request');
  }

  const handleLeaderClickApprove = () => {
    setIsLeaderActionDialogOpen(true);
    setActionLeader('approve');
  }

  const handleCloseLeaderActionDialog = () => {
    setIsLeaderActionDialogOpen(false);
  }

  const tabs = [
    {
      label: "Hồ sơ",
      a11yPropsIndex: 0,
      content: <TabCV employee={employee} />
    },
    {
      label: "Sơ yếu lý lịch",
      a11yPropsIndex: 1,
      content: <TabInfomation employee={employee} />
    },
    {
      label: "Thông tin văn bằng",
      a11yPropsIndex: 2,
      content: <TabCertificate employee={employee} />
    }
  ];

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="lg"
      fullWidth={true}
    >
      <DialogTitle className="mt-10">
        <span className="h3 text-green font-weight-bold">
          Hồ sơ nhân viên
        </span>
      </DialogTitle>
      <DialogContent dividers className="py-0">
        <Grid container>
          <Grid item xs={12}>
            <VerticalCustomTab tabs={tabs}></VerticalCustomTab>
          </Grid>
        </Grid>
      </DialogContent>
      {action === 'view' && (
        <DialogActions className="my-12 flex-center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseDialog}
          >
            Đóng
          </Button>
        </DialogActions>
      )}
      {action === 'register' && (
        <DialogActions className="my-12 flex-center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseDialog}
            className="mr-12"
          >
            Đóng
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendLeader}
          >
            Trình lãnh đạo
          </Button>
        </DialogActions>
      )}
      {action === 'leaderProcess' && (
        <DialogActions className="my-12 flex-center">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseDialog}
            className="mr-12"
          >
            Đóng
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLeaderClickReject}
            className="mr-12"
          >
            Từ chối
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLeaderClickRequest}
            className="mr-12"
          >
            Yêu cầu bổ sung
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLeaderClickApprove}
          >
            Phê duyệt
          </Button>
        </DialogActions>
      )}
      {isSendLeaderDialogOpen && (
        <SendLeaderDialog
          open={isSendLeaderDialogOpen}
          setOpen={setIsSendLeaderDialogOpen}
          setOpenRegisterDialog={setOpen}
          setOpenEditDialog={setOpenEditDialog}
          employee={employee}
        />
      )}
      {isLeaderActionDialogOpen && (
        <LeaderActionDialog
          open={isLeaderActionDialogOpen}
          employee={employee}
          handleCloseRegisterDialog={handleCloseDialog}
          setOpen={setIsLeaderActionDialogOpen}
          action={actionLeader}
        />
      )}
    </Dialog>
  )
}

export default RegisterEmployeeDialog;