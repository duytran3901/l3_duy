import { Button, Grid, IconButton, MenuItem } from "@material-ui/core";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EMPLOYEE_POSITION, UPDATE_EMPLOYEE_STATUS } from "app/constants/constants";
import CustomTable from "app/views/components/Custom/CustomTable";
import { CustomColumnsProcess } from "app/views/components/Custom/CustomColumns";
import { PROCESS } from "app/redux/actions/actions";
import FormProcess from "app/views/components/Form/FormProcess";
import NotificationDialog from "app/views/components/Dialog/NotificationDialog";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const TabProcess = (props) => {
  const { employee, type } = props;
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [process, setProcess] = useState({
    promotionDay: moment().format("YYYY-MM-DD"),
    currentPosition: 1
  });
  const { processListByIdEmployee, totalElementsByIdEmployee, reload } = useSelector(state => state.process);
  const [isOpenFormProcess, setIsOpenFormProcess] = useState(false);
  const [isConfirmDeleteProcessOpen, setIsConfirmDeleteProcessOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  const [processSelected, setProcessSelected] = useState({});
  const [idProcessDelete, setIdProcessDelete] = useState(0);
  const [action, setAction] = useState('');
  const dispatch = useDispatch();
  const dataTable = processListByIdEmployee?.map((process) => ({ ...process }));

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
    const oldProcess = processListByIdEmployee.find((item) => item.processStatus === '3');
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
  }, [processListByIdEmployee]);


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

  const handleViewFormProcess = (rowData) => {
    setProcessSelected(rowData);
    setProcess(rowData);
    setIsOpenFormProcess(true);
    setAction('view');
  };

  const handleOpenDialogNotification = (rowData) => {
    setProcessSelected(rowData);
    setIsNotificationDialogOpen(true);
  }

  const handleClickDelete = (rowData) => {
    setIsConfirmDeleteProcessOpen(true);
    setIdProcessDelete(rowData?.id);
  };

  const handleDeleteProcess = (id) => {
    dispatch({ type: PROCESS.DELETE_PROCESS, payload: id });
    setIsConfirmDeleteProcessOpen(false);
    setIdProcessDelete(0);
    setProcess({});
  }

  const handleSubmit = () => {
    handleOpenDialogFormProcess();
    setProcess(process);
  };

  const Action = ({ rowData }) => {
    return (
      <div>
        {UPDATE_EMPLOYEE_STATUS.VIEW_PROCESS.includes(rowData?.processStatus) && (
          <IconButton size="small">
            <VisibilityIcon
              color="secondary"
              fontSize="small"
              onClick={() => handleViewFormProcess(rowData)}
            />
          </IconButton>
        )}
        {!type && (
          <>
            {UPDATE_EMPLOYEE_STATUS.EDIT.includes(rowData?.processStatus) && (
              <IconButton size="small" onClick={() => handleEditProcess(rowData)}>
                <EditIcon color="primary" fontSize="small" />
              </IconButton>
            )}
            {UPDATE_EMPLOYEE_STATUS.ADDITIONAL.includes(rowData?.processStatus) && (
              <IconButton size="small">
                <NotificationsIcon
                  color="secondary"
                  fontSize="small"
                  onClick={() => handleOpenDialogNotification(rowData)}
                />
              </IconButton>
            )}
            {UPDATE_EMPLOYEE_STATUS.REJECT.includes(rowData?.processStatus) && (
              <IconButton size="small">
                <NotificationsIcon
                  color="secondary"
                  fontSize="small"
                  onClick={() => handleOpenDialogNotification(rowData)}
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
          </>
        )}
      </div>
    );
  };

  const columns = CustomColumnsProcess({ Action: Action, page, pageSize });

  return (
    <div>
      {!type && (
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
                  "maxStringLength:1000"
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập",
                  "Nội dung không được vượt quá 1000 ký tự"
                ]}
              />
            </Grid>
            <Grid item md={2} sm={6} xs={6} className="flex-center">
              <Button
                variant="contained"
                color="secondary"
                onClick={resetProcess}
                className="mr-8"
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Lưu
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      )}
      <div className="mt-6">
        <CustomTable
          data={totalElementsByIdEmployee <= pageSize ? dataTable : dataTable.slice(page * pageSize, page * pageSize + pageSize)}
          columns={columns}
          total={totalElementsByIdEmployee}
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
          action={action}
        />
      )}
      {isConfirmDeleteProcessOpen && (
        <ConfirmationDialog
          title="Bạn có chắc chắn xóa không?"
          open={isConfirmDeleteProcessOpen}
          onConfirmDialogClose={() => setIsConfirmDeleteProcessOpen(false)}
          onYesClick={() => handleDeleteProcess(idProcessDelete)}
          Yes='Xác nhận'
          No='Hủy'
        />
      )}
      {isNotificationDialogOpen && (
        <NotificationDialog
          open={isNotificationDialogOpen}
          setOpen={setIsNotificationDialogOpen}
          data={processSelected}
          type='process'
        />
      )}
    </div>
  );
};
export default TabProcess;
