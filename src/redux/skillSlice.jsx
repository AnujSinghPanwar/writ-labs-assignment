import { createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    allSkillStoreByRedux: [],
  },
  reducers: {
    addSkills: (state, action) => {
      const data = action.payload;
      data.map((item) => state.allSkillStoreByRedux.push(item));
    },
    updateSkills: (state, action) => {
      const { id, editName } = action.payload;
      const getID = state.allSkillStoreByRedux.find((skill) => skill.id == id);
      if (getID) {
        getID.id = id;
        getID.namee = editName;
      }
    },
  },
});

export const { addSkills, updateSkills } = skillSlice.actions;
export default skillSlice.reducer;
