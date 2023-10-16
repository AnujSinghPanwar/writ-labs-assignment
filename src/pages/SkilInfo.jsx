import React, { useEffect, useState } from "react";
import "../styles/personal.css";
import { Button, Col, Input, Row } from "antd";
import "../styles/skill.css";
import {
  EditOutlined,
  PlusCircleOutlined,
  ArrowLeftOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addSkills, updateSkills } from "../redux/skillSlice";
import { v4 } from "uuid";
import { toast } from "react-toastify";

const SkillInfo = ({ OnChangeHandler }) => {
  const dispatch = useDispatch();
  const { allSkillStoreByRedux } = useSelector((state) => state.skill);
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState(null);
  const emp = useSelector((state) => state.emp);
  const [editToggle, setEditToggle] = useState(false);
  const [singleSkill, setSingleSkill] = useState([{ id: v4(), namee: "" }]);

  const inputHandler = (name, id, e) => {
    // console.log( name,id, e);
    setSingleSkill((a) =>
      a.map((aa) => {
        if (aa.id == id) {
          {
            return { ...aa, namee: e };
          }
        } else {
          return aa;
        }
      })
    );
  };

  const addHandler = () => {
    setSingleSkill([...singleSkill, { id: v4(), namee: "" }]);
  };

  const saveSkill = () => {
    if (editToggle) {
      if (editName == "") {
        toast.error("please fill the skill");
      } else {
        dispatch(updateSkills({ id: editId, editName }));
        resetHandler();
      }
    } else {
      let validationMessage = false;
      const arr = singleSkill;
      arr.map((row) => {
        if (row.namee == "") {
          validationMessage = "Please fill the skill";
        }
      });
      if (validationMessage) {
        return toast.error(validationMessage);
      }
      dispatch(addSkills(singleSkill));
      resetHandler();
    }
  };

  const resetHandler = () => {
    setSingleSkill([{ id: v4(), namee: "" }]);
    setEditToggle(false);
  };

  const editHandler = (id) => {
    setEditToggle(true);
    const res = allSkillStoreByRedux.find((item) => item.id === id);
    setEditName(res.namee);
    setEditId(id);
  };

  // console.log(emp)
  // useEffect(()=>{ console.log(allSkillStoreByRedux)},[allSkillStoreByRedux])
  return (
    <div className="personal-main-container">
      <Row className="main-row">
        <Col span={8}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <div className="title">
                <span>Add Skills</span>
                {!editToggle && (
                  <PlusCircleOutlined
                    className="plus-icon"
                    onClick={addHandler}
                  />
                )}
              </div>
            </Col>
            {editToggle ? (
              <Col span={24}>
                <Input
                  placeholder="Skill"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </Col>
            ) : (
              <>
                {singleSkill.map((ele, i) => (
                  <Col span={24} key={i}>
                    <Input
                      placeholder="Skill"
                      value={ele.namee}
                      onChange={(e) =>
                        inputHandler("namee", ele.id, e.target.value)
                      }
                    />
                  </Col>
                ))}
              </>
            )}
            <Col span={24}>
              {!editToggle ? (
                <>
                  <Button type="primary" onClick={saveSkill}>
                    Save Skills
                  </Button>
                  <Button
                    className="btn-add"
                    icon={<ArrowLeftOutlined />}
                    type="dashed"
                    onClick={() => OnChangeHandler("Education")}
                  >
                    Previous
                  </Button>
                  <Button
                    className="btn-add"
                    icon={<UnorderedListOutlined />}
                    type="dashed"
                    disabled={allSkillStoreByRedux.length > 0 ?false:true}
                    onClick={() => OnChangeHandler("Resume")}
                  >
                    Get Resume
                  </Button>
                </>
              ) : (
                <Button type="primary" onClick={saveSkill}>
                  Update Skills
                </Button>
              )}
              <Button style={{ marginLeft: "5px" }} onClick={resetHandler}>
                Reset Skills
              </Button>
            </Col>
          </Row>
        </Col>

        <Col span={8} offset={8}>
          {allSkillStoreByRedux.length > 0 ? (
            <>
              {allSkillStoreByRedux?.map((item) => (
                <div className="emp-list" key={item.id}>
                  {item.namee}
                  <span>
                    <EditOutlined
                      className="icon-style"
                      onClick={() => editHandler(item.id)}
                    />
                  </span>
                </div>
              ))}
            </>
          ) : (
            <div className="emp-list">No skill found..</div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SkillInfo;
