import ConstantList from "./appConfig";
import { authRoles } from "./auth/authRoles";
export const navigations = [
  {
    name: "Trang chủ",
    // role: authRoles.guest,
    icon: "home",
    path: ConstantList.ROOT_PATH + "home",
    isVisible:true,
  },
  {
    name: "Quản lý nhân viên",
    role: authRoles.user,
    icon: "person",
    isVisible:true,
    children: [
      {
        name: "Thêm nhân viên",
        role: authRoles.user,
        path: ConstantList.ROOT_PATH + "employee_manager/add_employee",
        icon: "keyboard_arrow_right",
        isVisible:true,
      },
      {
        name: "Quản lý nhân viên",
        role: authRoles.user,
        path: ConstantList.ROOT_PATH + "employee_manager/manage_employee",
        icon: "keyboard_arrow_right",
        isVisible:true,
      },
      {
        name: "Kết thúc nhân viên",
        role: authRoles.user,
        path: ConstantList.ROOT_PATH + "employee_manager/end_employee",
        icon: "keyboard_arrow_right",
        isVisible:true,
      },
    ]
  },
  {
    name: "Lãnh đạo",
    role: authRoles.manage,
    isVisible:true,
    icon: "receipt",
    children: [
      {
        name: "Lãnh đạo chờ duyệt",
        role: authRoles.manage,
        isVisible:true,
        path: ConstantList.ROOT_PATH + "leader/leader_process",
        icon: "keyboard_arrow_right"
      },
      {
        name: "Lãnh đạo đã duyệt",
        role: authRoles.manage,
        isVisible:true,
        path: ConstantList.ROOT_PATH + "leader/leader_approved",
        icon: "keyboard_arrow_right"
      }
    ]
  }
];
