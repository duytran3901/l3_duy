import React, { useEffect, useState } from "react";
import "../../../../styles/views/_tab-CV.scss";
import {
  ACTION_EMPLOYEE,
  GENDER,
  TEAM,
  EMPLOYEE_STATUS,
} from "app/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Button, Icon, IconButton } from "@material-ui/core";
import { ConfirmationDialog } from "egret";
import iconGender from "../../../assets/images/gender.png";
import iconCake from "../../../assets/images/cake.png";
import iconLocation from "../../../assets/images/location.png";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { CERTIFICATE, EMPLOYEE, EXPERIENCE } from "app/redux/actions/actions";
import ExperienceDialog from "app/views/components/Dialog/ExperienceDialog";

const TabCV = (props) => {
  const { employee } = props;
  const [employeeSkill, setEmployeeSkill] = useState(employee?.skill);
  const dispatch = useDispatch();
  const certificates = useSelector(state => state.certificate.certificates);
  const experiences = useSelector(state => state.experience.experiences);
  const reload = useSelector(state => state.experience.reload);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [exp, setExp] = useState({});
  const [isOpenExpDialog, setIsOpenExpDialog] = useState(false);
  const [isTextSkill, setIsTextSkill] = useState(false);

  useEffect(() => {
    setEmployeeSkill(employee?.skill);
    if (employee) {
      dispatch({ type: CERTIFICATE.GET_CERTIFICATES, payload: { employeeId: employee.id } });
      dispatch({ type: EXPERIENCE.GET_EXPERIENCES, payload: { employeeId: employee.id } });
    }
  }, [employee, reload]);

  const handleOpenExpDialog = (exp) => {
    setIsOpenExpDialog(true);
    setExp(exp);
  };

  const handleDelete = (item) => {
    setExp(item);
    setOpenConfirmationDialog(true);
  };

  const handleConfirmDelete = (id) => {
    if (id) dispatch({ type: EXPERIENCE.DELETE_EXPERIENCE, payload: id })
    setOpenConfirmationDialog(false);
    setExp({})
  };

  const handleOpenTextSkill = () => {
    setIsTextSkill(true);
  };

  const handleSubmit = () => {
    dispatch({
      type: EMPLOYEE.UPDATE_EMPLOYEE,
      payload: {
        id: employee?.id,
        data: {
          ...employee,
          skill: employeeSkill
        }
      }
    });
    setIsTextSkill(false);
  };

  const handleChange = (event) => {
    setEmployeeSkill(event.target.value);
  };

  const cancleAddSkill = () => {
    setIsTextSkill(false);
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
          <h4 className="skills-tittle">
            kỹ năng
            {ACTION_EMPLOYEE.EDIT.includes(Number(employee?.submitProfileStatus))
              && EMPLOYEE_STATUS.ADD.includes(Number(employee?.submitProfileStatus))
              && (<IconButton size="small">
                <Icon
                  fontSize="small"
                  color="primary"
                  onClick={handleOpenTextSkill}
                >
                  edit
                </Icon>
              </IconButton>)
            }
          </h4>
          <div></div>
          {!isTextSkill && (
            <ul className="skill-list">
              {employee?.skill &&
                employee?.skill
                  .split("\n")
                  .filter((skill) => skill.trim() !== "")
                  .map((skill, index) => <li key={index}>{skill}</li>)}
            </ul>
          )}
          <div>
            {isTextSkill && (
              <ValidatorForm onSubmit={handleSubmit} className="ml-30 mr-14">
                <TextValidator
                  multiline
                  fullWidth
                  className="mt-16 "
                  name="skill"
                  value={employeeSkill || ""}
                  onChange={(e) => handleChange(e)}
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
            <div className="button-exp">
              {ACTION_EMPLOYEE.EDIT.includes(Number(employee?.submitProfileStatus))
                && EMPLOYEE_STATUS.ADD.includes(Number(employee?.submitProfileStatus))
                && (<IconButton size="small">
                  <Icon
                    fontSize="small"
                    color="primary"
                    onClick={() => handleOpenExpDialog(exp)}
                  >
                    add
                  </Icon>
                </IconButton>)
              }
            </div>
          </h3>

          {experiences?.map((item) => {
            return (
              <div className="cv-experience" key={item.id}>
                <h4 className="experience-tittle">
                  <div>
                    <span className="experience-process">
                      {`${moment(item?.startDate).format("MM/YYYY")} - ${moment(item?.endDate).format("MM/YYYY")}`}
                      <span className="experience-dot">&#x2022;</span>
                    </span>
                    <span className="experience-company">
                      {item?.companyName}
                    </span>
                    <span className="button-exp">
                      {" "}
                      {ACTION_EMPLOYEE.EDIT.includes(Number(employee?.submitProfileStatus))
                        && EMPLOYEE_STATUS.ADD.includes(Number(employee?.submitProfileStatus))
                        && (
                          <>
                            <IconButton>
                              <Icon
                                fontSize="small"
                                color="primary"
                                onClick={() => handleOpenExpDialog(item)}
                              >
                                edit
                              </Icon>
                            </IconButton>
                            <IconButton>
                              <Icon
                                fontSize="small"
                                color="error"
                                onClick={() => handleDelete(item)}
                              >
                                delete
                              </Icon>
                            </IconButton>
                          </>
                        )
                      }
                    </span>
                  </div>
                </h4>

                <h5 className="experience-job">Mô tả công việc</h5>

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
          })}
        </div>
        <div className="cv-certificates border-left">
          <h3 className="certificates-tittle">Chứng chỉ</h3>
          <div className="certificates-list">
            {certificates?.map((certificate) => {
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
            })}
          </div>
        </div>
      </div>
      {isOpenExpDialog && (
        <ExperienceDialog
          open={isOpenExpDialog}
          setOpen={setIsOpenExpDialog}
          exp={exp}
          setExp={setExp}
          employeeId={employee?.id}
        />
      )}
      <ConfirmationDialog
        open={openConfirmationDialog}
        onYesClick={() => handleConfirmDelete(exp?.id)}
        title='Bạn có chắc chắn muốn xóa kinh nghiệm làm việc này không?'

        Yes='Có'
        No='Không'
      />
    </div>
  );
};
export default TabCV;
