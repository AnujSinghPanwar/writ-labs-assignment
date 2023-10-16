import { createSlice } from "@reduxjs/toolkit";

const eduSlice = createSlice({
  name: "education",
  initialState: {
    allEducationInfo: [],
  },
  reducers: {
    addEducation: (state, action) => {
      const data = action.payload;
      data.map((eduData) => state.allEducationInfo.push(eduData));
    },
    updateEducation: (state, action) => {
      const { id, updateGraduation, updateYear } = action.payload;
      // console.log(action.payload)
      const rowData = state.allEducationInfo.find((ele) => ele.id === id);
      if (rowData) {
        rowData.id = id;
        rowData.program = updateGraduation;
        rowData.year = updateYear;
      }
    },
  },
});
export const { addEducation, updateEducation } = eduSlice.actions;
export default eduSlice.reducer;
