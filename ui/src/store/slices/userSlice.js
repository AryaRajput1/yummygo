import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    city: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const { setUser, setCity } = userSlice.actions;
export default userSlice.reducer;
