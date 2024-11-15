import React, { useEffect, useState } from "react";
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
import { LEADERSHIP } from "app/constants/constants";
import { useDispatch } from "react-redux";
// import SendUpdateEmployee from "app/views/organisms/sendRequestLeader/sendUpdateEmployeeDialog";
// import LeaderSendNotifyProcess from "app/views/organisms/sendNotify/LeaderSendNotifyProcess";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SUBMIT_UPDATE_STATUS } from "app/constants/constants";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
const FormSalaryIncrease = (props) => {
  const {
    setOpen,
    employee,
    dataSalaryIncrease,
    isSendLeader,
    isLeaderAction,
    checkStatus,
    testCheck,
  } = props;
  const dispatch = useDispatch();
  // const [statusForm, setStatusForm] = useState(TYPE_ADD.index);
  const [openSendUpdateDialog, setOpenSendUpdateDialog] = useState(false);
  const [isSalary, setIsSalary] = useState(false);
  const [salaryForm, setSalaryForm] = useState(dataSalaryIncrease);
  const [
    openLeaderSendNotifyProcessDialog,
    setOpenLeaderSendNotifyProcessDialog,
  ] = useState(false);
  const [statusDialog, setStatusDialog] = useState();
  useEffect(() => {
    if (dataSalaryIncrease?.id) {
      // setStatusForm(TYPE_EDIT.index);
    } else {
      // setStatusForm(TYPE_ADD.index);
    }
    setSalaryForm(dataSalaryIncrease);
  }, [dataSalaryIncrease]);

  const handleAddSalary = () => {
    const data = {
      id: employee?.id,
      data: [{ ...dataSalaryIncrease }],
    };
    if (!checkStatus) {
      // dispatch(addSalaryRequestAction({ ...data }));
    } else {
      toast.error("Đang trong quá trình duyệt không thể thêm bản ghi!");
    }
  };
  const handleCloseDialog = () => {
    // onClose();
  };
  const handleUpdateSalary = () => {
    // dispatch(updateSalaryRequestAction(dataSalaryIncrease));
  };
  // const handleSubmitForm = () => {
  //   if (statusForm === TYPE_ADD.index) {
  //     handleAddSalary();
  //   } else {
  //     handleUpdateSalary();
  //   }
  //   handleCloseDialog();
  // };
  const handleSendLeader = () => {
    setOpenSendUpdateDialog(true);
    setIsSalary(true);
  };
  const handleCloseLeaderSendNotifyProcessDialog = () => {
    setOpenLeaderSendNotifyProcessDialog(false);
  };
  const handleApproveSalary = () => {
    setOpenLeaderSendNotifyProcessDialog(true);
    setStatusDialog(0);
  };
  const handleRequestSalary = () => {
    setOpenLeaderSendNotifyProcessDialog(true);
    setStatusDialog(1);
  };
  const handleRejectSalary = () => {
    setOpenLeaderSendNotifyProcessDialog(true);
    setStatusDialog(2);
  };
  const handleApprove = (data) => {
    dispatch(
      // updateSalaryRequestAction({
      //   ...dataSalaryIncrease,
      //   salaryIncreaseStatus: SUBMIT_UPDATE_STATUS.APPROVED.CODE,
      //   acceptanceDate: data,
      // })
    );
  };
  const handleReject = (data) => {
    dispatch(
      // updateSalaryRequestAction({
      //   ...dataSalaryIncrease,
      //   salaryIncreaseStatus: SUBMIT_UPDATE_STATUS.REJECTED.CODE,
      //   reasonForRefusal: data,
      // })
    );
  };
  const handleRequest = (data) => {
    dispatch(
      // updateSalaryRequestAction({
      //   ...dataSalaryIncrease,
      //   salaryIncreaseStatus: SUBMIT_UPDATE_STATUS.REQUEST.CODE,
      //   additionalRequest: data,
      // })
    );
  };
  return (
    <Dialog open={true} fullWidth maxWidth="md">
      <DialogTitle id="draggable-dialog-title">
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Đề xuất tăng lương</Grid>
          <Grid item>
            <IconButton onClick={() => console.log('Đóng')
            }>
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
            <Typography>
              Mức lương hiện tại:{" "}
              <b>
                {dataSalaryIncrease?.oldSalary?.toLocaleString("en-US")} VND.
              </b>
            </Typography>
            <Typography>
              Mức lương sau điều chỉnh:{" "}
              <b>
                {dataSalaryIncrease?.newSalary?.toLocaleString("en-US")} VND.
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
                  <div className="mt-32 flex-center">
                    <span className="sign-text ">{employee?.leaderName}</span>
                  </div>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <Grid></Grid>
      <DialogActions className="flex flex-center px-16">
        {isLeaderAction && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleApproveSalary}
          >
            Duyệt
          </Button>
        )}
        {isLeaderAction && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleRequestSalary}
          >
            Yêu cầu bổ sung
          </Button>
        )}
        {isLeaderAction && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRejectSalary}
          >
            Từ chối
          </Button>
        )}
        {isSendLeader && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendLeader}
          >
            Trình lãnh đạo
          </Button>
        )}
        {isSendLeader && (
          <Button
            variant="contained"
            color="primary"
            // onClick={handleSubmitForm}
          >
            {/* {TYPE_ADD.index === statusForm ? "Thêm" : "Lưu"} */}
          </Button>
        )}
        <Button  variant="contained" color="secondary">
          Hủy
        </Button>
      </DialogActions>
      {/* {openSendUpdateDialog && (
        <SendUpdateEmployee
          open={openSendUpdateDialog}
          onClose={() => setOpenSendUpdateDialog(false)}
          employee={employee}
          data={salaryForm}
          isSalary={isSalary}
          handleCloseDialog={handleCloseDialog}
          checkStatus={checkStatus}
          testCheck={testCheck}
        />
      )} */}
      {/* {openLeaderSendNotifyProcessDialog && (
        <LeaderSendNotifyProcess
          open={openLeaderSendNotifyProcessDialog}
          handleCloseSendRequestDialog={
            handleCloseLeaderSendNotifyProcessDialog
          }
          statusDialog={statusDialog}
          // handleCloseRegister={onClose}
          handleApprove={handleApprove}
          handleReject={handleReject}
          handleRequest={handleRequest}
        />
      )} */}
    </Dialog>
  );
};

export default FormSalaryIncrease;
