import { configureStore } from "@reduxjs/toolkit";
import crudSlice from "../crudSlice";
import skillSlice from "../skillSlice";
import workSlice from "../workSlice";
import eduSlice from "../eduSlice";

const store = configureStore({
  reducer: {
    emp: crudSlice,
    skill: skillSlice,
    exp: workSlice,
    education: eduSlice,
  },
});

export default store;
