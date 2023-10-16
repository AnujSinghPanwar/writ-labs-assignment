import { createSlice } from "@reduxjs/toolkit";

const workSlice = createSlice({
  name: "workExp",
  initialState: {
    allWorkExperience: [],
  },
  reducers: {
    addExp: (state, action) => {
      const data = action.payload;
      // data.map((a)=>console.log(a))
      data.map((expData) => state.allWorkExperience.push(expData));
    },
    updateExp: (state, action) => {
      const { id, companyUpdateName, noOfExpUpdate } = action.payload;
      const getId = state.allWorkExperience.find((expId) => expId.id == id);
      if (getId) {
        getId.id = id;
        getId.companyName = companyUpdateName;
        getId.noOfExp = noOfExpUpdate;
      }
    },
  },
});

export const { addExp, updateExp } = workSlice.actions;

export default workSlice.reducer;
