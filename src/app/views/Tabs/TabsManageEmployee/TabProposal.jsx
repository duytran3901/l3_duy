import { Button, DialogActions, Grid, IconButton, MenuItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Notifications as NotificationsIcon,
} from "@material-ui/icons";
// import { CustomColumnsProcessIncrease } from "app/views/atoms/customColums";
// import CustomTable from "app/views/atoms/customTable";
import { useDispatch, useSelector } from "react-redux";
import { TextValidator, ValidatorForm, SelectValidator } from "react-material-ui-form-validator";
import moment from "moment";
// import FormProcess from "../formRegister/FormProcessIncrease";
import { ConfirmationDialog } from "egret";
// import RequestEmployeeDialog from "app/views/organisms/requestDialog/RequestEmployeeDialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EMPLOYEE_POSITION, TYPE_PROPOSAL, UPDATE_EMPLOYEE_STATUS } from "app/constants/constants";
import CustomTable from "app/views/components/Custom/CustomTable";
import { CustomColumnsProposal } from "app/views/components/Custom/CustomColumns";
import { PROPOSAL } from "app/redux/actions/actions";
// import FormProcessIncrease from "app/views/components/Form/FormProcessIncrease";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const TabProposal = (props) => {
  const { employee } = props;
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [proposal, setProposal] = useState({
    promotionDay: moment().format("YYYY-MM-DD"),
    currentPosition: 1
  });
  const { proposals, totalElements, reload } = useSelector(state => state.proposal);
  const [isOpenFormProcess, setIsOpenFormProcess] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isConfirmDeleteProcessOpen, setIsConfirmDeleteProcessOpen] = useState(false);
  const [openAdditionalDialog, setOpenAdditionalDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [disable, setDisable] = useState(false);
  const [oldProcessApproved, setOldProcessApproved] = useState();
  const [isSendLeader, setIsSendLeader] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);
  const [checkResponseLeader, setCheckResponseLeader] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState();
  const dispatch = useDispatch();
  const dataTable = proposals?.map((proposal) => ({ ...proposal }));

  const updatePage = () => {
    if (employee?.id) {
      dispatch({ type: PROPOSAL.GET_PROPOSALS, payload: { employeeId: employee.id } });
    }
  };

  console.log('proposal: ', proposals);


  useEffect(() => {
    updatePage();
  }, [page, pageSize, reload]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isGreaterThanOldProcess', (value) => {
      if (!value) return true;
      return parseFloat(value) > parseFloat(proposal?.oldProcess);
    });
    return () => {
      ValidatorForm.removeValidationRule('isGreaterThanOldProcess');
    };
  }, [proposal?.oldProcess]);

  useEffect(() => {
    const oldProcess = proposals.find((item) => item.proposalStatus === 3);
    if (oldProcess) {
      setProposal({
        ...proposal,
        currentPosition: oldProcess.newPosition
      })
    }
  }, [proposals]);


  const resetProposal = () => {
    setProposal({
      oldProcess: proposal.oldProcess,
      proposalDate: moment().format("YYYY-MM-DD"),
    });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProposal({
      ...proposal,
      [name]: value
    });
  };

  const handleBlurInput = (e) => {
    const { name, value } = e.target;
    const inputValue = value.trim();
    setProposal({
      ...proposal,
      [name]: inputValue
    });
  };

  const handleEditProcess = (rowData) => {
    if (rowData.oldProcess === oldProcessApproved) {
      if (checkResponseLeader) {
        setDisableSubmit(false);
      }
      const formattedStartDate = rowData.proposalDate
        ? moment(rowData.proposalDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");

      setProposal({
        ...rowData,
        proposalDate: formattedStartDate,
      });
    } else {
      toast.error("Mức lương cũ không đúng!");
    }
  };

  const handleOpenDialogFormProcess = (rowData) => {
    setProposal(rowData);
    setIsOpenFormProcess(true);
  };

  const handleViewFormProcess = (item) => {
    setIsSendLeader(false);
    setProposal(item);
    setIsOpenFormProcess(true);
  };

  const handleCloseDialogFormProcess = () => {
    setIsOpenFormProcess(false);
    resetProposal();
  };

  const handleAdditional = (item) => {
    setProposal(item);
    setOpenAdditionalDialog(true);
  };
  const handleCloseAdditional = () => {
    resetProposal();
    setOpenAdditionalDialog(false);
  };
  const handleReject = (item) => {
    setProposal(item);
    setOpenRejectDialog(true);
  };
  const handleCloseRejectDialog = () => {
    resetProposal();
    setOpenRejectDialog(false);
  };

  const handleClickDelete = (rowData) => {
    setIsConfirmDeleteProcessOpen(true);
    setProposal(rowData);
  };

  const handleDeleteProcess = (id) => {
    dispatch({ type: PROPOSAL.DELETE_PROCESS, payload: id });
    setIsConfirmDeleteProcessOpen(false);
    setProposal({});
  }

  const handleSubmit = () => {
    handleOpenDialogFormProcess();
    setProposal(proposal);
    setIsSendLeader(true);
  };

  const Action = ({ rowData }) => {
    return (
      <div>
        {UPDATE_EMPLOYEE_STATUS.EDIT.includes(rowData?.proposalStatus) && (
          <IconButton size="small" onClick={() => handleEditProcess(rowData)}>
            <EditIcon color="primary" fontSize="small" />
          </IconButton>
        )}
        {UPDATE_EMPLOYEE_STATUS.VIEW_PROCESS.includes(rowData?.proposalStatus) && (
          <IconButton size="small">
            <VisibilityIcon
              color="secondary"
              fontSize="small"
              onClick={() => handleViewFormProcess(rowData)}
            />
          </IconButton>
        )}
        {UPDATE_EMPLOYEE_STATUS.ADDITIONAL.includes(rowData?.proposalStatus) && (
          <IconButton size="small">
            <NotificationsIcon
              color="secondary"
              fontSize="small"
              onClick={() => handleAdditional(rowData)}
            />
          </IconButton>
        )}
        {UPDATE_EMPLOYEE_STATUS.REJECT.includes(rowData?.proposalStatus) && (
          <IconButton size="small">
            <NotificationsIcon
              color="secondary"
              fontSize="small"
              onClick={() => handleReject(rowData)}
            />
          </IconButton>
        )}
        {UPDATE_EMPLOYEE_STATUS.REMOVE.includes(rowData?.proposalStatus) && (
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

  const columns = CustomColumnsProposal({ Action: Action, page, pageSize });

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
              name="proposalDate"
              size="small"
              variant="outlined"
              value={proposal?.proposalDate ? moment(proposal?.proposalDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")}
              validators={[
                "required"
              ]}
              errorMessages={[
                "Trường này bắt buộc nhập"
              ]}
              inputProps={{
                min: moment().format("YYYY-MM-DD")
              }}
            />
          </Grid>
          <Grid item md={2} sm={6} xs={6}>
            <SelectValidator
              className="w-100"
              label={
                <span className="font">
                  <span className="span-required"> * </span>
                  Loại đề xuất
                </span>
              }
              onChange={e => handleChangeInput(e)}
              type="text"
              name="type"
              size="small"
              variant="outlined"
              value={proposal?.type || ''}
              validators={["required"]}
              errorMessages={["Trường này bắt buộc chọn"]}
            >
              {TYPE_PROPOSAL?.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
          <Grid item md={2} sm={6} xs={6}>
            <TextValidator
              className="w-100"
              label={<span className="font font-size-13">Nội dung</span>}
              onChange={e => handleChangeInput(e)}
              onBlur={e => handleBlurInput(e)}
              type="text"
              name="content"
              size="small"
              variant="outlined"
              value={proposal?.content || ''}
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
              label={<span className="font font-size-13">Nội dung</span>}
              onChange={e => handleChangeInput(e)}
              onBlur={e => handleBlurInput(e)}
              type="text"
              name="detailedDescription"
              size="small"
              variant="outlined"
              value={proposal?.detailedDescription || ''}
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
              value={proposal?.note || ''}
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
            <Button variant="contained" color="secondary" onClick={resetProposal}>
              Hủy
            </Button>
          </DialogActions>
        </Grid>
      </ValidatorForm>
      <div className="mt-6">
        {/* <CustomTable
          columns={columns}
          data={salarys}
          // totalElements={salarys?.length || 0}
          page={page}
          pageSize={pageSize}
          setPage={handlePageChange}
          setPageSize={handlePageSizeChange}
          height={260}
        /> */}
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
      {/* {isOpenFormProcess && (
        <FormProcessIncrease
          open={isOpenFormProcess}
          setOpen={setIsOpenFormProcess}
          dataProcessIncrease={proposal}
          employee={employee}
          isSendLeader={isSendLeader}
          checkStatus={checkStatus}
          testCheck={checkResponseLeader}
        />
      )} */}
      {isConfirmDeleteProcessOpen && (
        <ConfirmationDialog
          title="Bạn có chắc chắn xóa không?"
          open={isConfirmDeleteProcessOpen}
          onConfirmDialogClose={() => setIsConfirmDeleteProcessOpen(false)}
          onYesClick={() => handleDeleteProcess(proposal.id)}
          Yes='Có'
          No='Không'
        />
      )}
      {/*{openAdditionalDialog && (
        <RequestEmployeeDialog
          open={openAdditionalDialog}
          handleStatusClose={handleCloseAdditional}
          note={proposal?.additionalRequest}
          title={"Yêu cầu bổ sung"}
        />
      )}
      {openRejectDialog && (
        <RequestEmployeeDialog
          open={openRejectDialog}
          handleStatusClose={handleCloseRejectDialog}
          note={proposal?.reasonForRefusal}
          title={"Lí do từ chối"}
        />
      )} */}
    </div>
  );
};
export default TabProposal;
