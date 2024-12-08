import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import CustomTable from "app/views/components/Custom/CustomTable";
import { CustomColumnsSalaryIncrease } from "app/views/components/Custom/CustomColumns";
import { EMPLOYEE, SALARY } from "app/redux/actions/actions";
import FormSalaryIncrease from "app/views/components/Form/FormSalaryIncrease";
import RegisterEmployeeDialog from "app/views/components/Dialog/RegisterEmployeeDialog";

const TabPendingSalaryIncrease = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { salarys, totalElements, reload } = useSelector(state => state.salary);
  const employee = useSelector(state => state.employee.employee);
  const [isOpenFormSalary, setIsOpenFormSalary] = useState(false);
  const [isRegisterEmployeeDialogOpen, setIsRegisterEmployeeDialogOpen] = useState(false);
  const [dataSelected, setDataSelected] = useState({});
  const dispatch = useDispatch();
  const dataTable = salarys?.map((salary) => ({ ...salary }));

  const updatePage = () => {
    dispatch({ type: SALARY.GET_SALARYS_BY_LEADER });
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

  const columns = CustomColumnsSalaryIncrease({ Action: Action, page, pageSize });

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
      {isOpenFormSalary && (
        <FormSalaryIncrease
          open={isOpenFormSalary}
          setOpen={setIsOpenFormSalary}
          dataSalaryIncrease={dataSelected}
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

export default TabPendingSalaryIncrease;