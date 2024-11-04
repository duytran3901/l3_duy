import {
  GENDER,
  TEAM,
  SUBMIT_PROFILE_STATUS,
  FAMILY_MEMBER
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