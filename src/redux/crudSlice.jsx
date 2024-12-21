import { createSlice } from "@reduxjs/toolkit";

const crudSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addEmployees: (state, action) => {
      state.push(action.payload);
    },
    editEmployees: (state, action) => {
      const { id, name, address, contact, pincode, country } = action.payload;
      const getId = state.find((emp) => emp.id == id);
      if (getId) {
        getId.name = name;
        getId.address = address;
        getId.contact = contact;
        getId.pincode = pincode;
        getId.country = country;
      }
    },
    deleteEmployees: (state, action) => {
      const res = state.find((f) => f.id == action.payload);
      if (res) {
        return state.filter((f) => f.id !== action.payload);
      }
    },
  },
  //   extraReducers: {}    ,
});
export const { addEmployees, editEmployees, deleteEmployees } =
  crudSlice.actions;
export default crudSlice.reducer;
