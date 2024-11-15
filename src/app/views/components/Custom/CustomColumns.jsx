import {
  GENDER,
  TEAM,
  SUBMIT_PROFILE_STATUS,
  FAMILY_MEMBER,
  SUBMIT_UPDATE_STATUS,
  EMPLOYEE_POSITION,
  TYPE_PROPOSAL
} from 'app/constants/constants';
import moment from 'moment';
import React from 'react';
import { shorten } from 'app/utilities/shorten';

export const CustomColumnsEmployee = ({ Action, page, pageSize }) => {
  const columns = [
    {
      title: "STT",
      align: "center",
      maxWidth: "55px",
      minWidth: "55px",
      render: (rowData) => rowData.tableData?.id + 1 + page * pageSize,
    },
    {
      title: "Thao tác",
      field: "custom",
      align: "center",
      maxWidth: "110px",
      minWidth: "110px",
      render: (rowData) => <Action rowData={rowData} />
    },
    {
      title: "Mã nhân viên",
      field: "code",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
    },
    {
      title: "Tên nhân viên",
      field: "name",
      align: "left",
      maxWidth: "150px",
      minWidth: "150px",
      render: (rowData) => shorten(rowData.name, 22),
    },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (rowData) => moment(rowData.dateOfBirth).format("DD/MM/YYYY"),
    },
    {
      title: "Giới tính",
      field: "gender",
      align: "center",
      maxWidth: "80px",
      minWidth: "80px",
      render: (rowData) => {
        const nameGender = GENDER.find((item) => item.id === rowData.gender);
        return nameGender ? nameGender.name : "";
      },
    },
    {
      title: "Nhóm",
      field: "team",
      align: "center",
      maxWidth: "150px",
      minWidth: "150px",
      render: (rowData) => {
        const nameTeam = TEAM.find((item) => item.id === rowData.team);
        return nameTeam ? nameTeam.name : "";
      },
    },
    {
      title: "Điện thoại",
      field: "phone",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
    },
    {
      title: "Email",
      field: "email",
      align: "center",
      maxWidth: "180px",
      minWidth: "180px",
      render: (rowData) => shorten(rowData.email, 26),
    },
    {
      title: "Địa chỉ",
      field: "address",
      align: "center",
      maxWidth: "150px",
      minWidth: "150px",
      render: (rowData) => shorten(rowData.address, 22),
    },
    {
      title: "Trạng thái",
      field: "submitProfileStatus",
      align: "center",
      maxWidth: "150px",
      minWidth: "150px",
      render: (rowData) => {
        const nameStatus = SUBMIT_PROFILE_STATUS.find(
          (item) => item.id === rowData.submitProfileStatus
        );
        return nameStatus ? nameStatus.name : "Lỗi";
      },
    },
  ];

  return columns;
};

export const CustomColumnsCertificate = ({ Action, page, pageSize }) => {
  const columns = [
    {
      title: "STT",
      align: "center",
      maxWidth: "55px",
      minWidth: "55px",
      render: (rowData) => rowData.tableData?.id + 1 + page * pageSize,
    },
    {
      title: "Thao tác",
      field: "custom",
      align: "center",
      maxWidth: "110px",
      minWidth: "110px",
      render: (rowData) => <Action rowData={rowData} />
    },
    {
      title: "Tên văn bằng",
      field: "certificateName",
      align: "left",
      maxWidth: "150px",
      minWidth: "150px",
      render: (rowData) => shorten(rowData.certificateName, 22),
    },
    {
      title: "Ngày cấp",
      field: "issueDate",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (rowData) => moment(rowData.issueDate).format("DD/MM/YYYY"),
    },
    {
      title: "Lĩnh vực",
      field: "field",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (rowData) => shorten(rowData.field, 26),
    },
    {
      title: "Nội dung",
      field: "content",
      align: "center",
      maxWidth: "180px",
      minWidth: "180px",
      render: (rowData) => shorten(rowData.content, 26),
    }
  ];

  return columns;
};

export const CustomColumnsFamily = ({ Action, page, pageSize }) => {
  const columns = [
    {
      title: "STT",
      align: "center",
      maxWidth: "55px",
      minWidth: "55px",
      render: (rowData) => rowData.tableData?.id + 1 + page * pageSize,
    },
    {
      title: "Thao tác",
      field: "custom",
      align: "center",
      maxWidth: "110px",
      minWidth: "110px",
      render: (rowData) => <Action rowData={rowData} />
    },
    {
      title: "Họ và tên",
      field: "name",
      align: "left",
      maxWidth: "150px",
      minWidth: "150px",
      render: (rowData) => shorten(rowData.name, 22),
    },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
      render: (rowData) => moment(rowData.dateOfBirth).format("DD/MM/YYYY"),
    },
    {
      title: "Giới tính",
      field: "gender",
      align: "center",
      maxWidth: "80px",
      minWidth: "80px",
      render: (rowData) => {
        const nameGender = GENDER.find((item) => item.id === rowData.gender);
        return nameGender ? nameGender.name : "";
      },
    },
    {
      title: "Quan hệ",
      field: "relationShip",
      align: "center",
      maxWidth: "150px",
      minWidth: "150px",
      render: (rowData) => {
        const relationShip = FAMILY_MEMBER.find((item) => item.id === rowData.relationShip);
        return relationShip ? relationShip.name : "";
      },
    },
    {
      title: "Điện thoại",
      field: "phoneNumber",
      align: "center",
      maxWidth: "100px",
      minWidth: "100px",
    },
    {
      title: "Email",
      field: "email",
      align: "center",
      maxWidth: "180px",
      minWidth: "180px",
      render: (rowData) => shorten(rowData.email, 26),
    },
    {
      title: "Địa chỉ",
      field: "address",
      align: "center",
      maxWidth: "150px",
      minWidth: "150px",
      render: (rowData) => shorten(rowData.address, 22),
    }
  ];

  return columns;
};

export const CustomColumnsSalaryIncrease = ({ Action, page, pageSize }) => {
  let columns = [
    {
      title: "STT",
      align: "center",
      maxWidth: "55px",
      minWidth: "55px",
      render: (rowData) => rowData.tableData?.id + 1 + page * pageSize,
    },
    {
      title: "Thao tác",
      field: "custum",
      align: "center",
      maxWidth: "110px",
      minWidth: "110px",
      render: (rowData) => <Action rowData={rowData} />,
    },
    {
      title: "Ngày tăng lương",
      field: "startDate",
      align: "center",
      maxWidth: "130px",
      minWidth: "130px",
      render: (rowData) => moment(rowData?.startDate).format("DD/MM/YYYY"),
    },
    {
      title: "Mức lương cũ",
      field: "oldSalary",
      align: "center",
      maxWidth: "110px",
      minWidth: "110px",
      render: (rowData) => `${rowData?.oldSalary.toLocaleString()} VNĐ`,
    },
    {
      title: "Mức lương mới",
      field: "newSalary",
      align: "center",
      maxWidth: "110px",
      minWidth: "110px",
      render: (rowData) => `${rowData?.newSalary.toLocaleString()} VNĐ`,
    },
    {
      title: "Lý do",
      field: "reason",
      align: "center",
      maxWidth: "240px",
      minWidth: "240px",
      render: (rowData) => shorten(rowData.reason, 23),
    },
    {
      title: "Trạng thái",
      field: "salaryIncreaseStatus",
      align: "center",
      maxWidth: "150px",
      minWidth: "150px",
      render: (rowData) => {
        const status = SUBMIT_UPDATE_STATUS.find((item) => item.id === rowData.salaryIncreaseStatus.toLocaleString());
        return status ? status.name : "";
      }
    },
  ];
  return columns;
};
export const CustomColumnsProcess = ({ Action, page, pageSize }) => {
  let columns = [
    {
      title: "STT",
      align: "center",
      maxWidth: "60px",
      minWidth: "60px",
      render: (rowData) => rowData.tableData?.id + 1 + page * pageSize,
    },
    {
      title: "Thao tác",
      field: "custum",
      align: "center",
      maxWidth: "110px",
      minWidth: "110px",
      render: (rowData) => <Action rowData={rowData} />,
    },
    {
      title: "Ngày đề xuất",
      field: "promotionDay",
      align: "center",
      render: (rowData) => moment(rowData?.promotionDay).format("DD/MM/YYYY"),
    },
    {
      title: "Chức vụ hiện tại",
      field: "currentPosition",
      align: "center",
      render: (rowData) => EMPLOYEE_POSITION.find((item) => item.id === rowData?.currentPosition)?.name,
    },
    {
      title: "Chức vụ đề xuất",
      field: "newPosition",
      align: "center",
      render: (rowData) => EMPLOYEE_POSITION.find((item) => item.id === rowData?.newPosition)?.name,
    },
    {
      title: "Ghi chú",
      field: "note",
      align: "center",
      render: (rowData) => shorten(rowData.note, 30),
    },
    {
      title: "Trạng thái",
      field: "processStatus",
      align: "center",
      render: (rowData) => {
        const status = SUBMIT_UPDATE_STATUS.find((item) => item.id === rowData?.processStatus.toLocaleString());
        return status ? status.name : "";
      }
    },
  ];
  return columns;
};

export const CustomColumnsProposal = ({ Action, page, pageSize }) => {
  let columns = [
    {
      title: "STT",
      align: "center",
      maxWidth: "60px",
      minWidth: "60px",
      render: (rowData) => rowData.tableData?.id + 1 + page * pageSize,
    },
    {
      title: "Thao tác",
      field: "custum",
      align: "center",
      maxWidth: "110px",
      minWidth: "110px",
      render: (rowData) => <Action rowData={rowData} />,
    },
    {
      title: "Ngày đề xuất",
      field: "proposalDate",
      align: "center",
      render: (rowData) => moment(rowData?.proposalDate).format("DD/MM/YYYY"),
    },
    {
      title: "Loại đề xuất",
      field: "type",
      align: "left",
      render: (rowData) => {
        const nameType = TYPE_PROPOSAL.find((item) => item.id === rowData.type);
        return nameType ? nameType.name : "";
      },
    },
    {
      title: "Nội dung",
      field: "content",
      align: "center",
      render: (rowData) => shorten(rowData.content),
    },
    {
      title: "Mô tả",
      field: "detailedDescription",
      align: "center",
      render: (rowData) => shorten(rowData.detailedDescription),
    },
    {
      title: "Ghi chú",
      field: "note",
      align: "center",
      render: (rowData) => shorten(rowData.note, 23),
    },
    {
      title: "Trạng thái",
      field: "proposalStatus",
      align: "center",
      render: (rowData) => {
        const status = SUBMIT_UPDATE_STATUS.find((item) => item.id === rowData?.proposalStatus.toLocaleString());
        return status ? status.name : "";
      }
    },
  ];
  return columns;
};
