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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EMPLOYEE_POSITION, SUBMIT_UPDATE_STATUS } from "app/constants/constants";
import UpdateEmployeeSendLeaderDialog from "../Dialog/UpdateEmployeeSendLeaderDialog";
import { PROCESS } from "app/redux/actions/actions";
import LeaderActionDialog from "../Dialog/LeaderActionDialog";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const FormProcess = (props) => {
  const {
    open,
    setOpen,
    employee,
    dataProcess,
    resetProcess,
    isLeaderAction,
    checkStatus,
    testCheck,
    action
  } = props;
  const dispatch = useDispatch();
  // const [statusForm, setStatusForm] = useState(TYPE_ADD.index);
  const [isOpenSendLeaderDialog, setIsOpenSendLeaderDialog] = useState(false);
  const [isLeaderActionDialogOpen, setIsLeaderActionDialogOpen] = useState(false);
  const [actionLeader, setActionLeader] = useState('');
  const [isProcess, setIsProcess] = useState(false);
  const [
    openLeaderSendNotifyProcessDialog,
    setOpenLeaderSendNotifyProcessDialog,
  ] = useState(false);
  const [statusDialog, setStatusDialog] = useState();

  useEffect(() => {
    if (dataProcess?.id) {
      // setStatusForm(TYPE_EDIT.index);
    } else {
      // setStatusForm(TYPE_ADD.index);
    }
  }, [dataProcess]);

  const handleAddProcess = () => {
    const data = {
      id: employee?.id,
      data: [{ ...dataProcess }],
    };
    if (!checkStatus) {
      // dispatch(addProcessActionRequest(data));
    } else {
      toast.error("Đang trong quá trình duyệt không thể thêm bản ghi!");
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    if (resetProcess) resetProcess();
  };

  const handleCloseForm = () => {
    setOpen(false);
  }

  const handleSubmitProcess = () => {
    if (dataProcess?.id) {
      dispatch({
        type: PROCESS.UPDATE_PROCESS,
        payload: {
          id: dataProcess.id,
          data: dataProcess
        }
      })
    } else {
      dispatch({
        type: PROCESS.CREATE_PROCESS,
        payload: {
          employeeId: employee?.id,
          data: [dataProcess]
        }
      })
    }
    handleCloseDialog();
  };
  const handleSendLeader = () => {
    setIsOpenSendLeaderDialog(true);
    setIsProcess(true);
  };
  const handleCloseLeaderSendNotifyProcessDialog = () => {
    setOpenLeaderSendNotifyProcessDialog(false);
  };
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

  const handleApproveProcess = (contentDialog) => {
    const updatedData = {
      ...dataProcess,
      processStatus: '3',
      acceptanceDate: contentDialog.content
    };
    dispatch({
      type: PROCESS.UPDATE_PROCESS,
      payload: {
        id: dataProcess.id,
        data: updatedData
      }
    });
  };

  const handleRequestProcess = (contentDialog) => {
    const updatedData = {
      ...dataProcess,
      processStatus: '4',
      additionalRequest: contentDialog.content
    };
    dispatch({
      type: PROCESS.UPDATE_PROCESS,
      payload: {
        id: dataProcess.id,
        data: updatedData
      }
    });
  };

  const handleRejectProcess = (contentDialog) => {
    const updatedData = {
      ...dataProcess,
      processStatus: '5',
      reasonForRefusal: contentDialog.content
    };
    dispatch({
      type: PROCESS.UPDATE_PROCESS,
      payload: {
        id: dataProcess.id,
        data: updatedData
      }
    });
  };

  return (
    <Dialog open={open} fullWidth maxWidth="md">
      <DialogTitle id="draggable-dialog-title">
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Đề xuất thăng chức</Grid>
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
                  <b> Số {employee?.id}/ QĐ - BN</b>
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
                        moment(new Date(dataProcess?.promotionDay))
                          .format("DD/MM/YYYY")
                          .split("/")[0]
                      }{" "}
                      tháng{" "}
                      {
                        moment(new Date(dataProcess?.promotionDay))
                          .format("DD/MM/YYYY")
                          .split("/")[1]
                      }{" "}
                      năm{" "}
                      {
                        moment(new Date(dataProcess?.promotionDay))
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
              <em>V/v thăng chức.</em>
            </Typography>
            <div className="fex-center">
              <Typography fontWeight="bold" className="text-overflow">
                <b>HỘI ĐỒNG THÀNH VIÊN CÔNG TY OCEANTECH</b>
              </Typography>
            </div>
            <Typography>
              <em>
                {" "}
                - Căn cứ Luật Doanh nghiệp 2020 và các văn bản hướng dẫn thi
                hành.
              </em>
            </Typography>
            <Typography>
              <em>
                - Căn cứ Điều lệ Công ty <b>OCEANTECH.</b>
              </em>
            </Typography>
            <Typography>
              <em>- Căn cứ yêu cầu hoạt động sản xuất kinh doanh.</em>
            </Typography>
            <Typography>
              <em>
                - Xét năng lực, phẩm chất và trình độ của Ông/Bà{" "}
                <b>{employee?.name}.</b>
              </em>
            </Typography>
            <Typography
              className="flex-center line-height-25"
              fontWeight="bold"
            >
              <b>QUYẾT ĐỊNH</b>
            </Typography>
            <Typography>
              <b>Điều 1:</b> Bổ nhiệm chức danh{" "}
              <b>
                {
                  EMPLOYEE_POSITION?.find(
                    (item) => item?.id === dataProcess?.newPosition
                  )?.name
                }
              </b>{" "}
              đối với:
            </Typography>
            <Typography>
              - Ông/Bà: <b>{employee?.name}</b>. Giới tính:{" "}
              {employee?.gender === 0 ? "Nữ" : "Nam"}.
            </Typography>
            <Typography>
              - Sinh ngày:{" "}
              {moment(new Date(employee?.dateOfBirth)).format("DD/MM/YYYY")}.
            </Typography>
            <Typography>
              - Số chứng minh nhân dân/Thẻ căn cước công dân:{" "}
              {employee?.citizenIdentificationNumber}. Nơi cấp:{" "}
              {employee?.placeOfIssueCard}. Ngày cấp:{" "}
              {moment(new Date(employee?.dateOfIssuanceCard)).format(
                "DD/MM/YYYY"
              )}
              .
            </Typography>
            <Typography>
              - Nơi đăng ký hộ khẩu thường trú: {employee?.address}.
            </Typography>
            <Typography>- Nơi ở hiện tại: {employee?.address}.</Typography>
            <Typography>
              <b>Điều 2: </b>Quyền và nghĩa vụ
            </Typography>
            <Typography>
              - Thực hiện quyền và nghĩa vụ của cấp bậc được bổ nhiệm theo quy.
              định của công ty.
            </Typography>
            <Typography>
              <b>Điều 3: </b>Hiệu lực thi hành
            </Typography>
            <Typography>
              - Ông/Bà có tên tại Điều 1 và các cơ quan, tổ chức, cá nhân liên
              quan chịu trách nhiệm thi hành quyết định này.
            </Typography>
            <Typography>Quyết định có hiệu lực kể từ ngày ký.</Typography>
            <Box className="flex-between mt-32">
              <Box>
                <Typography fontWeight="bold" fontStyle="italic">
                  <b>Nơi Nhận:</b>
                </Typography>
                <Typography>
                  <em>
                    -Ông/Bà:
                    {
                      <b>
                        {employee?.leaderName}
                      </b>
                    }
                    .
                  </em>
                </Typography>
                <Typography>
                  <em>-Cơ quan, tổ chức, cá nhân liên quan.</em>
                </Typography>
                <Typography>
                  <em>-Lưu HS,VP.</em>
                </Typography>
              </Box>
              <Box>
                <div className="flex-center mt-32">
                  <em>
                    <Typography
                      className="text-overflow line-height-25"
                      fontStyle="italic"
                    >
                      Hà Nội, ngày{" "}
                      {
                        moment(new Date(dataProcess?.promotionDay))
                          .format("DD/MM/YYYY")
                          .split("/")[0]
                      }{" "}
                      tháng{" "}
                      {
                        moment(new Date(dataProcess?.promotionDay))
                          .format("DD/MM/YYYY")
                          .split("/")[1]
                      }{" "}
                      năm{" "}
                      {
                        moment(new Date(dataProcess?.promotionDay))
                          .format("DD/MM/YYYY")
                          .split("/")[2]
                      }
                    </Typography>
                  </em>
                </div>
                <Typography fontWeight="bold" className="flex-center">
                  <b>TM. HỘI ĐỒNG THÀNH VIÊN</b>
                </Typography>
                <Typography fontWeight="bold" className="flex-center mt-2">
                  <b>Chủ tịch Hội đồng thành viên</b>
                </Typography>
                <Typography fontStyle="italic" className="flex-center">
                  (Ký tên, đóng dấu)
                </Typography>
                {dataProcess?.processStatus === '3' && (
                  <div className="mt-30 flex-center">
                    <span className="sign-text ">{employee?.leaderName}</span>
                  </div>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="flex flex-center my-20">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCloseDialog}
        >
          {action === 'view' ? 'Đóng' : 'Hủy'}
        </Button>
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
            onClick={handleSubmitProcess}
          >
            {dataProcess?.id ? "Lưu" : "Thêm"}
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
          setOpen={handleCloseDialog}
          setOpenForm={setOpen}
          employee={employee}
          data={dataProcess}
          type='process'
          handleCloseDialog={handleCloseDialog}
        />
      )}
      {isLeaderActionDialogOpen && (
        <LeaderActionDialog
          open={isLeaderActionDialogOpen}
          employee={employee}
          handleCloseRegisterDialog={handleCloseForm}
          setOpen={setIsLeaderActionDialogOpen}
          action={actionLeader}
          handleApprove={handleApproveProcess}
          handleReject={handleRejectProcess}
          handleRequest={handleRequestProcess}
        />
      )}
    </Dialog>
  );
};

export default FormProcess;
