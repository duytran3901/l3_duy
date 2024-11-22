import { Button, DialogActions, Grid, IconButton, MenuItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Notifications as NotificationsIcon,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { TextValidator, ValidatorForm, SelectValidator } from "react-material-ui-form-validator";
import moment from "moment";
import { ConfirmationDialog } from "egret";
// import RequestEmployeeDialog from "app/views/organisms/requestDialog/RequestEmployeeDialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EMPLOYEE_POSITION, UPDATE_EMPLOYEE_STATUS } from "app/constants/constants";
import CustomTable from "app/views/components/Custom/CustomTable";
import { CustomColumnsProcess } from "app/views/components/Custom/CustomColumns";
import { PROCESS } from "app/redux/actions/actions";
import FormProcess from "app/views/components/Form/FormProcess";
// import FormProcessIncrease from "app/views/components/Form/FormProcessIncrease";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const TabProcess = (props) => {
  const { employee } = props;
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [process, setProcess] = useState({
    promotionDay: moment().format("YYYY-MM-DD"),
    currentPosition: 1
  });
  const { processList, totalElements, reload } = useSelector(state => state.process);
  const [isOpenFormProcess, setIsOpenFormProcess] = useState(false);
  const [isConfirmDeleteProcessOpen, setIsConfirmDeleteProcessOpen] = useState(false);
  const [openAdditionalDialog, setOpenAdditionalDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [disable, setDisable] = useState(false);
  const [oldProcessApproved, setOldProcessApproved] = useState();
  const [isSendLeader, setIsSendLeader] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);
  const [checkResponseLeader, setCheckResponseLeader] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState();
  const [idProcessDelete, setIdProcessDelete] = useState(0);
  const [action, setAction] = useState('');
  const dispatch = useDispatch();
  const dataTable = processList?.map((process) => ({ ...process }));

  const updatePage = () => {
    if (employee?.id) {
      dispatch({ type: PROCESS.GET_PROCESS_LIST, payload: { employeeId: employee.id } });
    }
  };

  useEffect(() => {
    updatePage();
  }, [page, pageSize, reload]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isGreaterThanOldProcess', (value) => {
      if (!value) return true;
      return parseFloat(value) > parseFloat(process?.currentPosition);
    });
    return () => {
      ValidatorForm.removeValidationRule('isGreaterThanOldProcess');
    };
  }, [process?.currentPosition]);

  useEffect(() => {
    const oldProcess = processList.find((item) => item.processStatus === 3);
    if (oldProcess) {
      setProcess({
        ...process,
        currentPosition: oldProcess.newPosition
      });
    } else {
      setProcess({
        ...process,
        currentPosition: 1
      });
    }
  }, [processList]);


  const resetProcess = () => {
    setProcess({
      currentPosition: process.currentPosition,
      promotionDay: moment().format("YYYY-MM-DD"),
    });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProcess({
      ...process,
      [name]: value
    });
  };

  const handleBlurInput = (e) => {
    const { name, value } = e.target;
    const inputValue = value.trim();
    setProcess({
      ...process,
      [name]: inputValue
    });
  };

  const handleEditProcess = (rowData) => {
    if (rowData.currentPosition === process?.currentPosition) {
      setProcess(rowData);
    } else {
      toast.error("Chức vụ hiện tại không đúng!");
    }
  };

  const handleOpenDialogFormProcess = (rowData) => {
    setProcess(rowData);
    setIsOpenFormProcess(true);
    setAction('sendLeader');
  };

  const handleViewFormProcess = (item) => {
    setIsSendLeader(false);
    setProcess(item);
    setIsOpenFormProcess(true);
    setAction('view');
  };

  const handleCloseDialogFormProcess = () => {
    setIsOpenFormProcess(false);
    resetProcess();
  };

  const handleAdditional = (item) => {
    setProcess(item);
    setOpenAdditionalDialog(true);
  };
  const handleCloseAdditional = () => {
    resetProcess();
    setOpenAdditionalDialog(false);
  };
  const handleReject = (item) => {
    setProcess(item);
    setOpenRejectDialog(true);
  };
  const handleCloseRejectDialog = () => {
    resetProcess();
    setOpenRejectDialog(false);
  };

  const handleClickDelete = (rowData) => {
    setIsConfirmDeleteProcessOpen(true);
    setIdProcessDelete(rowData?.id);
  };

  const handleDeleteProcess = (id) => {
    dispatch({ type: PROCESS.DELETE_PROCESS, payload: id });
    setIsConfirmDeleteProcessOpen(false);
    setIdProcessDelete(0);
  }

  const handleSubmit = () => {
    handleOpenDialogFormProcess();
    setProcess(process);
    // setIsSendLeader(true);
  };

  const Action = ({ rowData }) => {
    return (
      <div>
        {UPDATE_EMPLOYEE_STATUS.EDIT.includes(rowData?.processStatus) && (
          <IconButton size="small" onClick={() => handleEditProcess(rowData)}>
            <EditIcon color="primary" fontSize="small" />
          </IconButton>
        )}
        {UPDATE_EMPLOYEE_STATUS.VIEW_PROCESS.includes(rowData?.processStatus) && (
          <IconButton size="small">
            <VisibilityIcon
              color="secondary"
              fontSize="small"
              onClick={() => handleViewFormProcess(rowData)}
            />
          </IconButton>
        )}
        {UPDATE_EMPLOYEE_STATUS.ADDITIONAL.includes(rowData?.processStatus) && (
          <IconButton size="small">
            <NotificationsIcon
              color="secondary"
              fontSize="small"
              onClick={() => handleAdditional(rowData)}
            />
          </IconButton>
        )}
        {UPDATE_EMPLOYEE_STATUS.REJECT.includes(rowData?.processStatus) && (
          <IconButton size="small">
            <NotificationsIcon
              color="secondary"
              fontSize="small"
              onClick={() => handleReject(rowData)}
            />
          </IconButton>
        )}
        {UPDATE_EMPLOYEE_STATUS.REMOVE.includes(rowData?.processStatus) && (
          <IconButton size="small">
            <DeleteIcon
              color="error"
              fontSize="small"
              onClick={() => handleClickDelete(rowData)}
            />
          </IconButton>
        )}
      </div>
    );
  };

  const columns = CustomColumnsProcess({ Action: Action, page, pageSize });

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} className="mb-30">
        <Grid container spacing={2} lg={12} md={12}>
          <Grid item md={2} sm={6} xs={6}>
            <TextValidator
              className="w-100"
              label={
                <span className="font pr-10 font-size-13">
                  <span className="span-required"> * </span>
                  Ngày đề xuất
                </span>
              }
              onChange={e => handleChangeInput(e)}
              onBlur={e => handleBlurInput(e)}
              type="date"
              name="promotionDay"
              size="small"
              variant="outlined"
              value={process?.promotionDay ? moment(process?.promotionDay).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")}
              validators={[
                "required"
              ]}
              errorMessages={[
                "Trường này bắt buộc nhập"
              ]}
              inputProps={{
                min: process?.promotionDay ? moment(process?.promotionDay).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")
              }}
            />
          </Grid>
          <Grid item md={2} sm={6} xs={6}>
            <TextValidator
              disabled
              className="w-100"
              label={<span className="font font-size-13">Chức vụ hiện tại</span>}
              type="text"
              name="currentPosition"
              size="small"
              variant="outlined"
              value={EMPLOYEE_POSITION.find((item) => item.id === process?.currentPosition)?.name}
              validators={[
                "required"
              ]}
              errorMessages={[
                "Trường này bắt buộc nhập"
              ]}
            />
          </Grid>
          <Grid item md={2} sm={6} xs={6}>
            <SelectValidator
              className="w-100"
              label={
                <span className="font">
                  <span className="span-required"> * </span>
                  Chức vụ đề xuất
                </span>
              }
              onChange={e => handleChangeInput(e)}
              name="newPosition"
              size="small"
              variant="outlined"
              value={process?.newPosition || ''}
              validators={[
                "required",
                "isGreaterThanOldProcess"
              ]}
              errorMessages={[
                "Trường này bắt buộc chọn",
                "Chức vụ mới phải lớn hơn chức vụ hiện tại"
              ]}
            >
              {EMPLOYEE_POSITION?.map((position) => (
                <MenuItem key={position.id} value={position.id}>
                  {position.name}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
          <Grid item md={4} sm={6} xs={6}>
            <TextValidator
              className="w-100"
              label={
                <span className="font pr-10  font-size-13">
                  <span className="span-required"> * </span>
                  Ghi chú
                </span>
              }
              onChange={e => handleChangeInput(e)}
              onBlur={e => handleBlurInput(e)}
              type="text"
              name="note"
              size="small"
              variant="outlined"
              value={process?.note || ''}
              placeholder='Ghi chú'
              validators={[
                "required",
              ]}
              errorMessages={[
                "Trường này bắt buộc nhập",
              ]}
            />
          </Grid>
          <DialogActions className="text-center flex-top">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={disableSubmit}
            >
              Lưu
            </Button>
            <Button variant="contained" color="secondary" onClick={resetProcess}>
              Hủy
            </Button>
          </DialogActions>
        </Grid>
      </ValidatorForm>
      <div className="mt-6">
        <CustomTable
          data={totalElements <= pageSize ? dataTable : dataTable.slice(page * pageSize, page * pageSize + pageSize)}
          columns={columns}
          total={totalElements}
          pageSize={pageSize}
          page={page}
          setPageSize={setPageSize}
          setPage={setPage}
          rowsPerPageOptions={[1, 2, 3, 5, 10]}
          height='calc(100vh - 556px)'
        />
      </div>
      {isOpenFormProcess && (
        <FormProcess
          open={isOpenFormProcess}
          setOpen={setIsOpenFormProcess}
          resetProcess={resetProcess}
          dataProcess={process}
          employee={employee}
          isSendLeader={isSendLeader}
          checkStatus={checkStatus}
          testCheck={checkResponseLeader}
          action={action}
        />
      )}
      {isConfirmDeleteProcessOpen && (
        <ConfirmationDialog
          title="Bạn có chắc chắn xóa không?"
          open={isConfirmDeleteProcessOpen}
          onConfirmDialogClose={() => setIsConfirmDeleteProcessOpen(false)}
          onYesClick={() => handleDeleteProcess(idProcessDelete)}
          Yes='Có'
          No='Không'
        />
      )}
      {/*{openAdditionalDialog && (
        <RequestEmployeeDialog
          open={openAdditionalDialog}
          handleStatusClose={handleCloseAdditional}
          note={process?.additionalRequest}
          title={"Yêu cầu bổ sung"}
        />
      )}
      {openRejectDialog && (
        <RequestEmployeeDialog
          open={openRejectDialog}
          handleStatusClose={handleCloseRejectDialog}
          note={process?.reasonForRefusal}
          title={"Lí do từ chối"}
        />
      )} */}
    </div>
  );
};
export default TabProcess;
