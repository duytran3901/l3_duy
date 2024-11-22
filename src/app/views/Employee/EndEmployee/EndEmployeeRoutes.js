import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { withTranslation } from 'react-i18next';
const EndEmployee = EgretLoadable({
  loader: () => import("./EndEmployee")
});
const ViewComponent = withTranslation()(EndEmployee);

const EmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "employee_manager/end_employee",
    exact: true,
    component: ViewComponent
  }
];

export default EmployeeRoutes;
