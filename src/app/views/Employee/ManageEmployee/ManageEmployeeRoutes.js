import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { withTranslation } from 'react-i18next';
const ManageEmployee = EgretLoadable({
  loader: () => import("./ManageEmployee")
});
const ViewComponent = withTranslation()(ManageEmployee);

const EmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "employee_manager/manage_employee",
    exact: true,
    component: ViewComponent
  }
];

export default EmployeeRoutes;
