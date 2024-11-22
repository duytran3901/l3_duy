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
import { useDispatch } from "react-redux";
import { SUBMIT_UPDATE_STATUS, TYPE_PROPOSAL } from "app/constants/constants";
import { PROPOSAL } from "app/redux/actions/actions";
import UpdateEmployeeSendLeaderDialog from "../Dialog/UpdateEmployeeSendLeaderDialog";
import LeaderActionDialog from "../Dialog/LeaderActionDialog";

const FormProposal = (props) => {
  const {
    open,
    setOpen,
    employee,
    dataProposal,
    resetProposal,
    action
  } = props;
  const dispatch = useDispatch();
  // const [statusForm, setStatusForm] = useState(TYPE_ADD.index);
  const [isOpenSendLeaderDialog, setIsOpenSendLeaderDialog] = useState(false);
  const [isLeaderActionDialogOpen, setIsLeaderActionDialogOpen] = useState(false);
  const [actionLeader, setActionLeader] = useState('');
  const [
    openLeaderSendNotifyProposalDialog,
    setOpenLeaderSendNotifyProposalDialog,
  ] = useState(false);

  const handleCloseDialog = () => {
    setOpen(false);
    if (resetProposal) resetProposal();
  };
  
  const handleCloseForm = () => {
    setOpen(false);
  }

  const handleSubmitProposal = () => {
    if (dataProposal?.id) {
      dispatch({
        type: PROPOSAL.UPDATE_PROPOSAL,
        payload: {
          id: dataProposal.id,
          data: dataProposal
        }
      })
    } else {
      dispatch({
        type: PROPOSAL.CREATE_PROPOSAL,
        payload: {
          employeeId: employee?.id,
          data: [dataProposal]
        }
      })
    }
    handleCloseDialog();
  };

  const handleSendLeader = () => {
    setIsOpenSendLeaderDialog(true);
  };
  const handleCloseLeaderSendNotifyProposalDialog = () => {
    setOpenLeaderSendNotifyProposalDialog(false);
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
  
  const handleApproveProposal = (contentDialog) => {
    const updatedData = {
      ...dataProposal,
      proposalStatus: '3',
      acceptanceDate: contentDialog.content
    };
    dispatch({
      type: PROPOSAL.UPDATE_PROPOSAL,
      payload: {
        id: dataProposal.id,
        data: updatedData
      }
    });
  };

  const handleRequestProposal = (contentDialog) => {
    const updatedData = {
      ...dataProposal,
      proposalStatus: '4',
      additionalRequest: contentDialog.content
    };
    dispatch({
      type: PROPOSAL.UPDATE_PROPOSAL,
      payload: {
        id: dataProposal.id,
        data: updatedData
      }
    });
  };

  const handleRejectProposal = (contentDialog) => {
    const updatedData = {
      ...dataProposal,
      proposalStatus: '5',
      reasonForRefusal: contentDialog.content
    };
    dispatch({
      type: PROPOSAL.UPDATE_PROPOSAL,
      payload: {
        id: dataProposal.id,
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
                        moment(new Date(dataProposal?.proposalDate))
                          .format("DD/MM/YYYY")
                          .split("/")[0]
                      }{" "}
                      tháng{" "}
                      {
                        moment(new Date(dataProposal?.proposalDate))
                          .format("DD/MM/YYYY")
                          .split("/")[1]
                      }{" "}
                      năm{" "}
                      {
                        moment(new Date(dataProposal?.proposalDate))
                          .format("DD/MM/YYYY")
                          .split("/")[2]
                      }
                      .
                    </em>
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <div className="flex-center">
              <Typography
                className="text-overflow mt-32 mb-8"
                fontWeight="bold"
              >
                <b>ĐƠN ĐỀ XUẤT</b>
              </Typography>
            </div>
            <Typography>
              {" "}
              <b>Kính gửi:</b> - Ban giám đốc Công ty <b>OCEANTECH</b>.
            </Typography>
            <Typography>
              Tôi tên là <b>{employee?.name}</b>, hiện đang làm nhân viên IT của
              Công ty <b>OCEANTECH</b>.
            </Typography>
            <Typography className="pb-12">
              Hôm nay tôi viết đơn này{" "}
              <b>
                {TYPE_PROPOSAL.find((item) => item.id === dataProposal?.type)?.name}
              </b>
              {" "} với nội dung như sau: {" "}
              <b>{dataProposal?.content}</b>
            </Typography>
            <Typography>
              Trong quá trình làm việc tại Công ty <b>OCEANTECH</b>, tôi nhận
              thấy đề xuất của tôi giúp cải thiện.
            </Typography>
            <Typography>
              {" "}
              - Giúp cải thiện được năng xuất làm việc, tinh thần thoải mái.
            </Typography>
            <Typography>
              {" "}
              - Tạo một không gian lành mạnh, cạnh tranh cao trong công việc.
            </Typography>
            <Typography className="pb-12">
              Tôi viết đơn này mong ban lãnh đạo Công ty <b>OCEANTECH</b>, xem
              xét đề xuất của tôi.
            </Typography>
            <Typography>Xin trân trọng cảm ơn!</Typography>
            <Box className="flex-between mt-32">
              <Box className="px-32">
                <Typography fontWeight="bold" fontStyle="italic">
                  <b>NGƯỜI LÀM ĐƠN</b>
                </Typography>
                <Typography fontStyle="italic" className="flex-center">
                  <em> (Ký rõ họ tên)</em>
                </Typography>
                <div className="mt-32 flex-center">
                  <span className="sign-text ">
                    {employee?.name ? employee?.name : ""}
                  </span>
                </div>
              </Box>

              <Box className="px-32">
                <div className="flex-center">
                  <em>
                    <Typography
                      className="text-overflow line-height-25"
                      fontStyle="italic"
                    >
                      Hà Nội, ngày{" "}
                      {
                        moment(new Date(dataProposal?.proposalDate))
                          .format("DD/MM/YYYY")
                          .split("/")[0]
                      }{" "}
                      tháng{" "}
                      {
                        moment(new Date(dataProposal?.proposalDate))
                          .format("DD/MM/YYYY")
                          .split("/")[1]
                      }{" "}
                      năm{" "}
                      {
                        moment(new Date(dataProposal?.proposalDate))
                          .format("DD/MM/YYYY")
                          .split("/")[2]
                      }
                    </Typography>
                  </em>
                </div>
                <Typography fontWeight="bold" className="flex-center mt-2">
                  <b>GIÁM ĐỐC</b>
                </Typography>
                <Typography fontStyle="italic" className="flex-center">
                  <em>(Ký tên, đóng dấu)</em>
                </Typography>
                {dataProposal?.proposalStatus === 3 && (
                  <div className="mt-32 flex-center">
                    <span className="sign-text ">
                      <b>{employee?.leaderName}</b>
                    </span>
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
            onClick={handleSubmitProposal}
          >
            {dataProposal?.id ? "Lưu" : "Thêm"}
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
          data={dataProposal}
          type='proposal'
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
          handleApprove={handleApproveProposal}
          handleReject={handleRejectProposal}
          handleRequest={handleRequestProposal}
        />
      )}
    </Dialog>
  );
};

export default FormProposal;
