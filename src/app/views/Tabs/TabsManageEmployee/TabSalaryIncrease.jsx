import { Button, DialogActions, Grid, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Notifications as NotificationsIcon,
} from "@material-ui/icons";
// import { CustomColumnsSalaryIncrease } from "app/views/atoms/customColums";
// import CustomTable from "app/views/atoms/customTable";
import { useDispatch, useSelector } from "react-redux";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import { today } from "app/component/validator";
import moment from "moment";
// import FormSalary from "../formRegister/FormSalaryIncrease";
import { ConfirmationDialog } from "egret";
// import RequestEmployeeDialog from "app/views/organisms/requestDialog/RequestEmployeeDialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_EMPLOYEE_STATUS } from "app/constants/constants";
import CustomTable from "app/views/components/Custom/CustomTable";
import { CustomColumnsSalaryIncrease } from "app/views/components/Custom/CustomColumns";
import { SALARY } from "app/redux/actions/actions";
import FormSalaryIncrease from "app/views/components/Form/FormSalaryIncrease";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const TabSalaryIncrease = (props) => {
  const { employee } = props;
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [salary, setSalary] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    oldSalary: 0,
  });
  const { salarys, totalElements, reload } = useSelector(state => state.salary);
  const [isOpenFormSalary, setIsOpenFormSalary] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isConfirmDeleteSalaryOpen, setIsConfirmDeleteSalaryOpen] = useState(false);
  const [openAdditionalDialog, setOpenAdditionalDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [disable, setDisable] = useState(false);
  const [oldSalaryApproved, setOldSalaryApproved] = useState();
  const [isSendLeader, setIsSendLeader] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);
  const [checkResponseLeader, setCheckResponseLeader] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState();
  const [idSalaryDelete, setIdSalaryDelete] = useState(0);
  const [action, setAction] = useState('');
  const dispatch = useDispatch();
  const dataTable = salarys?.map((salary) => ({ ...salary }));

  const updatePage = () => {
    if (employee?.id) {
      dispatch({ type: SALARY.GET_SALARYS, payload: { employeeId: employee.id } });
    }
  };

  useEffect(() => {
    updatePage();
  }, [page, pageSize, reload]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isGreaterThanOldSalary', (value) => {
      if (!value) return true;
      return parseFloat(value) > parseFloat(salary?.oldSalary);
    });
    return () => {
      ValidatorForm.removeValidationRule('isGreaterThanOldSalary');
    };
  }, [salary?.oldSalary]);

  // useEffect(() => {
  //   const checkSalaryStatus = salarys.some(
  //     (item) =>
  //       item.salaryIncreaseStatus === 2 || item.salaryIncreaseStatus === 4
  //   );
  //   const checkResponseLeader = salarys.some(
  //     (item) => item.salaryIncreaseStatus === 4
  //   );
  //   setCheckResponseLeader(checkResponseLeader);
  //   setCheckStatus(checkSalaryStatus);
  //   setDisableSubmit(checkSalaryStatus);
  //   const approvedSalary = salarys.find(
  //     (item) => item.salaryIncreaseStatus === 3
  //   );
  //   setSalary((prevForm) => ({
  //     ...prevForm,
  //     oldSalary: approvedSalary ? approvedSalary.newSalary : 0,
  //     startDate: prevForm.startDate || moment().format("YYYY-MM-DD"),
  //   }));
  //   setOldSalaryApproved(approvedSalary ? approvedSalary.newSalary : 0);
  //   setDisable(!!approvedSalary);
  // }, [salarys]);

  useEffect(() => {
    const oldSalary = salarys.find((item) => item.salaryIncreaseStatus === 3);
    if (oldSalary) {
      setSalary({
        ...salary,
        oldSalary: oldSalary.newSalary
      });
    } else {
      setSalary({
        ...salary,
        oldSalary: 0
      });
    }
  }, [salarys]);


  const resetSalary = () => {
    setSalary({
      oldSalary: salary.oldSalary,
      startDate: moment().format("YYYY-MM-DD"),
    });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSalary({
      ...salary,
      [name]: value
    });
  };

  const handleBlurInput = (e) => {
    const { name, value } = e.target;
    const inputValue = value.trim();
    setSalary({
      ...salary,
      [name]: inputValue
    });
    // if (salary?.newSalary) {
    //   setSalary({
    //     ...salary,
    //     newSalary: Number(salary.newSalary)
    //   })
    // }
  };

  const handleEditSalary = (rowData) => {
    if (rowData?.oldSalary === salary?.oldSalary) {
      // if (checkResponseLeader) {
      //   setDisableSubmit(false);
      // }
      // const formattedStartDate = rowData.startDate
      //   ? moment(rowData.startDate).format("YYYY-MM-DD")
      //   : moment().format("YYYY-MM-DD");
      setSalary(rowData);
    } else {
      toast.error("Mức lương cũ không đúng!");
    }
  };

  const handleOpenDialogFormSalary = (rowData) => {
    setSalary(rowData);
    setIsOpenFormSalary(true);
    setAction('sendLeader')
  };

  const handleViewFormSalary = (item) => {
    setIsSendLeader(false);
    setSalary(item);
    setIsOpenFormSalary(true);
    setAction('view');
  };

  const handleAdditional = (item) => {
    setSalary(item);
    setOpenAdditionalDialog(true);
  };
  const handleCloseAdditional = () => {
    resetSalary();
    setOpenAdditionalDialog(false);
  };
  const handleReject = (item) => {
    setSalary(item);
    setOpenRejectDialog(true);
  };
  const handleCloseRejectDialog = () => {
    resetSalary();
    setOpenRejectDialog(false);
  };

  const handleClickDelete = (rowData) => {
    setIsConfirmDeleteSalaryOpen(true);
    setIdSalaryDelete(rowData?.id);
  };

  const handleDeleteSalary = (id) => {
    dispatch({ type: SALARY.DELETE_SALARY, payload: id });
    setIsConfirmDeleteSalaryOpen(false);
    setIdSalaryDelete(0);
  }

  const handleSubmit = () => {
    handleOpenDialogFormSalary();
    setSalary(salary);
    // setIsSendLeader(true);
  };

  const Action = ({ rowData }) => {
    return (
      <div>
        {UPDATE_EMPLOYEE_STATUS.EDIT.includes(rowData.salaryIncreaseStatus) && (
          <IconButton size="small" onClick={() => handleEditSalary(rowData)}>
            <EditIcon color="primary" fontSize="small" />
          </IconButton>
        )}
        {UPDATE_EMPLOYEE_STATUS.VIEW_PROCESS.includes(rowData.salaryIncreaseStatus) && (
          <IconButton size="small">
            <VisibilityIcon
              color="secondary"
              fontSize="small"
              onClick={() => handleViewFormSalary(rowData)}
            />
          </IconButton>
        )}
        {UPDATE_EMPLOYEE_STATUS.ADDITIONAL.includes(rowData.salaryIncreaseStatus) && (
          <IconButton size="small">
            <NotificationsIcon
              color="secondary"
              fontSize="small"
              onClick={() => handleAdditional(rowData)}
            />
          </IconButton>
        )}
        {UPDATE_EMPLOYEE_STATUS.REJECT.includes(rowData.salaryIncreaseStatus) && (
          <IconButton size="small">
            <NotificationsIcon
              color="secondary"
              fontSize="small"
              onClick={() => handleReject(rowData)}
            />
          </IconButton>
        )}
        {UPDATE_EMPLOYEE_STATUS.REMOVE.includes(rowData.salaryIncreaseStatus) && (
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

  const columns = CustomColumnsSalaryIncrease({ Action: Action, page, pageSize });

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
                  Ngày tăng lương
                </span>
              }
              onChange={e => handleChangeInput(e)}
              onBlur={e => handleBlurInput(e)}
              type="date"
              name="startDate"
              size="small"
              variant="outlined"
              value={salary?.startDate ? moment(salary?.startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")}
              validators={[
                "required"
              ]}
              errorMessages={[
                "Trường này bắt buộc nhập"
              ]}
              inputProps={{
                min: salary?.startDate ? moment(salary?.startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")
              }}
            />
          </Grid>
          <Grid item md={2} sm={6} xs={6}>
            <TextValidator
              disabled
              className="w-100"
              label={<span className="font font-size-13">Mức lương cũ (VND)</span>}
              onChange={e => handleChangeInput(e)}
              onBlur={e => handleBlurInput(e)}
              type="number"
              name="oldSalary"
              size="small"
              variant="outlined"
              value={salary?.oldSalary || 0}
              placeholder="Mức lương cũ"
              validators={[
                "required"
              ]}
              errorMessages={[
                "Trường này bắt buộc nhập"
              ]}
            />
          </Grid>
          <Grid item md={2} sm={6} xs={6}>
            <TextValidator
              className="w-100"
              label={
                <span className="font font-size-13">
                  <span className="span-required"> * </span>
                  Mức lương mới (VND)
                </span>
              }
              onChange={e => handleChangeInput(e)}
              onBlur={e => handleBlurInput(e)}
              type="number"
              name="newSalary"
              size="small"
              variant="outlined"
              value={salary?.newSalary || ''}
              placeholder="Mức lương mới"
              validators={[
                "required",
                "isGreaterThanOldSalary"
              ]}
              errorMessages={[
                "Trường này bắt buộc nhập",
                "Mức lương mới phải lớn hơn mức lương cũ"
              ]}
            />
          </Grid>
          <Grid item md={2} sm={6} xs={6}>
            <TextValidator
              className="w-100"
              label={
                <span className="font pr-10 font-size-13">
                  <span className="span-required"> * </span>
                  Lý do
                </span>
              }
              onChange={e => handleChangeInput(e)}
              onBlur={e => handleBlurInput(e)}
              type="text"
              name="reason"
              size="small"
              variant="outlined"
              value={salary?.reason || ''}
              placeholder='Lý do'
              validators={[
                "required",
              ]}
              errorMessages={[
                "Trường này bắt buộc nhập",
              ]}
            />
          </Grid>
          <Grid item md={2} sm={6} xs={6}>
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
              value={salary?.note || ''}
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
            >
              Lưu
            </Button>
            <Button variant="contained" color="secondary" onClick={resetSalary}>
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
      {isOpenFormSalary && (
        <FormSalaryIncrease
          open={isOpenFormSalary}
          setOpen={setIsOpenFormSalary}
          resetSalary={resetSalary}
          dataSalaryIncrease={salary}
          employee={employee}
          isSendLeader={isSendLeader}
          checkStatus={checkStatus}
          testCheck={checkResponseLeader}
          action={action}
        />
      )}
      {isConfirmDeleteSalaryOpen && (
        <ConfirmationDialog
          title="Bạn có chắc chắn xóa không?"
          open={isConfirmDeleteSalaryOpen}
          onConfirmDialogClose={() => setIsConfirmDeleteSalaryOpen(false)}
          onYesClick={() => handleDeleteSalary(idSalaryDelete)}
          Yes='Có'
          No='Không'
        />
      )}
      {/*{openAdditionalDialog && (
        <RequestEmployeeDialog
          open={openAdditionalDialog}
          handleStatusClose={handleCloseAdditional}
          note={salary?.additionalRequest}
          title={"Yêu cầu bổ sung"}
        />
      )}
      {openRejectDialog && (
        <RequestEmployeeDialog
          open={openRejectDialog}
          handleStatusClose={handleCloseRejectDialog}
          note={salary?.reasonForRefusal}
          title={"Lí do từ chối"}
        />
      )} */}
    </div>
  );
};
export default TabSalaryIncrease;
