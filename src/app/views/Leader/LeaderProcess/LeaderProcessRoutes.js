import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { withTranslation } from 'react-i18next';
const LeaderProcess = EgretLoadable({
  loader: () => import("./LeaderProcess")
});
const ViewComponent = withTranslation()(LeaderProcess);

const LeaderProcessRoutes = [
  {
    path: ConstantList.ROOT_PATH + "leader/leader_process",
    exact: true,
    component: ViewComponent
  }
];

export default LeaderProcessRoutes;
