import React, { useEffect, useState } from "react";
import Icon from "@material-ui/core/Icon";
import {
  Box,
  Dialog,
  DialogActions,
  Grid,
  Input,
  Button,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
} from "@material-ui/core";
import "../../../../styles/components/_form.scss";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EMPLOYEE_POSITION } from "app/constants/constants";
import { useDispatch } from "react-redux";
import UpdateEmployeeSendLeaderDialog from "../Dialog/UpdateEmployeeSendLeaderDialog";
import RegisterEmployeeDialog from "../Dialog/RegisterEmployeeDialog";
import LeaderActionDialog from "../Dialog/LeaderActionDialog";
import { EMPLOYEE } from "app/redux/actions/actions";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const FormResignation = (props) => {
  const {
    setOpen,
    open,
    action,
    employee,
    handleCloseDialog
  } = props;
  const [formData, setFormData] = useState(employee || {});
  const [isSubmit, setIsSubmit] = useState(false);
  const [line, setLine] = useState([]);
  const [isLeaderActionDialogOpen, setIsLeaderActionDialogOpen] = useState(false);
  const [actionLeader, setActionLeader] = useState('');
  const [isOpenSendLeaderDialog, setIsOpenSendLeaderDialog] = useState(false);
  const [isRegisterEmployeeDialogOpen, setIsRegisterEmployeeDialogOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      ...formData,
      reasonForEnding: !action ? formData?.reasonForEnding : "",
    });
  }, [employee]);

  useEffect(() => {
    setFormData({
      ...formData,
      endDay: formData.endDay || moment().format("YYYY-MM-DD"),
    });
  }, []);

  const handleCloseForm = () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    event.persist();
    const { value, name } = event.target;
    if (name === "reasonForEnding") {
      setFormData({
        ...formData,
        reasonForEnding: value,
      });
      setIsSubmit(false);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    setLine(formData?.reasonForEnding?.split("\n"));
  }, [formData.reasonForEnding]);

  const handleSubmitEndStaff = () => {
    if (!formData?.endDay || !formData?.reasonForEnding) {
      toast.error("Lý do xin nghỉ trống!");
      setIsSubmit(true);
    } else {
      setIsOpenSendLeaderDialog(true);
      setIsSubmit(false);
    }
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

  const handleOpenDialogView = (rowData) => {
    setIsRegisterEmployeeDialogOpen(true);
  }

  const handleApproveResignation = (contentDialog) => {
    const updatedData = {
      ...employee,
      submitProfileStatus: '7',
      refuseEndProfileDay: contentDialog.content
    };
    dispatch({
      type: EMPLOYEE.UPDATE_EMPLOYEE,
      payload: {
        id: employee.id,
        data: updatedData
      }
    });
  };

  const handleRequestResignation = (contentDialog) => {
    const updatedData = {
      ...employee,
      submitProfileStatus: '8',
      additionalRequestTermination: contentDialog.content
    };
    dispatch({
      type: EMPLOYEE.UPDATE_EMPLOYEE,
      payload: {
        id: employee.id,
        data: updatedData
      }
    });
  };

  const handleRejectResignation = (contentDialog) => {
    const updatedData = {
      ...employee,
      submitProfileStatus: '9',
      reasonForRefuseEndProfile: contentDialog.content
    };
    dispatch({
      type: EMPLOYEE.UPDATE_EMPLOYEE,
      payload: {
        id: employee.id,
        data: updatedData
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseForm}
      fullWidth
      maxWidth={"md"}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Grid container justify="space-between" alignItems="center">
          <Grid item>Đơn xin nghỉ việc</Grid>
          <Grid item>
            <IconButton onClick={handleCloseForm}>
              <Icon color="secondary">close</Icon>
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent dividers className="wrapper-a4 mh-70">
        <Box className="A4">
          <Box className="A4-content text-justify">
            <Typography fontWeight="bold" className="flex-center">
              <b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b>
            </Typography>
            <Typography
              fontWeight="bold"
              className="flex-center heading-underline"
            >
              <b>Độc lập - Tự do - Hạnh phúc</b>
            </Typography>
            <Typography fontWeight="bold" className="flex-center mt-32">
              <b>ĐƠN XIN NGHỈ VIỆC</b>
            </Typography>
            <Typography className="mt-32">
              Kính gửi: Ban Giám đốc công ty <b>OCEANTECH</b>
            </Typography>
            <Typography>
              Tên tôi là: <b>{formData?.name}</b>
            </Typography>
            <Typography>
              Hiện tại đang là{" "}
              {
                EMPLOYEE_POSITION?.find(
                  (position) =>
                    position?.id === (formData?.currentPosition ?? 1)
                )?.name
              }{" "}
              tại công ty OCEANTECH<b></b>
            </Typography>
            <Typography>
              Tôi làm đơn này, đề nghị Ban Gián đốc cho tôi xin nghỉ việc từ
              ngày{" "}
              {
                moment(
                  new Date(
                    formData?.endDay ? formData?.endDay : formData?.endDay
                  )
                )
                  .format("DD/MM/YYYY")
                  .split("/")[0]
              }{" "}
              tháng{" "}
              {
                moment(
                  new Date(
                    formData?.endDay ? formData?.endDay : formData?.endDay
                  )
                )
                  .format("DD/MM/YYYY")
                  .split("/")[1]
              }{" "}
              năm{" "}
              {
                moment(
                  new Date(
                    formData?.endDay ? formData?.endDay : formData?.endDay
                  )
                )
                  .format("DD/MM/YYYY")
                  .split("/")[2]
              }
              .
              {action === 'sendLeader' && (
                <>
                  <Input
                    id="icon-button-date"
                    className="mr-4 ml-4"
                    style={{ width: "18px" }}
                    type="date"
                    inputProps={{
                      min: moment().format("YYYY-MM-DD"),
                      width: "20",
                    }}
                    name="endDay"
                    value={formData?.endDay || ""}
                    onChange={(e) => handleChange(e)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <span style={{ color: "red" }}> * </span>
                </>
              )}
              <br></br>
              {action !== 'sendLeader' && (
                <Typography>
                  Lý do xin nghỉ:
                  <span style={{ color: "red" }}> * </span>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: (formData?.reasonForEnding || "").replace(
                        /\n/g,
                        "<br />"
                      ),
                    }}
                  />
                </Typography>
              )}
              {action === 'sendLeader' && (
                <div className="relative">
                  <span
                    style={{
                      backgroundColor: "white",
                      zIndex: "1000",
                      transform: "translateY(-2px)",
                      color: isSubmit ? "red" : "black",
                    }}
                  >
                    Lý do xin nghỉ:
                    {formData?.reasonForEnding ? <></> : <span style={{ color: "red" }}> * </span>}
                  </span>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      color: isSubmit ? "red" : "black",
                    }}
                  >
                    <Input
                      className="no-padding custom-input"
                      name="reasonForEnding"
                      multiline
                      value={formData?.reasonForEnding || ""}
                      onChange={(e) => handleChange(e)}
                      style={{
                        fontFamily: "Times New Roman",
                        fontSize: "16px",
                        display: "block",
                        zIndex: "1000",
                        width: "100%",
                        outline: "unset",
                        position: "relative",
                      }}
                    />
                    {line?.map((item, index) => (
                      <span
                        key={index}
                        style={{
                          position: "absolute",
                          top: `${(1 / line.length) * 100 * index}%`,
                          right: "0",
                          left: "0",
                          width: "100%",
                          height: `${(1 / line.length) * 100}%`,
                          borderBottom: "1px dashed",
                          transform: "translateY(-2px)",
                          backgroundColor: "transparent",
                        }}
                      ></span>
                    ))}
                  </div>
                </div>
              )}
            </Typography>
            <Typography className="pb-12">
              Trong thời gian chờ đợi sự chấp thuận của Ban Giám đốc Công ty,
              tôi sẽ tiếp tục làm việc nghiêm túc và tiến hành bàn giao công
              việc cũng như tài sản cho người quản lý trực tiếp của tôi là
              ông/bà <b>{formData?.leaderName}</b>
            </Typography>
            <Typography>Tôi xin chân thành cảm ơn!</Typography>
            <Grid container>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <Typography className="flex-center">
                  <em>
                    Hà Nội, Ngày{" "}
                    {
                      moment(
                        new Date(
                          formData?.endDay
                            ? formData?.endDay
                            : formData?.endDay
                        )
                      )
                        .format("DD/MM/YYYY")
                        .split("/")[0]
                    }{" "}
                    tháng{" "}
                    {
                      moment(
                        new Date(
                          formData?.endDay
                            ? formData?.endDay
                            : formData?.endDay
                        )
                      )
                        .format("DD/MM/YYYY")
                        .split("/")[1]
                    }{" "}
                    năm{" "}
                    {
                      moment(
                        new Date(
                          formData?.endDay
                            ? formData?.endDay
                            : formData?.endDay
                        )
                      )
                        .format("DD/MM/YYYY")
                        .split("/")[2]
                    }
                  </em>
                </Typography>
                <Typography fontWeight="bold" className="flex-center my-8">
                  <b>NGƯỜI LÀM ĐƠN</b>
                </Typography>
                <Typography fontStyle="italic" className="flex-center ">
                  <em>(Ký, ghi rõ họ tên)</em>
                </Typography>
                <div className="mt-32 flex-center">
                  <span className="sign-text ">
                    {formData?.name ? formData?.name : ""}
                  </span>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="flex flex-center my-16">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCloseForm}
        >
          Hủy
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
            onClick={handleOpenDialogView}
          >
            Xem hồ sơ
          </Button>
        )}
        {action === 'leaderProcess' && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleLeaderClickRequest}
          >
            Yêu cầu bổ xung
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
            onClick={handleSubmitEndStaff}
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
          data={formData}
          type='resignation'
          handleCloseDialog={handleCloseDialog}
        />
      )}
      {isLeaderActionDialogOpen && (
        <LeaderActionDialog
          open={isLeaderActionDialogOpen}
          handleCloseRegisterDialog={handleCloseForm}
          setOpen={setIsLeaderActionDialogOpen}
          action={actionLeader}
          handleApprove={handleApproveResignation}
          handleReject={handleRejectResignation}
          handleRequest={handleRequestResignation}
        />
      )}
      {isRegisterEmployeeDialogOpen && (
        <RegisterEmployeeDialog
          open={isRegisterEmployeeDialogOpen}
          setOpen={setIsRegisterEmployeeDialogOpen}
          idEmployee={employee.id}
          action='view'
        />
      )}
    </Dialog>
  );
};

export default FormResignation;
