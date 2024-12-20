import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { FAMILY_MEMBER, GENDER } from "app/constants/constants";
import "../../../../styles/views/_tab-information.scss";
import moment from "moment";
import React from "react";

const TabInformation = (props) => {
  const { employee } = props;
  const dataFamily = employee?.employeeFamilyDtos;

  return (
    <div className="resume-wrapper">
      <Grid container spacing={2} className="mb-20">
        <Grid item md={4} align="center">
          <div className="resume-image">
            <img
              alt="avatar"
              src={
                employee?.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht9-qZYmqErdGMhJVbRf7BfhLRGspNWaFnR8nddu3x7Da7nqh23vsG6VWtG_VE9G9kLU&usqp=CAU"
              }
            />
          </div>
        </Grid>
        <Grid item md={8}>
          <h3 className="resume-sub-heading">
            Cộng hòa xã hội chủ nghĩa việt nam
          </h3>
          <h4 className="resume-sub-heading heading-underline">
            Độc lập - Tự do - Hạnh phúc
          </h4>
          <h3 className="resume-heading">Sơ yếu lý lịch</h3>
          <h4 className="resume-sub-heading">Tự thuật</h4>
        </Grid>
      </Grid>
      <div className="resume-body">
        <div className="resume-information">
          <h4 className="information-heading">I. Thông tin bản thân</h4>
          <div className="information-details">
            <Grid container spacing={2}>
              <Grid item md={9} lg={9} sm={9} className="detail">
                <span className="detail-tittle">1. Họ và tên nhân viên:</span>
                <span className="detail-content underline-dashed">
                  {employee?.name}
                </span>
              </Grid>
              <Grid item md={3} lg={3} sm={3} className="detail">
                <span className="detail-tittle">2. Giới tính:</span>
                <span className="detail-content underline-dashed">
                  {GENDER.find((gender) => gender.id === employee?.gender)
                    ?.name || ""}
                </span>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={6} lg={6} sm={12} className="detail">
                <span className="detail-tittle">3. Ngày sinh:</span>
                <span className="detail-content underline-dashed">
                  {moment(employee?.dateOfBirth).format("DD/MM/YYYY")}
                </span>
              </Grid>
              <Grid item md={6} lg={6} sm={12} className="detail">
                <span className="detail-tittle">4. Điện thoại liên lạc: :</span>
                <span className="detail-content underline-dashed">
                  {employee?.phone}
                </span>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={12} lg={12} sm={12} className="detail">
                <span className="detail-title">5. Hộ khẩu thường trú:</span>
                <span className="detail-content underline-dashed">
                  {employee?.address}
                </span>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={6} lg={6} sm={6} className="detail">
                <span className="detail-tittle">6. Căn cước công dân:</span>
                <span className="detail-content underline-dashed">
                  {employee?.citizenIdentificationNumber}
                </span>
              </Grid>
              <Grid item md={6} lg={6} sm={6} className="detail">
                <span className="detail-tittle">7. Ngày cấp:</span>
                <span className="detail-content underline-dashed">
                  {moment(employee?.dateOfIssuanceCard).format("DD/MM/YYYY")}
                </span>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={12} lg={12} sm={12} className="detail">
                <span className="detail-tittle">8. Nơi cấp :</span>
                <span className="detail-content underline-dashed">
                  {employee?.placeOfIssueCard}
                </span>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="resume-family mb-20">
          <h4 className="family-heading my-20">II. Thông tin gia đình</h4>
          <div className="family-detail-table">
            <TableContainer>
              <Table border="1">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" width="6%" className="table-head p-0">
                      STT
                    </TableCell>
                    <TableCell
                      align="center"
                      width="18%"
                      className="table-head p-8"
                    >
                      Tên
                    </TableCell>
                    <TableCell
                      align="center"
                      width="14%"
                      className="table-head p-8"
                    >
                      Ngày sinh
                    </TableCell>
                    <TableCell
                      align="center"
                      width="12%"
                      className="table-head p-8"
                    >
                      Quan hệ
                    </TableCell>
                    <TableCell
                      align="center"
                      width="14%"
                      className="table-head p-8"
                    >
                      Điện thoại
                    </TableCell>
                    <TableCell
                      align="center"
                      width="16%"
                      className="table-head p-8"
                    >
                      CCCD/CMND
                    </TableCell>
                    <TableCell
                      align="center"
                      width="20%"
                      className="table-head p-8"
                    >
                      Địa chỉ
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataFamily?.length > 0 ? (
                    dataFamily?.map((family, index) => (
                      <TableRow>
                        <TableCell align="center" className="table-cell p-8">
                          <span>{index + 1}</span>
                        </TableCell>
                        <TableCell align="left" className="table-cell p-8">
                          <span>{family?.name}</span>
                        </TableCell>
                        <TableCell align="center" className="table-cell p-8">
                          <span>
                            {moment(family?.dateOfBirth).format("DD/MM/YYYY")}
                          </span>
                        </TableCell>
                        <TableCell align="center" className="table-cell p-8">
                          <span>
                            {FAMILY_MEMBER.find((item) => item.id === family?.relationShip)?.name}
                          </span>
                        </TableCell>
                        <TableCell align="center" className="table-cell p-8">
                          <span>{family?.phoneNumber}</span>
                        </TableCell>
                        <TableCell align="center" className="table-cell p-8">
                          <span>{family?.citizenIdentificationNumber}</span>
                        </TableCell>
                        <TableCell align="left" className="table-cell p-8">
                          <span>{family?.address}</span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell className="table-cell p-8"></TableCell>
                      <TableCell className="table-cell p-8"></TableCell>
                      <TableCell className="table-cell p-8"></TableCell>
                      <TableCell className="table-cell p-8"></TableCell>
                      <TableCell className="table-cell p-8"></TableCell>
                      <TableCell className="table-cell p-8"></TableCell>
                      <TableCell className="table-cell p-8"></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="resume-reassurance">
          <h4 className="reassurance-heading">III. LỜI CAM ĐOAN</h4>
          <p>
            Tôi xin cam đoan bản khai sơ yếu lý lịch trên là đúng sự thật, nếu
            có điều gì không đúng tôi xin chịu trách nhiệm trước pháp luật về
            lời khai của mình.
          </p>
        </div>
      </div>
      <div className="resume-footer mt-20">
        <div className="footer-container">
          <div className="resume-date">
            <span className="reassurance-place">Hà Nội</span>,
            <span className="reassurance-day">
              <span className="date-tittle">ngày</span>
              <span className="date-content date-underline-dashed">
                {new Date().getDate()}
              </span>
            </span>
            <span className="reassurance-month">
              <span className="date-tittle">tháng</span>
              <span className="date-content date-underline-dashed">
                {new Date().getMonth() + 1}
              </span>
            </span>
            <span className="reassurance-year">
              <span className="date-tittle">năm</span>
              <span className="date-content date-underline-dashed">
                {new Date().getFullYear()}
              </span>
            </span>
          </div>
          <h4 className="footer-label">Người khai</h4>
          <span className="footer-sub-label">(Ký và ghi rõ họ tên)</span>
          <div className="footer-signature">{employee?.name}</div>
        </div>
      </div>
    </div>
  );
};
export default TabInformation;
