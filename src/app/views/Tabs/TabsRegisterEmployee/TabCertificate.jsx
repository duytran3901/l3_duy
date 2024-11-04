import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../../../styles/views/_tab-certificate.scss";
const TabCertificate = (props) => {
  const { employee } = props;
  const dataCertificate = employee.certificatesDto;
  const [certificate, setCertificate] = useState();
  useEffect(() => {


    if (employee?.id) {
      setCertificate(dataCertificate);
    } else {
      setCertificate();
    }
  }, [employee?.id]);
  return (
    <div className="height-A4">
      <div className="certificate-wrapper">
        <h2 className="certificate-heading">Văn bằng</h2>
        <div className="certificate-detail-table">
          <TableContainer>
            <Table border="1">
              <TableHead>
                <TableRow>
                  <TableCell align="center" width="8%" className="table-head p-0">
                    STT
                  </TableCell>
                  <TableCell align="center" width="20%" className="table-head p-8">
                    Tên văn bằng
                  </TableCell>
                  <TableCell align="center" width="14%" className="table-head p-8">
                    Ngày cấp
                  </TableCell>
                  <TableCell align="center" width="20%" className="table-head p-8">
                    Lĩnh vực
                  </TableCell>
                  <TableCell align="center" width="30%" className="table-head p-8">
                    Nội dung
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certificate && certificate?.length > 0 ? (
                  certificate?.map((item, index) => (
                    <TableRow key={item?.id}>
                      <TableCell align="center" className="table-cell p-8">
                        <span>{index + 1}</span>
                      </TableCell>
                      <TableCell align="left" className="table-cell p-8">
                        <span>{item?.certificateName}</span>
                      </TableCell>
                      <TableCell align="center" className="table-cell p-8">
                        <span>
                          {moment(item?.issueDate).format("DD/MM/YYYY")}
                        </span>
                      </TableCell>
                      <TableCell align="left" className="table-cell p-8">
                        <span>{item?.field}</span>
                      </TableCell>
                      <TableCell align="left" className="table-cell p-8">
                        <span>{item?.content}</span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="table-cell p-20"></TableCell>
                    <TableCell className="table-cell p-20"></TableCell>
                    <TableCell className="table-cell p-20"></TableCell>
                    <TableCell className="table-cell p-20"></TableCell>
                    <TableCell className="table-cell p-20"></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};
export default TabCertificate;
