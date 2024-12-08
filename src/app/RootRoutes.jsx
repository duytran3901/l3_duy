import sessionRoutes from "./views/sessions/SessionRoutes";
import AddEmployeeRoutes from "./views/Employee/AddEmployee/AddEmployeeRoutes"
import ManageEmployeeRoutes from "./views/Employee/ManageEmployee/ManageEmployeeRoutes"
import EndEmployeeRoutes from "./views/Employee/EndEmployee/EndEmployeeRoutes"
import LeaderProcessRoutes from "./views/Leader/LeaderProcess/LeaderProcessRoutes";
import LeaderApprovedRoutes from "./views/Leader/LeaderApproved/LeaderApprovedRoutes";

const routes = [
  ...sessionRoutes,
  ...AddEmployeeRoutes,
  ...ManageEmployeeRoutes,
  ...EndEmployeeRoutes,
  ...LeaderProcessRoutes,
  ...LeaderApprovedRoutes,
];

export default routes;
