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
import { addExp, updateExp } from "../redux/workSlice";
import { toast } from "react-toastify";
import { v4 } from "uuid";

const WorkExp = ({ OnChangeHandler }) => {
  const { allWorkExperience } = useSelector((state) => state.exp);
  const dispatch = useDispatch();

  const [singleExp, setSingleExp] = useState([
    {
      id: v4(),
      companyName: "",
      noOfExp: "",
    },
  ]);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [companyUpdateName, setCompanyUpdateName] = useState("");
  const [noOfExpUpdate, setNoOfExpUpdate] = useState("");

  // add new row
  const addWorkRow = () => {
    let expArr = singleExp;
    setSingleExp([...expArr, { id: v4(), companyName: "", noOfExp: "" }]);
  };

  // for reset function
  const resetHandler = () => {
    setSingleExp([
      {
        id: v4(),
        companyName: "",
        noOfExp: "",
      },
    ]);
    setUpdateToggle(false);
  };

  // Input Handler
  const inputHandler = (name, id, value) => {
    if (name == "companyName") {
      setSingleExp((a) =>
        a.map((aa) => {
          if (aa.id == id) {
            {
              return { ...aa, companyName: value };
            }
          } else {
            return aa;
          }
        })
      );
    } else if (name == "noOfExp") {
      setSingleExp((a) =>
        a.map((aa) => {
          if (aa.id == id) {
            {
              return { ...aa, noOfExp: value };
            }
          } else {
            return aa;
          }
        })
      );
    }
  };

  // save work experience
  const saveHandler = () => {
    if (updateToggle) {
      if (companyUpdateName == "") {
        toast.error("Please Fill the company name");
      } else if (noOfExpUpdate == "") {
        toast.error("Please Fill the No of experiance");
      } else {
        dispatch(updateExp({ id: updateId, companyUpdateName, noOfExpUpdate }));
        resetHandler();
      }
    } else {
      let validationMessage = false;
      const arr = singleExp;
      arr.map((row) => {
        if (row.companyName == "") {
          validationMessage = "Please Fill the company name";
        } else if (row.noOfExp == "") {
          validationMessage = "Please Fill the No of experiance";
        }
      });
      if (validationMessage) {
        return toast.error(validationMessage);
      }
      dispatch(addExp(singleExp));
      resetHandler();
    }
  };

  // update id get
  const updateShowHandle = (id) => {
    setUpdateToggle(true);
    const getIDData = allWorkExperience.find((ele) => ele.id === id);
    setCompanyUpdateName(getIDData.companyName);
    setNoOfExpUpdate(getIDData.noOfExp);
    setUpdateId(id);
  };

  return (
    <div className="personal-main-container">
      <Row className="main-row">
        <Col span={12}>
          {updateToggle ? (
            <Row gutter={[10, 10]} style={{ marginTop: "10px" }}>
              <Col span={12}>
                <Input
                  placeholder="Organization name"
                  value={companyUpdateName}
                  onChange={(e) => setCompanyUpdateName(e.target.value)}
                />
              </Col>
              <Col span={12}>
                <Input
                  placeholder="No. of expierence"
                  value={noOfExpUpdate}
                  onChange={(e) => setNoOfExpUpdate(e.target.value)}
                />
              </Col>
            </Row>
          ) : (
            <>
              {singleExp.map((item, i) => (
                <Row gutter={[10, 10]} key={i} style={{ marginTop: "10px" }}>
                  <Col span={12}>
                    <Input
                      placeholder="Organization name"
                      value={item.companyName}
                      onChange={(e) =>
                        inputHandler("companyName", item.id, e.target.value)
                      }
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      placeholder="No. of expierence"
                      value={item.noOfExp}
                      onChange={(e) =>
                        inputHandler("noOfExp", item.id, e.target.value)
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
                    onClick={saveHandler}
                  >
                    Update Experience
                  </Button>
                  <Button
                    className="btn-save"
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
                    onClick={saveHandler}
                  >
                    Save Experience
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
                    onClick={addWorkRow}
                  >
                    Add Experience
                  </Button>
                  <Button
                    className="btn-add"
                    icon={<ArrowLeftOutlined />}
                    type="dashed"
                    onClick={() => OnChangeHandler("Personal Info")}
                  >
                    Previous
                  </Button>
                  <Button
                    className="btn-add"
                    icon={<ArrowRightOutlined />}
                    type="dashed"
                    onClick={() => OnChangeHandler("Education")}
                    disabled={allWorkExperience.length > 0 ? false:true}
                  >
                    Next
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Col>

        {/* List show */}
        <Col span={10} offset={2}>
          {allWorkExperience.length > 0 ? (
            <>
              {allWorkExperience.map((ele) => (
                <div className="list-row" key={ele.id}>
                  <p>{`${ele.companyName} || ${ele.noOfExp}years`}</p>
                  <span>
                    <EditOutlined onClick={() => updateShowHandle(ele.id)} />
                  </span>
                </div>
              ))}
            </>
          ) : (
            <div className="list-row">No experiance...</div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default WorkExp;
