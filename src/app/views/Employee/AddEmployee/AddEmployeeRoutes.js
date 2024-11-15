import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { withTranslation } from 'react-i18next';
const AddEmployee = EgretLoadable({
  loader: () => import("./AddEmployee")
});
const ViewComponent = withTranslation()(AddEmployee);

const EmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "employee_manager/add_employee",
    exact: true,
    component: ViewComponent
  }
];

export default EmployeeRoutes;
