export const SUBMIT_PROFILE_STATUS = [
  { id: '0', name: "Nộp lưu hồ sơ" },
  { id: '1', name: "Thêm mới" },
  { id: '2', name: "Chờ đăng ký" },
  { id: '3', name: "Đã duyệt đăng ký" },
  { id: '4', name: "Yêu cầu bổ sung" },
  { id: '5', name: "Từ chối đăng ký" },
  { id: '6', name: "Chờ duyệt kết thúc" },
  { id: '7', name: "Đã duyệt kết thúc" },
  { id: '8', name: "Bổ xung kết thúc" },
  { id: '9', name: "Từ chối kết thúc" },
];
export const EMPLOYEE_STATUS = {
  ADD: "1,2,4,5",
  MANAGE: "3,6,8,9",
  END: "0,7",
  PENDING: "2,6",
  APPROVED: "0,3,7",
};
export const ACTION_EMPLOYEE = {
  VIEW: [2, 3, 6, 8, 9],
  EDIT: [1, 4, 3, 5, 8, 9],
  DELETE: [1],
  REQUEST: [4, 8],
  REJECT: [5, 9],
  END: [7],
  PENDING_END: [6],
  PENDING: [2],
};
export const PROCESS_STATUS = {
  VIEW: "2,3",
  EDIT: "1,4,5",
  REMOVE: "1",
  ADDITIONAL: "4,8",
  REJECT: "5,9",
};
export const GENDER = [
  { id: 3, name: "Khác" },
  { id: 1, name: "Nam" },
  { id: 2, name: "Nữ" },
];
export const TEAM = [
  { id: 1, name: "FrontEnd - ReactJs" },
  { id: 2, name: "BackEnd" },
  { id: 3, name: "Tester" },
];
export const FAMILY_MEMBER = [
  { id: 1, name: "Bố/Mẹ" },
  { id: 2, name: "Anh/Chị" },
  { id: 3, name: "Em" },
  { id: 4, name: "Vợ/Chồng" },
  { id: 5, name: "Họ hàng" },
  { id: 6, name: "Người bảo hộ" },
  { id: 7, name: "Khác" },
];