import React from "react";
import { Redirect } from "react-router-dom";
import ConstantList from "./appConfig";
import homeRoutes from "./views/home/HomeRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import AddEmployeeRoutes from "./views/Employee/AddEmployee/AddEmployeeRoutes"
import ManageEmployeeRoutes from "./views/Employee/ManageEmployee/ManageEmployeeRoutes"
import EndEmployeeRoutes from "./views/Employee/EndEmployee/EndEmployeeRoutes"
import LeaderProcessRoutes from "./views/Leader/LeaderProcess/LeaderProcessRoutes";

const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.HOME_PAGE} /> //Luôn trỏ về HomePage được khai báo trong appConfig
  }
];

const errorRoute = [
  // {
    // component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />
  // }
];

const routes = [
  ...homeRoutes,
  ...sessionRoutes,
  ...AddEmployeeRoutes,
  ...ManageEmployeeRoutes,
  ...EndEmployeeRoutes,
  ...LeaderProcessRoutes,
  ...errorRoute,
];

export default routes;
