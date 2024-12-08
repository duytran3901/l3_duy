import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import CustomTable from "app/views/components/Custom/CustomTable";
import { CustomColumnsProcess } from "app/views/components/Custom/CustomColumns";
import { EMPLOYEE, PROCESS } from "app/redux/actions/actions";
import RegisterEmployeeDialog from "app/views/components/Dialog/RegisterEmployeeDialog";
import FormProcess from "app/views/components/Form/FormProcess";

const TabPendingProcess = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { processList, totalElements, reload } = useSelector(state => state.process);
  const employee = useSelector(state => state.employee.employee);
  const [isOpenFormProcess, setIsOpenFormProcess] = useState(false);
  const [isRegisterEmployeeDialogOpen, setIsRegisterEmployeeDialogOpen] = useState(false);
  const [dataSelected, setDataSelected] = useState(false);
  const dispatch = useDispatch();
  const dataTable = processList?.map((process) => ({ ...process }));

  const updatePage = () => {
    dispatch({ type: PROCESS.GET_PROCESS_LIST_BY_LEADER });
  };

  useEffect(() => {
    updatePage();
  }, [page, pageSize, reload]);

  useEffect(() => {
    if (dataSelected?.employeeId) {
      dispatch({ type: EMPLOYEE.GET_EMPLOYEE_BY_ID, payload: dataSelected.employeeId });
    }
  }, [dataSelected])

  const handleActionLeader = (rowData) => {
    setIsOpenFormProcess(true);
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

  const columns = CustomColumnsProcess({ Action: Action, page, pageSize });

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
        height='calc(100vh - 306px)'
      />
      {isOpenFormProcess && (
        <FormProcess
          open={isOpenFormProcess}
          setOpen={setIsOpenFormProcess}
          dataProcess={dataSelected}
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

export default TabPendingProcess;