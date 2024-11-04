import React, { useEffect, useState } from "react";
import "../../../../styles/views/_tab-CV.scss";
import {
  ACTION_EMPLOYEE,
  GENDER,
  POSITION,
  TEAM,
  // STATUS_EMPLOYEE,
} from "app/constants/constants";
import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteExpByEmployeeActionRequest,
//   getExperienceRequest,
// } from "app/redux/actions/experienceAction";
import moment from "moment";
// import {
//   deleteCertificateActionRequest,
//   searchCertificateByEmployeeAction,
// } from "app/redux/actions/certificateAction";
import { Button, Divider, Fab, Icon, IconButton } from "@material-ui/core";
// import AddCertificateDialog from "app/views/organisms/addCertificate/addCertificateDialog";
import { ConfirmationDialog } from "egret";
// import AddExprcienceDialog from "app/views/organisms/addExpercienceDialog/addExpercienceDialog";
import iconGender from "../../../assets/images/gender.png";
import iconCake from "../../../assets/images/cake.png";
import iconLocation from "../../../assets/images/location.png";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import { updateEmployeeAction } from "app/redux/actions/employeeAction";
const TabCV = (props) => {
  const { employee, setEmployee, employeeSkill } = props;
  const DELETE_CERTIFICATE = "DELETE_CERTIFICATE";
  const DELETE_EXP = "DELETE_EXP";
  const dispatch = useDispatch();
  // const { reload: experienceReload, experienceList } = useSelector(
  //   (state) => state.experience
  // );

  // const { reload: certificateReload, certificateData } = useSelector(
  //   (state) => state.certificate
  // );

  const [openCertificateDialog, setOpenCertificateDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [typeDelete, setTypeDelete] = useState("");
  const [dataDelete, setDataDelete] = useState();
  const [certificate, setCertificate] = useState({});
  const [exp, setExp] = useState({});
  const [openExpDialog, setOpenExpDialog] = useState(false);
  const updatePage = () => {
    // dispatch(getExperienceRequest(employee?.id));
    // dispatch(searchCertificateByEmployeeAction(employee?.id));
  };
  const [isTextSkill, setIsTextSkill] = useState(false);
  useEffect(() => {
    updatePage();
  }, [employee?.id]);
  const handleAddCertificateOverview = () => {
    setOpenCertificateDialog(true);
  };
  const handleCloseAddCertificateDialog = () => {
    setOpenCertificateDialog(false);
  };
  const handleOpenCertificate = () => {
    handleAddCertificateOverview(true);
    setCertificate({});
  };
  const handleOpenExp = () => {
    setOpenExpDialog(true);
    setExp({});
  };
  const handleCloseAddExpDialog = () => {
    setOpenExpDialog(false);
  };
  const handleEdit = (certificate) => {
    handleAddCertificateOverview(true);
    setCertificate(certificate);
  };
  const handleEditExp = (exp) => {
    setOpenExpDialog(true);
    setExp(exp);
  };
  const handleDialogDeleteClose = () => {
    setOpenConfirmationDialog(false);
  };
  const handleDelete = (item, type) => {
    setTypeDelete(type);
    setOpenConfirmationDialog(true);
    setDataDelete(item);
  };
  const handleConfirmDelete = (id) => {
    if (typeDelete === DELETE_CERTIFICATE) {
      // dispatch(deleteCertificateActionRequest(id));
    } else {
      // dispatch(deleteExpByEmployeeActionRequest(id));
    }
    handleDialogDeleteClose();
  };
  const handleOpenTextSkill = () => {
    setIsTextSkill(true);
  };
  const handleSubmit = () => {
    // dispatch(updateEmployeeAction(employeeSkill));
    setIsTextSkill(false);
  };
  const handleChange = (event) => {
    setEmployee({
      ...employeeSkill,
      [event.target.name]: event.target.value,
    });
  };
  const cancleAddSkill = () => {
    setIsTextSkill(false);
    setEmployee(employee);
  };
  return (
    <div className="cv">
      <div className="left-content">
        <div className="cv-profile">
          <div className="profile-avatar">
            <img
              alt="avatar"
              src={employee?.image || "/assets/images/avatar.jpg"}
            />
          </div>
          <p className="profile-email">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <span>{employee?.email}</span>
          </p>
          <p className="profile-phone">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            <span>{employee?.phone}</span>
          </p>
        </div>
        <div className="cv-skills">
          {/* <h4 className="skills-tittle">
            kỹ năng
            {ACTION_EMPLOYEE.EDIT.includes(
              Number(employee?.submitProfileStatus)
            ) &&
              STATUS_EMPLOYEE.ADD.includes(
                Number(employee?.submitProfileStatus)
              ) && (
                <IconButton size="small">
                  <Icon
                    fontSize="small"
                    color="primary"
                    onClick={handleOpenTextSkill}
                  >
                    edit
                  </Icon>
                </IconButton>
              )}
          </h4> */}
          <div></div>
          {!isTextSkill && (
            <ul className="skill-list">
              {employeeSkill?.skill &&
                employeeSkill?.skill
                  .split("\n")
                  .filter((skill) => skill.trim() !== "")
                  .map((skill, index) => <li key={index}>{skill}</li>)}
            </ul>
          )}

          <div>
            {isTextSkill && (
              <>
                <>
                  <ValidatorForm onSubmit={handleSubmit}>
                    <TextValidator
                      multiline
                      fullWidth
                      className="mt-16 "
                      name="skill"
                      value={employeeSkill?.skill || ""}
                      onChange={handleChange}
                      validators={["maxStringLength:1000"]}
                      // errorMessages={[`${t("giới hạn")}(1000 kí tự)`]}
                      errorMessages={["giới hạn 1000 kí tự"]}
                    />
                    <Button
                      className="mt-12 mr-12"
                      size="small"
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Lưu
                    </Button>
                    <Button
                      className="mt-12 color-error"
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        cancleAddSkill();
                      }}
                    >
                      Hủy
                    </Button>
                  </ValidatorForm>
                </>
              </>
            )}
          </div>
        </div>
        <div className="cv-skill-rating">
          <h4 className="skill-rating-tittle">Ngoại ngữ</h4>
          <div className="skill-rating-content">
            <div className="skill-rating-content-item">
              <span>Tiếng anh</span>
              <div className="rating-wrapper">
                <div className="cv-rating"></div>
                <div className="cv-rating"></div>
                <div className="cv-rating"></div>
              </div>
            </div>
            <div className="skill-rating-content-item">
              <span>Tiếng trung</span>
              <div className="rating-wrapper">
                <div className="cv-rating"></div>
                <div className="cv-rating"></div>
                <div className="cv-rating rating-disabled"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="cv-skill-rating ">
          <h4 className="skill-rating-tittle rating2">Tin học</h4>
          <div className="skill-rating-content">
            <div className="skill-rating-content-item">
              <span>Word</span>
              <div className="rating-wrapper">
                <div className="cv-rating"></div>
                <div className="cv-rating"></div>
                <div className="cv-rating"></div>
              </div>
            </div>
            <div className="skill-rating-content-item">
              <span>Excel</span>
              <div className="rating-wrapper">
                <div className="cv-rating"></div>
                <div className="cv-rating"></div>
                <div className="cv-rating rating-disabled"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="cv-activity">
          <h4 className="activity-tittle">Hoạt động</h4>
          <div className="activity-content">
            <div className="activity-formData">
              <ul className="activity-list">
                <li>
                  <span className="activity-day">01/2019 - 03/2022</span>
                  <br></br>
                  <span className="activity-name">TÌNH NGUYỆN VIÊN</span>
                  <br></br>
                  <span className="activity-description">
                    -Tập hợp những món quà và phân phát tới người vô gia cư.
                    <br></br>
                    -Chia sẻ động viên họ vượt qua giai đoạn khó khăn, giúp họ
                    <br></br>
                    có suy nghĩ lạc quan hươn trong cuộc sống.
                  </span>
                </li>
                <li>
                  <span className="activity-day">02/2019 - 05/2019</span>
                  <br></br>
                  <span className="activity-name">TÌNH NGUYỆN VIÊN</span>
                  <br></br>
                  <span className="activity-description">
                    -Tham gia đội tình nguyện dạy học cho trẻ em làng SOS- cầu
                    giấy.
                    <br></br>
                    -Tham gia hiến máu 2019.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="right-content">
        <div className="cv-tittle border-left">
          <h1 className="tittle-name">{employee?.name}</h1>
          <h4 className="job-tittle">{TEAM.find((item) => item.id === employee?.team)?.name}</h4>
        </div>
        <div className="cv-details">
          <div className="details-gender">
            <img alt="icon" src={iconGender} />
            <span>
              {GENDER.find((item) => item.id === employee?.gender)?.name}
            </span>
          </div>
          <div className="details-birthday">
            <img alt="icon" src={iconCake} />
            <span>{moment(employee?.dateOfBirth).format("DD/MM/YYYY")}</span>
          </div>
          <div className="details-address">
            <img alt="icon" src={iconLocation} />
            <span>{employee?.address}</span>
          </div>
        </div>
        <div className="cv-goals border-left">
          <h3 className="goals-tittle">Mục tiêu nghề nghiệp</h3>
          <div className="goals-layer">
            <p className="goals-content">
              <span className="goals-quotes_left">&#700;&#700;</span>
              Áp dụng những kinh nghiệm về kỹ năng bán hàng và sự hiểu biết về
              thị trường để trở thành một nhân viên bán hàng chuyên nghiệp, mang
              đến nhiều giá trị cho khách hàng. Từ đó giúp Công ty tăng số lượng
              khách hàng và mở rộng tập khách hàng.
              <span className="goals-quotes_right">&#700;&#700;</span>
            </p>
          </div>
        </div>
        <div className="cv-experiences border-left">
          <h3 className="experiences-heading">
            kinh nghiệm làm việc{" "}
            {/* <div className="button-exp">
              {ACTION_EMPLOYEE.EDIT.includes(
                Number(employee?.submitProfileStatus)
              ) &&
                STATUS_EMPLOYEE.ADD.includes(
                  Number(employee?.submitProfileStatus)
                ) && (
                  <IconButton>
                    <Icon
                      fontSize="small"
                      color="primary "
                      onClick={() => {
                        handleOpenExp();
                      }}
                    >
                      add
                    </Icon>
                  </IconButton>
                )}
            </div> */}
          </h3>

          {/* {experienceList?.map((item) => {
            return (
              <div className="cv-experience" key={item.id}>
                <h4 className="experience-tittle">
                  <div>
                    <span className="experience-process">
                      {`${moment(item?.startDate).format("MM/YYYY")} - ${moment(
                        item?.endDate
                      ).format("MM/YYYY")}`}
                      <span className="experience-dot">&#x2022;</span>
                    </span>
                    <span className="experience-company">
                      {item?.companyName}
                    </span>
                    <span className="button-exp">
                      {" "}
                      {ACTION_EMPLOYEE.EDIT.includes(
                        Number(employee?.submitProfileStatus)
                      ) &&
                        STATUS_EMPLOYEE.ADD.includes(
                          Number(employee?.submitProfileStatus)
                        ) && (
                          <>
                            <IconButton>
                              <Icon
                                fontSize="small"
                                color="primary"
                                onClick={() => {
                                  handleEditExp(item);
                                }}
                              >
                                edit
                              </Icon>
                            </IconButton>
                            <IconButton>
                              <Icon
                                fontSize="small"
                                color="error"
                                onClick={() => {
                                  handleDelete(item, DELETE_EXP);
                                }}
                              >
                                delete
                              </Icon>
                            </IconButton>
                          </>
                        )}
                    </span>
                  </div>
                </h4>

                <h5 className="experience-job">Nhân Viên Bán Hàng</h5>

                <div className="experience-list">
                  {item?.jobDescription?.split("-").map((part, index) => (
                    <span className="experience-detail">
                      <span key={index} className="detail-dot">
                        &#x2022;
                      </span>
                      <span className="detail-content">{part.trim()}</span>
                      {index < item.jobDescription.split("-").length - 1 && (
                        <br />
                      )}{" "}
                    </span>
                  ))}
                </div>
              </div>
            );
          })} */}
        </div>
        <div className="cv-certificates border-left">
          <h3 className="certificates-tittle">Chứng chỉ</h3>
          <div className="certificates-list">
            {/* {employee?.id &&
              certificateData &&
              certificateData.map((certificate) => {
                return (
                  <span className="certificates-detail">
                    <span className="detail-dot">&#x2022;</span>
                    <span className="detail-content">
                      {typeof certificate?.issueDate
                        ? moment(certificate?.issueDate).format("YYYY")
                        : ""}
                      : {certificate.certificateName}
                    </span>
                  </span>
                );
              })} */}
          </div>
        </div>
      </div>
      {/* {openExpDialog && (
        // <AddExprcienceDialog
        //   open={openExpDialog}
        //   onClose={handleCloseAddExpDialog}
        //   exp={exp}
        //   employeeId={employee?.id}
        // />
      )} */}
      <ConfirmationDialog
        open={openConfirmationDialog}
        onConfirmDialogClose={handleDialogDeleteClose}
        onYesClick={() => handleConfirmDelete(dataDelete?.id)}
        title='Bạn có chắc chắn muốn xóa nhân viên này không?'
        text={
          typeDelete === DELETE_CERTIFICATE
            ? `Bạn có chắc chắn xóa chứng chỉ ${dataDelete?.certificateName} ?`
            : `Bạn có chắc chắn xóa kinh nghiệm ở ${dataDelete?.companyName} ?`
        }
        Yes='Có'
        No='Không'
      />
    </div>
  );
};
export default TabCV;
