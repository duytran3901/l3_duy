import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { withTranslation } from 'react-i18next';
const LeaderApproved = EgretLoadable({
  loader: () => import("./LeaderApproved")
});
const ViewComponent = withTranslation()(LeaderApproved);

const LeaderProcessRoutes = [
  {
    path: ConstantList.ROOT_PATH + "leader/leader_approved",
    exact: true,
    component: ViewComponent
  }
];

export default LeaderProcessRoutes;
