import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@material-ui/core";
import "../../../../styles/components/_form.scss";
import moment from "moment";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SALARY } from "app/redux/actions/actions";
import UpdateEmployeeSendLeaderDialog from "../Dialog/UpdateEmployeeSendLeaderDialog";
import LeaderActionDialog from "../Dialog/LeaderActionDialog";
import ManageEmployeeDialog from "../Dialog/ManageEmployeeDialog";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const FormSalaryIncrease = (props) => {
  const {
    open,
    setOpen,
    employee,
    dataSalaryIncrease,
    resetSalary,
    action
  } = props;
  const dispatch = useDispatch();
  const [isOpenSendLeaderDialog, setIsOpenSendLeaderDialog] = useState(false);
  const [isLeaderActionDialogOpen, setIsLeaderActionDialogOpen] = useState(false);
  const [isLeaderViewDocumentDialogOpen, setIsLeaderViewDocumentDialogOpen] = useState(false);
  const [actionLeader, setActionLeader] = useState('');

  const handleCloseDialog = () => {
    setOpen(false);
    if (resetSalary) resetSalary();
  };

  const handleSubmitSalary = () => {
    if (dataSalaryIncrease?.id) {
      dispatch({
        type: SALARY.UPDATE_SALARY,
        payload: {
          id: dataSalaryIncrease.id,
          data: dataSalaryIncrease
        }
      })
    } else {
      dispatch({
        type: SALARY.CREATE_SALARY,
        payload: {
          employeeId: employee?.id,
          data: [dataSalaryIncrease]
        }
      })
    }
    handleCloseDialog();
  };

  const handleSendLeader = () => {
    setIsOpenSendLeaderDialog(true);
  };

  const handleLeaderClickView = () => {
    setIsLeaderViewDocumentDialogOpen(true);
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

  const handleApproveSalaryIncrease = (contentDialog) => {
    const updatedData = {
      ...dataSalaryIncrease,
      salaryIncreaseStatus: '3',
      acceptanceDate: contentDialog.content
    };
    dispatch({
      type: SALARY.UPDATE_SALARY,
      payload: {
        id: dataSalaryIncrease.id,
        data: updatedData
      }
    });
  };

  const handleRequestSalaryIncrease = (contentDialog) => {
    const updatedData = {
      ...dataSalaryIncrease,
      salaryIncreaseStatus: '4',
      additionalRequest: contentDialog.content
    };
    dispatch({
      type: SALARY.UPDATE_SALARY,
      payload: {
        id: dataSalaryIncrease.id,
        data: updatedData
      }
    });
  };

  const handleRejectSalaryIncrease = (contentDialog) => {
    const updatedData = {
      ...dataSalaryIncrease,
      salaryIncreaseStatus: '5',
      reasonForRefusal: contentDialog.content
    };
    dispatch({
      type: SALARY.UPDATE_SALARY,
      payload: {
        id: dataSalaryIncrease.id,
        data: updatedData
      }
    });
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="md">
      <DialogTitle id="draggable-dialog-title">
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Đề xuất tăng lương</Grid>
          <Grid item>
            <IconButton onClick={handleCloseDialog}>
              <Icon color="secondary">close</Icon>
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers className="wrapper-a4 mh-70">
        <Box className="A4">
          <Box className="A4-content">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div className="flex-center">
                  <Typography fontWeight="bold" className="text-overflow">
                    <b>CÔNG TY OCEANTECH</b>
                  </Typography>
                </div>
                <Typography className="flex-center">
                  <b> Số {employee?.id}/ QĐ - TL</b>
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <div className="flex-center">
                  <Typography fontWeight="bold" className="text-overflow">
                    <b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM </b>
                  </Typography>
                </div>
                <div className="flex-center">
                  <Typography
                    fontWeight="bold"
                    className="text-overflow heading-underline"
                  >
                    <b>Độc lập - Tự do - Hạnh phúc</b>
                  </Typography>
                </div>
                <div className="flex-center">
                  <Typography
                    className="text-overflow line-height-25"
                    fontStyle="italic"
                  >
                    <em>
                      {" "}
                      Hà Nội, ngày{" "}
                      {
                        moment(new Date(dataSalaryIncrease?.startDate))
                          .format("DD/MM/YYYY")
                          .split("/")[0]
                      }{" "}
                      tháng{" "}
                      {
                        moment(new Date(dataSalaryIncrease?.startDate))
                          .format("DD/MM/YYYY")
                          .split("/")[1]
                      }{" "}
                      năm{" "}
                      {
                        moment(new Date(dataSalaryIncrease?.startDate))
                          .format("DD/MM/YYYY")
                          .split("/")[2]
                      }
                      .
                    </em>
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Typography className="flex-center mt-32" fontWeight="bold">
              <b>QUYẾT ĐỊNH</b>
            </Typography>
            <Typography className="flex-center pb-12" fontStyle="italic">
              <em>V/v tăng lương cho người lao động.</em>
            </Typography>
            <Typography>
              <em>
                - Căn cứ vào Điều lệ, nội quy, quy chế của Công ty OCEANTECH.
              </em>
            </Typography>
            <Typography>
              <em>
                {" "}
                - Căn cứ vào hợp đồng số <b>{employee?.code}</b> được ký giữa
                Công ty OCEANTECH và Ông/Bà <b>{employee?.name}</b> ngày{" "}
                {
                  moment(new Date(employee?.submitDay))
                    .format("DD/MM/YYYY")
                    .split("/")[0]
                }{" "}
                tháng{" "}
                {
                  moment(new Date(employee?.submitDay))
                    .format("DD/MM/YYYY")
                    .split("/")[1]
                }{" "}
                năm{" "}
                {
                  moment(new Date(employee?.submitDay))
                    .format("DD/MM/YYYY")
                    .split("/")[2]
                }
                .
              </em>
            </Typography>
            <Typography className="pb-12">
              <em>
                {" "}
                - Căn cứ vào sự đóng góp thực tế của ông/bà:{" "}
                <b>{employee?.name}</b> đổi với sự phát triển của Công ty{" "}
                <b>OCEANTECH.</b>
              </em>
            </Typography>
            <div className="flex-center">
              <Typography className="text-overflow" fontWeight="bold">
                <b>GIÁM ĐỐC CÔNG TY OCEANTECH</b>
              </Typography>
            </div>
            <Typography
              className="flex-center line-height-25"
              fontWeight="bold"
            >
              <b>QUYẾT ĐỊNH</b>
            </Typography>
            <Typography>
              <b>- Điều 1:</b> Tăng lương cho Ông/Bà: <b>{employee?.name}</b>{" "}
              đang làm việc tại công ty kể từ tháng{" "}
              {
                moment(new Date(dataSalaryIncrease?.startDate))
                  .format("DD/MM/YYYY")
                  .split("/")[1]
              }{" "}
              ngày{" "}
              {
                moment(new Date(dataSalaryIncrease?.startDate))
                  .format("DD/MM/YYYY")
                  .split("/")[0]
              }{" "}
              năm{" "}
              {
                moment(new Date(dataSalaryIncrease?.startDate))
                  .format("DD/MM/YYYY")
                  .split("/")[2]
              }
              , cụ thể như sau:
            </Typography>
            <Typography className="ml-20">
              Mức lương hiện tại:{" "}
              <b>
                {dataSalaryIncrease?.oldSalary?.toLocaleString("en-US")} VND.
              </b>
            </Typography>
            <Typography className="ml-20">
              Mức lương sau điều chỉnh:{" "}
              <b>
                {dataSalaryIncrease?.newSalary?.toLocaleString("en-US")} VND.
              </b>
            </Typography>
            <Typography className="ml-20">
              Lý do:{" "}
              <b>
                {dataSalaryIncrease?.reason}.
              </b>
            </Typography>
            <Typography>
              <b>- Điều 2: </b>Các Ông/Bà Phòng nhân sự, Phòng tài chính kế toán
              căn cứ thi hành quyết định này.
            </Typography>
            <Box className="flex-between mt-32">
              <Box className="px-32">
                <Typography fontWeight="bold" fontStyle="italic">
                  <b>Nơi Nhận:</b>
                </Typography>
                <Typography>
                  <em>-Như điều 2.</em>
                </Typography>
                <Typography>
                  <em>-Lưu HS,VP.</em>
                </Typography>
              </Box>
              <Box className="px-32">
                <div className="flex-center">
                  <Typography
                    className="text-overflow line-height-25"
                    fontStyle="italic"
                  >
                    <em>
                      {" "}
                      Hà Nội, ngày{" "}
                      {
                        moment(new Date(dataSalaryIncrease?.startDate))
                          .format("DD/MM/YYYY")
                          .split("/")[0]
                      }{" "}
                      tháng{" "}
                      {
                        moment(new Date(dataSalaryIncrease?.startDate))
                          .format("DD/MM/YYYY")
                          .split("/")[1]
                      }{" "}
                      năm{" "}
                      {
                        moment(new Date(dataSalaryIncrease?.startDate))
                          .format("DD/MM/YYYY")
                          .split("/")[2]
                      }
                    </em>
                  </Typography>
                </div>
                <Typography fontWeight="bold" className="flex-center mt-2">
                  <b>GIÁM ĐỐC</b>
                </Typography>
                <Typography fontStyle="italic" className="flex-center">
                  (Ký tên, đóng dấu)
                </Typography>
                {dataSalaryIncrease?.salaryIncreaseStatus === 3 && (
                  <div className="mt-30 flex-center">
                    <span className="sign-text ">{employee?.leaderName}</span>
                  </div>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="flex flex-center my-16">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCloseDialog}
        >
          {action === 'view' ? 'Hủy' : 'Hủy'}
        </Button>
        {action === 'leaderProcess' && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLeaderClickView}
          >
            Xem hồ sơ
          </Button>
        )}
        {action === 'leaderProcess' && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLeaderClickReject}
          >
            Từ chối
          </Button>
        )}
        {action === 'leaderProcess' && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleLeaderClickRequest}
          >
            Yêu cầu bổ sung
          </Button>
        )}
        {action === 'leaderProcess' && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleLeaderClickApprove}
          >
            Duyệt
          </Button>
        )}
        {action === 'sendLeader' && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitSalary}
          >
            {dataSalaryIncrease?.id ? "Lưu" : "Thêm"}
          </Button>
        )}
        {action === 'sendLeader' && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendLeader}
          >
            Trình lãnh đạo
          </Button>
        )}
      </DialogActions>
      {isOpenSendLeaderDialog && (
        <UpdateEmployeeSendLeaderDialog
          open={isOpenSendLeaderDialog}
          setOpen={setIsOpenSendLeaderDialog}
          setOpenForm={setOpen}
          employee={employee}
          data={dataSalaryIncrease}
          type='salary'
          handleCloseDialog={handleCloseDialog}
        />
      )}
      {isLeaderActionDialogOpen && (
        <LeaderActionDialog
          open={isLeaderActionDialogOpen}
          handleCloseRegisterDialog={handleCloseDialog}
          setOpen={setIsLeaderActionDialogOpen}
          action={actionLeader}
          handleApprove={handleApproveSalaryIncrease}
          handleReject={handleRejectSalaryIncrease}
          handleRequest={handleRequestSalaryIncrease}
        />
      )}
      {isLeaderViewDocumentDialogOpen && (
        <ManageEmployeeDialog
          open={isLeaderViewDocumentDialogOpen}
          setOpen={setIsLeaderViewDocumentDialogOpen}
          employee={employee}
          type='leader'
        />
      )}
    </Dialog>
  );
};

export default FormSalaryIncrease;
