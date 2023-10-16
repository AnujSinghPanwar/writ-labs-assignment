import React, { useEffect, useState } from "react";
import "../styles/work.css";
import { Button, Col, Input, Row } from "antd";
import {
  EditOutlined,
  PlusCircleOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addEducation, updateEducation } from "../redux/eduSlice";
import { v4 } from "uuid";

const EducationInfo = ({ OnChangeHandler }) => {
  const { allEducationInfo } = useSelector((state) => state.education);
  const dispatch = useDispatch();
  const [singleEdu, setSingleEdu] = useState([
    {
      id: v4(),
      program: "",
      year: "",
    },
  ]);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [updateGraduation, setUpdateGraduation] = useState("");
  const [updateYear, setUpdateYear] = useState("");

  // add new row
  const addEducationRow = () => {
    let arr = singleEdu;
    setSingleEdu([...arr, { id: v4(), program: "", year: "" }]);
  };

  // reset function
  const resetHandler = () => {
    setSingleEdu([
      {
        id: v4(),
        program: "",
        year: "",
      },
    ]);
    setUpdateToggle(false);
  };

  // Input Handler
  const inputHandler = (name, id, value) => {
    if (name == "program") {
      setSingleEdu((a) =>
        a.map((aa) => {
          if (aa.id == id) {
            {
              return { ...aa, program: value };
            }
          } else {
            return aa;
          }
        })
      );
    } else if (name == "year") {
      setSingleEdu((a) =>
        a.map((aa) => {
          if (aa.id == id) {
            {
              return { ...aa, year: value };
            }
          } else {
            return aa;
          }
        })
      );
    }
  };

  // save Eduction Info
  const saveEducationHandler = () => {
    if (updateToggle) {
      if (updateGraduation == "") {
        toast.error("Please Fill the program");
      } else if (updateYear == "") {
        toast.error("Please Fill your passing year");
      } else {
        dispatch(
          updateEducation({ id: updateId, updateGraduation, updateYear })
        );
        resetHandler();
      }
    } else {
      let validationMessage = false;
      const arr = singleEdu;
      arr.map((row) => {
        if (row.program == "") {
          validationMessage = "Please Fill the program";
        } else if (row.year == "") {
          validationMessage = "Please Fill your passing year";
        }
      });
      if (validationMessage) {
        return toast.error(validationMessage);
      }
      dispatch(addEducation(singleEdu));
      resetHandler();
    }
  };

  //
  const updateShowHandle = (id) => {
    setUpdateToggle(true);
    const getIdData = allEducationInfo.find((ele) => ele.id === id);
    setUpdateGraduation(getIdData.program);
    setUpdateYear(getIdData.year);
    setUpdateId(id);
  };

  return (
    <div className="personal-main-container">
      <Row className="main-row">
        <Col span={12}>
          {updateToggle ? (
            <>
              <Row gutter={[10, 10]} style={{ marginTop: "10px" }}>
                <Col span={12}>
                  <Input
                    placeholder="Update Graduation"
                    value={updateGraduation}
                    onChange={(e) => setUpdateGraduation(e.target.value)}
                  />
                </Col>
                <Col span={12}>
                  <Input
                    placeholder="Passing Year"
                    value={updateYear}
                    onChange={(e) => setUpdateYear(e.target.value)}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <>
              {singleEdu.map((item) => (
                <Row
                  gutter={[10, 10]}
                  key={item.id}
                  style={{ marginTop: "10px" }}
                >
                  <Col span={12}>
                    <Input
                      placeholder="Graduation"
                      value={item.program}
                      onChange={(e) =>
                        inputHandler("program", item.id, e.target.value)
                      }
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      placeholder="Passing Year"
                      value={item.year}
                      onChange={(e) =>
                        inputHandler("year", item.id, e.target.value)
                      }
                    />
                  </Col>
                </Row>
              ))}
            </>
          )}
          <Row gutter={[10, 10]} style={{ marginTop: "10px" }}>
            <Col span={24} className="btn">
              {updateToggle ? (
                <>
                  <Button
                    className="btn-save"
                    type="primary"
                    onClick={saveEducationHandler}
                  >
                    Update Info
                  </Button>
                  <Button
                    className="btn-reset"
                    type="dashed"
                    onClick={resetHandler}
                  >
                    Reset
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="btn-save"
                    type="primary"
                    onClick={saveEducationHandler}
                  >
                    Save Info
                  </Button>
                  <Button
                    className="btn-reset"
                    type="dashed"
                    onClick={resetHandler}
                  >
                    Reset
                  </Button>
                  <Button
                    className="btn-add"
                    icon={<PlusCircleOutlined />}
                    type="dashed"
                    onClick={addEducationRow}
                  >
                    Add Education
                  </Button>
                  <Button
                    className="btn-add"
                    icon={<ArrowLeftOutlined />}
                    type="dashed"
                    onClick={() => OnChangeHandler("Work experience")}
                  >
                    Previous
                  </Button>
                  <Button
                    className="btn-add"
                    icon={<ArrowRightOutlined />}
                    type="dashed"
                    disabled={allEducationInfo.length > 0 ? false : true}
                    onClick={() => OnChangeHandler("Skills")}
                  >
                    Next
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Col>

        {/* list show */}
        <Col span={10} offset={2}>
          {allEducationInfo.length > 0 ? (
            <>
              {allEducationInfo.map((ele, i) => (
                <div className="list-row" key={ele.id}>
                  <p>{`Program: ${ele.program} || Section: ${ele.year}`}</p>

                  <span>
                    <EditOutlined onClick={() => updateShowHandle(ele.id)} />
                  </span>
                </div>
              ))}
            </>
          ) : (
            <div className="list-row">No education detail...</div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EducationInfo;
