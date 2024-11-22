import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import CustomTable from "app/views/components/Custom/CustomTable";
import { CustomColumnsProposal } from "app/views/components/Custom/CustomColumns";
import { EMPLOYEE, PROPOSAL } from "app/redux/actions/actions";
import FormProposal from "app/views/components/Form/FormProposal";
import RegisterEmployeeDialog from "app/views/components/Dialog/RegisterEmployeeDialog";

const TabPendingProposal = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { proposals, totalElements, reload } = useSelector(state => state.proposal);
  const employee = useSelector(state => state.employee.employee);
  const [isOpenFormSalary, setIsOpenFormSalary] = useState(false);
  const [isRegisterEmployeeDialogOpen, setIsRegisterEmployeeDialogOpen] = useState(false);
  const [dataSelected, setDataSelected] = useState(false);
  const dispatch = useDispatch();
  const dataTable = proposals?.map((proposal) => ({ ...proposal }));

  const updatePage = () => {
    dispatch({ type: PROPOSAL.GET_PROPOSALS_BY_LEADER });
  };

  useEffect(() => {
    updatePage();
    console.log(dataTable);

  }, [page, pageSize, reload]);

  useEffect(() => {
    if (dataSelected?.employeeId) {
      dispatch({ type: EMPLOYEE.GET_EMPLOYEE_BY_ID, payload: dataSelected.employeeId });
    }
  }, [dataSelected])

  const handleActionLeader = (rowData) => {
    setIsOpenFormSalary(true);
    setDataSelected(rowData);
  };

  const handleViewInfoEmployee = (rowData) => {
    setIsRegisterEmployeeDialogOpen(true);
    setDataSelected(rowData);
  };

  const Action = ({ rowData }) => {
    return (
      <div>
        <IconButton size="small" onClick={() => handleActionLeader(rowData)}>
          <EditIcon color="primary" fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <VisibilityIcon
            color="secondary"
            fontSize="small"
            onClick={() => handleViewInfoEmployee(rowData)}
          />
        </IconButton>
      </div>
    );
  };

  const columns = CustomColumnsProposal({ Action: Action, page, pageSize });

  return (
    <div>
      <CustomTable
        data={totalElements <= pageSize ? dataTable : dataTable.slice(page * pageSize, page * pageSize + pageSize)}
        columns={columns}
        total={totalElements}
        pageSize={pageSize}
        page={page}
        setPageSize={setPageSize}
        setPage={setPage}
        rowsPerPageOptions={[1, 2, 3, 5, 10]}
        height='calc(100vh - 356px)'
      />
      {isOpenFormSalary && (
        <FormProposal
          open={isOpenFormSalary}
          setOpen={setIsOpenFormSalary}
          dataProposal={dataSelected}
          employee={employee}
          action='leaderProcess'
        />
      )}
      {isRegisterEmployeeDialogOpen && (
        <RegisterEmployeeDialog
          open={isRegisterEmployeeDialogOpen}
          setOpen={setIsRegisterEmployeeDialogOpen}
          idEmployee={dataSelected?.employeeId}
          action='view'
        />
      )}
    </div>
  );
};

export default TabPendingProposal;