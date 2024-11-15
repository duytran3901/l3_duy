import React, { useEffect } from "react";
import {
  Grid,
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../../../styles/views/_style.scss';
import '../../../../styles/utilities/_positionings.scss';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import moment from "moment";
import { EXPERIENCE } from "app/redux/actions/actions";

toast.configure({
  autoClose: 3000,
  draggable: false,
  limit: 3
});

const ExperienceDialog = (props) => {
  const { open, setOpen, exp, setExp, employeeId } = props;
  // const [id, setId] = useState(employee?.id || 0);
  const dispatch = useDispatch();

  console.log('id: ', employeeId);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setExp({
      ...exp,
      [name]: value
    });
  };

  const handleBlurInput = (e) => {
    const { name, value } = e.target;
    const inputValue = value.trim();
    setExp({
      ...exp,
      [name]: inputValue
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setExp({})
  }

  const handleSubmitForm = () => {
    console.log(exp);
    if (exp?.id) {
      dispatch({ type: EXPERIENCE.UPDATE_EXPERIENCE, payload: { id: exp.id, data: exp } });
    } else {
      dispatch({ type: EXPERIENCE.CREATE_EXPERIENCE, payload: { idEmployee: employeeId, data: [exp] } });
    }
    setExp({});
    setOpen(false);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isStartDateValid', (value) => {
      if (!exp?.endDate || !value) return true;
      return moment(value).isBefore(moment(exp.endDate));
    });
    ValidatorForm.addValidationRule('isEndDateValid', (value) => {
      if (!exp?.startDate || !value) return true;
      return moment(value).isAfter(moment(exp.startDate));
    });
    return () => {
      ValidatorForm.removeValidationRule('isStartDateValid');
      ValidatorForm.removeValidationRule('isEndDateValid');
    };
  }, [exp?.startDate, exp?.endDate]);

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle className="mt-10">
        <span className="h3 text-green font-weight-bold">
          {(!exp?.id ? "Thêm kinh nghiệm làm việc" : "Sửa kinh nghiệm làm việc")}
        </span>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container>
          <ValidatorForm onSubmit={handleSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextValidator
                      className="w-100"
                      size="small"
                      label={
                        <span className="font">
                          <span className="span-required"> * </span>
                          Tên công ty
                        </span>
                      }
                      variant="outlined"
                      onChange={e => handleChangeInput(e)}
                      onBlur={e => handleBlurInput(e)}
                      type="text"
                      name="companyName"
                      value={exp?.companyName || ''}
                      placeholder="Tên công ty"
                      validators={[
                        "required",
                        "matchRegexp:^[^!@#\$%\^\&*\)\(+=._-]+$"
                      ]}
                      errorMessages={[
                        "Trường này bắt buộc nhập",
                        "Tên không chứa ký hiệu đặc biệt"
                      ]}
                    />
                  </Grid>
                  <Grid item md={3} sm={12} xs={12}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span className="font pr-10">
                          <span className="span-required"> * </span>
                          Ngày bắt đầu
                        </span>
                      }
                      onChange={e => handleChangeInput(e)}
                      onBlur={e => handleBlurInput(e)}
                      type="date"
                      name="startDate"
                      size="small"
                      variant="outlined"
                      value={exp?.startDate ? moment(exp?.startDate).format("YYYY-MM-DD") : ''}
                      validators={[
                        "required",
                        "isStartDateValid"
                      ]}
                      errorMessages={[
                        "Trường này bắt buộc nhập",
                        "Ngày bắt đầu phải nhỏ hơn ngày kết thúc"
                      ]}
                      inputProps={{
                        max: moment().format("YYYY-MM-DD")
                      }}
                    />
                  </Grid>
                  <Grid item md={3} sm={12} xs={12}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span className="font pr-10">
                          <span className="span-required"> * </span>
                          Ngày kết thúc
                        </span>
                      }
                      onChange={e => handleChangeInput(e)}
                      onBlur={e => handleBlurInput(e)}
                      type="date"
                      name="endDate"
                      size="small"
                      variant="outlined"
                      value={exp?.endDate ? moment(exp?.endDate).format("YYYY-MM-DD") : ''}
                      validators={[
                        "required",
                        "isEndDateValid"
                      ]}
                      errorMessages={[
                        "Trường này bắt buộc nhập",
                        "Ngày kết thúc phải lớn hơn ngày bắt đầu"
                      ]}
                      inputProps={{
                        max: moment().format("YYYY-MM-DD")
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span className="font pr-10">
                          <span className="span-required"> * </span>
                          Lý do nghỉ việc
                        </span>
                      }
                      onChange={e => handleChangeInput(e)}
                      onBlur={e => handleBlurInput(e)}
                      type="text"
                      name="leavingReason"
                      size="small"
                      variant="outlined"
                      value={exp?.leavingReason || ''}
                      placeholder='Lý do nghỉ việc'
                      validators={[
                        "required",
                      ]}
                      errorMessages={[
                        "Trường này bắt buộc nhập",
                      ]}
                    />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span className="font pr-10">
                          <span className="span-required"> * </span>
                          Địa chỉ công ty
                        </span>
                      }
                      onChange={e => handleChangeInput(e)}
                      onBlur={e => handleBlurInput(e)}
                      type="text"
                      name="companyAddress"
                      size="small"
                      variant="outlined"
                      value={exp?.companyAddress || ''}
                      placeholder='Địa chỉ công ty'
                      validators={[
                        "required",
                      ]}
                      errorMessages={[
                        "Trường này bắt buộc nhập",
                      ]}
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                    <TextValidator
                      className="w-100"
                      label={
                        <span className="font pr-10">
                          <span className="span-required"> * </span>
                          Mô tả công việc
                        </span>
                      }
                      onChange={e => handleChangeInput(e)}
                      onBlur={e => handleBlurInput(e)}
                      type="text"
                      name="jobDescription"
                      size="small"
                      variant="outlined"
                      value={exp?.jobDescription || ''}
                      placeholder='Mô tả công việc'
                      validators={[
                        "required",
                      ]}
                      errorMessages={[
                        "Trường này bắt buộc nhập",
                      ]}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <DialogActions className="mt-20 flex-center">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseDialog}
                className="mr-12"
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="mr-12"
              >
                Lưu
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ExperienceDialog;