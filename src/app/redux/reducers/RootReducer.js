import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import EmployeeReducer from "./EmployeeReducer";
import CertificateReducer from "./CertificateReducer"
import FamilyReducer from "./FamilyReducer"
import ExperienceReducer from "./ExperienceReducer"
import SalaryReducer from "./SalaryReducer"
import ProcessReducer from "./ProcessReducer"
import ProposalReducer from "./ProposalReducer"

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,
  employee: EmployeeReducer,
  certificate: CertificateReducer,
  family: FamilyReducer,
  experience: ExperienceReducer,
  salary: SalaryReducer,
  process: ProcessReducer,
  proposal: ProposalReducer
});

export default RootReducer;
