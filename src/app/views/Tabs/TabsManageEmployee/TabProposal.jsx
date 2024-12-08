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
import { TYPE_PROPOSAL, UPDATE_EMPLOYEE_STATUS } from "app/constants/constants";
import CustomTable from "app/views/components/Custom/CustomTable";
import { CustomColumnsProposal } from "app/views/components/Custom/CustomColumns";
import { PROPOSAL } from "app/redux/actions/actions";
import FormProposal from "app/views/components/Form/FormProposal";
import NotificationDialog from "app/views/components/Dialog/NotificationDialog";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const TabProposal = (props) => {
  const { employee, type } = props;
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [proposal, setProposal] = useState({
    proposalDate: moment().format("YYYY-MM-DD"),
    currentPosition: 1
  });
  const [proposalSelected, setProposalSelected] = useState({});
  const { proposals, totalElements, reload } = useSelector(state => state.proposal);
  const [isOpenFormProposal, setIsOpenFormProposal] = useState(false);
  const [isConfirmDeleteProposalOpen, setIsConfirmDeleteProposalOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  const [idProposalDelete, setIdProposalDelete] = useState(0);
  const [action, setAction] = useState('');
  const dispatch = useDispatch();
  const dataTable = proposals?.map((proposal) => ({ ...proposal }));

  const updatePage = () => {
    if (employee?.id) {
      dispatch({ type: PROPOSAL.GET_PROPOSALS, payload: { employeeId: employee.id } });
    }
  };

  useEffect(() => {
    updatePage();
  }, [page, pageSize, reload]);

  useEffect(() => {
    ValidatorForm.addValidationRule('isGreaterThanOldProposal', (value) => {
      if (!value) return true;
      return parseFloat(value) > parseFloat(proposal?.oldProposal);
    });
    return () => {
      ValidatorForm.removeValidationRule('isGreaterThanOldProposal');
    };
  }, [proposal?.oldProposal]);

  useEffect(() => {
    const oldProposal = proposals.find((item) => item.proposalStatus === 3);
    if (oldProposal) {
      setProposal({
        ...proposal,
        currentPosition: oldProposal.newPosition
      })
    }
  }, [proposals]);


  const resetProposal = () => {
    setProposal({
      oldProposal: proposal.oldProposal,
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

  const handleEditProposal = (rowData) => {
      setProposal(rowData);
  };

  const handleOpenDialogFormProposal = (rowData) => {
    setProposal(rowData);
    setIsOpenFormProposal(true);
    setAction('sendLeader');
  };

  const handleViewFormProposal = (rowData) => {
    setProposalSelected(rowData);
    setIsOpenFormProposal(true);
    setAction('view');
  };

  const handleOpenDialogNotification = (rowData) => {
    setProposalSelected(rowData);
    setIsNotificationDialogOpen(true);
  }

  const handleClickDelete = (rowData) => {
    setIsConfirmDeleteProposalOpen(true);
    setIdProposalDelete(rowData?.id);
  };

  const handleDeleteProposal = (id) => {
    dispatch({ type: PROPOSAL.DELETE_PROPOSAL, payload: id });
    setIsConfirmDeleteProposalOpen(false);
    setIdProposalDelete(0);
    setProposal({});
  }

  const handleSubmit = () => {
    handleOpenDialogFormProposal();
    setProposal(proposal);
  };

  const Action = ({ rowData }) => {
    return (
      <div>
        {UPDATE_EMPLOYEE_STATUS.VIEW_PROCESS.includes(rowData?.proposalStatus) && (
          <IconButton size="small">
            <VisibilityIcon
              color="secondary"
              fontSize="small"
              onClick={() => handleViewFormProposal(rowData)}
            />
          </IconButton>
        )}
        {UPDATE_EMPLOYEE_STATUS.EDIT.includes(rowData?.proposalStatus) && (
          <IconButton size="small" onClick={() => handleEditProposal(rowData)}>
            <EditIcon color="primary" fontSize="small" />
          </IconButton>
        )}
        {!type && (
          <>
            {UPDATE_EMPLOYEE_STATUS.ADDITIONAL.includes(rowData?.proposalStatus) && (
              <IconButton size="small">
                <NotificationsIcon
                  color="secondary"
                  fontSize="small"
                  onClick={() => handleOpenDialogNotification(rowData)}
                />
              </IconButton>
            )}
            {UPDATE_EMPLOYEE_STATUS.REJECT.includes(rowData?.proposalStatus) && (
              <IconButton size="small">
                <NotificationsIcon
                  color="secondary"
                  fontSize="small"
                  onClick={() => handleOpenDialogNotification(rowData)}
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
          </>
        )}
      </div>
    );
  };

  const columns = CustomColumnsProposal({ Action: Action, page, pageSize });

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
                label={
                  <span className="font pr-10  font-size-13">
                    <span className="span-required"> * </span>
                    Nội dung
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="text"
                name="content"
                size="small"
                variant="outlined"
                value={proposal?.content || ''}
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
            <Grid item md={2} sm={6} xs={6}>
              <TextValidator
                className="w-100"
                label={
                  <span className="font pr-10  font-size-13">
                    <span className="span-required"> * </span>
                    Mô tả
                  </span>
                }
                onChange={e => handleChangeInput(e)}
                onBlur={e => handleBlurInput(e)}
                type="text"
                name="detailedDescription"
                size="small"
                variant="outlined"
                value={proposal?.detailedDescription || ''}
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
                onClick={resetProposal}
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
      {isOpenFormProposal && (
        <FormProposal
          open={isOpenFormProposal}
          setOpen={setIsOpenFormProposal}
          resetProposal={resetProposal}
          dataProposal={proposal}
          employee={employee}
          action={action}
        />
      )}
      {isConfirmDeleteProposalOpen && (
        <ConfirmationDialog
          title="Bạn có chắc chắn xóa không?"
          open={isConfirmDeleteProposalOpen}
          onConfirmDialogClose={() => setIsConfirmDeleteProposalOpen(false)}
          onYesClick={() => handleDeleteProposal(idProposalDelete)}
          Yes='Xác nhận'
          No='Hủy'
        />
      )}
      {isNotificationDialogOpen && (
        <NotificationDialog
          open={isNotificationDialogOpen}
          setOpen={setIsNotificationDialogOpen}
          data={proposalSelected}
          type='proposal'
        />
      )}
    </div>
  );
};
export default TabProposal;
