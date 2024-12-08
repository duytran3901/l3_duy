import React, { useEffect, useState } from "react";
import "../../../../styles/views/_tab-CV.scss";
import {
  ACTION_EMPLOYEE,
  GENDER,
  TEAM,
  EMPLOYEE_STATUS,
} from "app/constants/constants";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
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
import { shorten } from "app/utilities/shorten";

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
        </div>
        <div className="cv-skills">
          <h4 className="skills-tittle">
            <span>kỹ năng</span>
            {ACTION_EMPLOYEE.EDIT.includes(Number(employee?.submitProfileStatus))
              && EMPLOYEE_STATUS.ADD.includes(Number(employee?.submitProfileStatus))
              && (<IconButton size="small" className="px-8">
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
                  className="mt-16"
                  name="skill"
                  value={employeeSkill || ""}
                  onChange={(e) => handleChange(e)}
                />
                <Button
                  className="mt-12 mr-12 color-error"
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    cancleAddSkill();
                  }}
                >
                  Hủy
                </Button>
                <Button
                  className="mt-12"
                  size="small"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Lưu
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
                  <span className="activity-name">
                    TÌNH NGUYỆN VIÊN <br />
                    TỔ CHỨC HOA PHƯỢNG ĐỎ
                  </span>
                  <br></br>
                  <ul className="activity-description">
                    <li>
                      <span className="activity-dot">
                        &#x2022;
                      </span>
                      <span>Tập hợp những món quà và phân phát tới người vô gia cư.</span>
                    </li>
                    <li>
                      <span className="activity-dot">
                        &#x2022;
                      </span>
                      <span>Chia sẻ động viên họ vượt qua giai đoạn khó khăn, giúp họ có suy nghĩ lạc quan hươn trong cuộc sống.</span>
                    </li>
                  </ul>
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
          <div className="item-detail details-gender">
            <img alt="icon" src={iconGender} />
            <span>
              {GENDER.find((item) => item.id === employee?.gender)?.name}
            </span>
          </div>
          <div className="item-detail details-email">
            <span className="detail-icon">
              <MailOutlineIcon></MailOutlineIcon>
            </span>
            <span>{shorten(employee?.email, 26)}</span>
          </div>
          <div className="item-detail details-birthday">
            <img alt="icon" src={iconCake} />
            <span>{moment(employee?.dateOfBirth).format("DD/MM/YYYY")}</span>
          </div>
          <div className="item-detail details-phone">
            <span className="detail-icon">
              <PhoneIcon></PhoneIcon>
            </span>
            <span>{employee?.phone}</span>
          </div>
          <div className="item-detail details-address">
            <img alt="icon" src={iconLocation} />
            <span>{shorten(employee?.address, 140)}</span>
          </div>
        </div>
        <div className="cv-goals border-left">
          <h3 className="goals-tittle">Mục tiêu nghề nghiệp</h3>
          <div className="goals-layer">
            <p className="goals-content">
              <span className="goals-quotes_left">&#700;&#700;</span>
              <br />
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
            <span>kinh nghiệm làm việc{" "}</span>
            <div className="button-exp">
              {ACTION_EMPLOYEE.EDIT.includes(Number(employee?.submitProfileStatus))
                && EMPLOYEE_STATUS.ADD.includes(Number(employee?.submitProfileStatus))
                && (<IconButton size="small" className="px-12 py-0">
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
                      {shorten(item?.companyName, 27)}
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

                <h5 className="experience-job">Trưởng nhóm kinh doanh</h5>
                {/* <h5 className="experience-job">Mô tả công việc</h5> */}

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
                      : ""}: {certificate.certificateName}
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
        title='Bạn có chắc chắn muốn xóa kinh nghiệm làm việc này không?'
        open={openConfirmationDialog}
        onConfirmDialogClose={() => setOpenConfirmationDialog(false)}
        onYesClick={() => handleConfirmDelete(exp?.id)}
        Yes='Xác nhận'
        No='Hủy'
      />
    </div>
  );
};
export default TabCV;
