import { Button, Grid, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Notifications as NotificationsIcon,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import moment from "moment";
import { ConfirmationDialog } from "egret";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_EMPLOYEE_STATUS } from "app/constants/constants";
import CustomTable from "app/views/components/Custom/CustomTable";
import { CustomColumnsSalaryIncrease } from "app/views/components/Custom/CustomColumns";
import { SALARY } from "app/redux/actions/actions";
import FormSalaryIncrease from "app/views/components/Form/FormSalaryIncrease";
import NotificationDialog from "app/views/components/Dialog/NotificationDialog";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const TabSalaryIncrease = (props) => {
  const { employee, type } = props;
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [salary, setSalary] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    oldSalary: 0,
  });
  const { salarysByIdEmployee, totalElementsByIdEmployee, reload } = useSelector(state => state.salary);
  const [isOpenFormSalary, setIsOpenFormSalary] = useState(false);
  const [isConfirmDeleteSalaryOpen, setIsConfirmDeleteSalaryOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  const [salarySelected, setSalarySelected] = useState({});
  const [idSalaryDelete, setIdSalaryDelete] = useState(0);
  const [action, setAction] = useState('');
  const dispatch = useDispatch();
  const dataTable = salarysByIdEmployee?.map((salary) => ({ ...salary }));

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

  useEffect(() => {
    const oldSalary = salarysByIdEmployee.find((item) => item.salaryIncreaseStatus === 3);
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
  }, [salarysByIdEmployee]);


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
  };

  const handleEditSalary = (rowData) => {
    if (rowData?.oldSalary === salary?.oldSalary) {
      setSalary(rowData);
    } else {
      toast.error("Mức lương cũ không đúng!");
    }
  };

  const handleViewFormSalary = (rowData) => {
    setSalary(rowData);
    setSalarySelected(rowData);
    setIsOpenFormSalary(true);
    setAction('view');
  };

  const handleOpenDialogNotification = (rowData) => {
    setSalarySelected(rowData);
    setIsNotificationDialogOpen(true);
  }

  const handleClickDelete = (rowData) => {
    setIsConfirmDeleteSalaryOpen(true);
    setIdSalaryDelete(rowData?.id);
  };

  const handleDeleteSalary = (id) => {
    dispatch({ type: SALARY.DELETE_SALARY, payload: id });
    setIsConfirmDeleteSalaryOpen(false);
    setIdSalaryDelete(0);
    setSalary({});
  }

  const handleSubmit = () => {
    let salaryPendingApprove = salarysByIdEmployee?.find(item => item?.salaryIncreaseStatus === 2);
    if (!salaryPendingApprove) {
      setIsOpenFormSalary(true);
      setAction('sendLeader');
      setSalary(salary);
    } else {
      toast.error('Có bản ghi đang chờ duyệt. Không thể tạo thêm!');
    }
  };

  const Action = ({ rowData }) => {
    return (
      <div>
        {UPDATE_EMPLOYEE_STATUS.VIEW_PROCESS.includes(rowData.salaryIncreaseStatus) && (
          <IconButton size="small">
            <VisibilityIcon
              color="secondary"
              fontSize="small"
              onClick={() => handleViewFormSalary(rowData)}
            />
          </IconButton>
        )}
        {!type && (
          <>
            {UPDATE_EMPLOYEE_STATUS.EDIT.includes(rowData.salaryIncreaseStatus) && (
              <IconButton size="small" onClick={() => handleEditSalary(rowData)}>
                <EditIcon color="primary" fontSize="small" />
              </IconButton>
            )}
            {UPDATE_EMPLOYEE_STATUS.ADDITIONAL.includes(rowData.salaryIncreaseStatus) && (
              <IconButton size="small">
                <NotificationsIcon
                  color="secondary"
                  fontSize="small"
                  onClick={() => handleOpenDialogNotification(rowData)}
                />
              </IconButton>
            )}
            {UPDATE_EMPLOYEE_STATUS.REJECT.includes(rowData.salaryIncreaseStatus) && (
              <IconButton size="small">
                <NotificationsIcon
                  color="secondary"
                  fontSize="small"
                  onClick={() => handleOpenDialogNotification(rowData)}
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
          </>
        )}
      </div>
    );
  };

  const columns = CustomColumnsSalaryIncrease({ Action: Action, page, pageSize });

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
                  "isGreaterThanOldSalary",
                  "maxNumber:2000000001"
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập",
                  "Mức lương mới phải lớn hơn mức lương cũ",
                  "Mức lương tối đa 2000.000.000VND"
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
                  "maxStringLength:255"
                ]}
                errorMessages={[
                  "Trường này bắt buộc nhập",
                  "Lý do không được vượt quá 255 ký tự"
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
                onClick={resetSalary}
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
      {isOpenFormSalary && (
        <FormSalaryIncrease
          open={isOpenFormSalary}
          setOpen={setIsOpenFormSalary}
          resetSalary={resetSalary}
          dataSalaryIncrease={salary}
          employee={employee}
          action={action}
        />
      )}
      {isConfirmDeleteSalaryOpen && (
        <ConfirmationDialog
          title="Bạn có chắc chắn xóa không?"
          open={isConfirmDeleteSalaryOpen}
          onConfirmDialogClose={() => setIsConfirmDeleteSalaryOpen(false)}
          onYesClick={() => handleDeleteSalary(idSalaryDelete)}
          Yes='Xác nhận'
          No='Hủy'
        />
      )}
      {isNotificationDialogOpen && (
        <NotificationDialog
          open={isNotificationDialogOpen}
          setOpen={setIsNotificationDialogOpen}
          data={salarySelected}
          type='salary'
        />
      )}
    </div>
  );
};
export default TabSalaryIncrease;
