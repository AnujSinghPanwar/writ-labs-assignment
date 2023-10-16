import React, { useState } from "react";
import "./App.css";
import { Segmented } from "antd";
import PersonalInfo from "./pages/PersonalInfo";
import WorkExp from "./pages/WorkExp";
import EducationInfo from "./pages/EducationInfo";
import SkillInfo from "./pages/SkilInfo";
import Resume from "./pages/Resume";

const App = () => {
  const [btnActive, setBtnActive] = useState("Personal Info");
  const OnChangeHandler = (e) => {
    setBtnActive(e);
  };
  return (
    <div className="main-container">
      <div className="nav">
        <Segmented
          // onChange={(e) => setBtnActive(e)}
          value={btnActive}
          options={["Personal Info", "Work experience", "Education", "Skills","Resume"]}
        />
      </div>
      <div className="main-content">
        {btnActive === "Personal Info" ? (
          <PersonalInfo OnChangeHandler={OnChangeHandler} />
        ) : btnActive === "Work experience" ? (
          <WorkExp OnChangeHandler={OnChangeHandler} />
        ) : btnActive === "Education" ? (
          <EducationInfo OnChangeHandler={OnChangeHandler} />
        ) : btnActive === "Skills" ? (
          <SkillInfo OnChangeHandler={OnChangeHandler} />
        ) : (
          <Resume OnChangeHandler={OnChangeHandler} />
        )}
      </div>
    </div>
  );
};

export default App;
