import React from "react";
import "../styles/resume.css";
import { useSelector } from "react-redux";

const Resume = ({OnChangeHandler}) => {
  const { emp, skill, exp, education } = useSelector((state) => state);
  //   console.log(emp, skill, exp, education);
  return (
    <div className="resume-main-container">
      <span className="span-div">
         <p>Resume </p>
      </span>
      <div className="second-div">
        <div className="personal-info">
          <p>
            Name:<span>{emp[0]?.name}</span>
          </p>
          <p>
            Contact:<span>{emp[0]?.contact}</span>
          </p>
          <p>
            Address:<span>{emp[0]?.address}</span>
          </p>
          <p>
            Pincode:<span>{emp[0]?.pincode}</span>
          </p>
          <p>
            Country:<span>{emp[0]?.country}</span>
          </p>
        </div>
        <div className="skill-info">
          <p style={{ margin: "5px" }}>
            Skills:
            {skill?.allSkillStoreByRedux?.map((skil) => (
              <span key={skil.id} className="skill">
                {skil.namee}
              </span>
            ))}
          </p>
          <p style={{ margin: "5px" }}>
            Education:
            {education?.allEducationInfo?.map((edu) => (
              <span key={edu.id} className="skill">
                {edu.program}
              </span>
            ))}
          </p>
          <p style={{ margin: "5px" }}>
            Experiance:
            {exp?.allWorkExperience?.map((expe) => (
              <span key={expe.id} className="skill">
                {`${expe.companyName}  ${expe.noOfExp} years`}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="footer">
        <div className="back" onClick={()=>OnChangeHandler("Personal Info")}>Back</div>
      </div>
    </div>
  );
};

export default Resume;
