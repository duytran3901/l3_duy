export const SUBMIT_PROFILE_STATUS = [
  { id: '0', name: "Nộp lưu hồ sơ" },
  { id: '1', name: "Thêm mới" },
  { id: '2', name: "Chờ xử lý" },
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
  EDIT: [1, 3, 4, 5, 8, 9],
  DELETE: [1],
  REQUEST: [4, 8],
  REJECT: [5, 9],
  END: [7],
  PENDING_END: [6],
  PENDING: [2],
};
export const UPDATE_EMPLOYEE_STATUS = {
  VIEW_PROCESS: "2,3",
  EDIT: "1,4,5",
  REMOVE: "1",
  ADDITIONAL: "4,8",
  REJECT: "5,9",
};
export const SUBMIT_UPDATE_STATUS = [
  { id: '1', name: "Thêm mới" },
  { id: '2', name: "Chờ duyệt" },
  { id: '3', name: "Đã duyệt" },
  { id: '4', name: "Yêu cầu bổ sung" },
  { id: '5', name: "Từ chối" },
];
export const EMPLOYEE_POSITION = [
  { name: "Nhân viên", id: 1 },
  { name: "Phó nhóm", id: 2 },
  { name: "Trưởng nhóm", id: 3 },
  { name: "Phó phòng", id: 4 },
  { name: "Trưởng phòng", id: 5 },
  { name: "Phó giám đốc", id: 6 },
  { name: "Giám đốc", id: 7 },
];
export const TYPE_PROPOSAL = [
  { name: "Đề xuất tăng lương", id: 1 },
  { name: "Đề xuất giảm giờ làm", id: 2 },
  { name: "Đề xuất chế độ nghỉ", id: 3 },
  { name: "Đề xuất tăng giờ làm", id: 4 },
];
export const GENDER = [
  { id: 3, name: "Khác" },
  { id: 1, name: "Nam" },
  { id: 2, name: "Nữ" },
];
export const TEAM = [
  { id: 0, name: 'BA' },
  { id: 1, name: 'BackEnd - Java' },
  { id: 2, name: 'FrontEnd - ReactJs' },
  { id: 3, name: 'FrontEnd - VueJs' },
  { id: 4, name: 'Mobile - ReactNative' },
  { id: 5, name: 'Tester' }
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
export const POSITION = [
  { id: 1, name: 'BE team member' },
  { id: 2, name: 'Mobile Leader' },
  { id: 3, name: 'Project manager' },
  { id: 4, name: 'BE Leader' },
  { id: 5, name: 'FE team member' },
  { id: 6, name: 'Mobile team member' },
  { id: 7, name: 'FE Leader' },
  { id: 8, name: 'Design Leader' }
]
export const LEADER_POSITION = [
  { id: 0, name: "Game Leader" },
  { id: 1, name: "BE Leader" },
  { id: 2, name: "Test Leader" },
  { id: 3, name: "Mobile Leader" },
  { id: 4, name: "FE Leader" }
]
