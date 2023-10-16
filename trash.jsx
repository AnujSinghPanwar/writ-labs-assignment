// import React, { useState } from "react";
// import "../styles/personal.css";
// import { Button, Col, Input, Row } from "antd";
// import "../styles/skill.css";
// import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { addSkills } from "../redux/skillSlice";

// const SkillInfo = ({ OnChangeHandler }) => {
//   const data = useSelector((state) => state.skill);
//   // console.log(data)
//   const [skillData, setSkillData] = useState([{ skillName: "" }]);
//   const dispatch = useDispatch();

//   const skillAdd = () => {
//     setSkillData([...skillData, { skillName: "" }]);
//   };
//   const skillHandler = (i, e) => {
//     const up = [...skillData];
//     up[i].skillName = e.target.value;
//     setSkillData(up);
//   };

//   const saveSkill = () => {
//     dispatch(addSkills(skillData));
//     setSkillData([{ skillName: "" }]);
//   };

//   data.map((ele) => ele.map((a) => console.log(a)));
//   // console.log(data)
//   return (
//     <div className="personal-main-container">
//       <Row style={{ border: "1px solid red", margin: "1%", padding: "1%" }}>
//         <Col span={8}>
//           <Row gutter={[10, 10]}>
//             <Col span={24}>
//               <div className="title">
//                 <span>Add Skills</span>
//                 <PlusCircleOutlined className="plus-icon" onClick={skillAdd} />
//               </div>
//             </Col>
//             {skillData.map((ele, i) => (
//               <Col span={24} key={i}>
//                 <Input
//                   // name={skillData.skillName}
//                   placeholder="Skill"
//                   value={skillData.skillName}
//                   onChange={(e) => skillHandler(i, e)}
//                 />
//               </Col>
//             ))}
//             <Col span={24}>
//               <Button type="primary" onClick={saveSkill}>
//                 Save Skills
//               </Button>
//             </Col>
//           </Row>
//         </Col>
//         <Col span={8} offset={8}>
//           {data.map((ele, i) =>
//             ele.map((item, i) => (
//               <div key={i} className="emp-list">
//                 {item.skillName}
//               </div>
//             ))
//           )}
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default SkillInfo;



// ________________
// import { createSlice } from "@reduxjs/toolkit";
// import skill from "../data/skill";

// // const initialState = [{skillName:"HTML"}];

// const skillSlice = createSlice({
//   name: "skills",
//   initialState:[],
//   reducers: {
//     addSkills: (state, action) => {
//       // console.log(action.payload);
//         state.push(action.payload)
//     },
//   },
// });

// export const { addSkills } = skillSlice.actions;
// export default skillSlice.reducer;



// -----------------
// import React, { useState } from "react";
// import "../styles/work.css";
// import { Button, Col, Input, Row } from "antd";
// import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";

// const WorkExp = ({ OnChangeHandler }) => {
//   const [workExp, setWorkExp] = useState([
//     {
//       name: "name",
//       value: "",
//       type: "text",
//       placeholder: "Company",
//     },
//     {
//       name: "name",
//       value: "",
//       type: "text",
//       placeholder: "Number of experience",
//     },
//   ]);

//   const addNewRow = () => {
//     setWorkExp([
//       ...workExp,
//       { name: "", value: "", type: "text", placeholder: "Company" },
//       {
//         name: "",
//         value: "",
//         type: "text",
//         placeholder: "Number of experience",
//       },
//     ]);
//   };
//   return (
//     <div className="personal-main-container">
//       <Row style={{ border: "1px solid green", margin: "1%", padding: "1%" }}>
//         <Col span={16}>
//           <Row gutter={[10, 10]}>
//             <Col span={20} className="plus-style">
//               <PlusCircleOutlined className="plus-icon" onClick={addNewRow} />
//             </Col>
//             {workExp.map((item, i) => (
//               <>
//                 <Col span={8} key={i}>
//                   <Input placeholder={item.placeholder} />
//                 </Col>
//               </>
//             ))}
//             <Col span={8}>
//               <Button>remove</Button>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default WorkExp;

