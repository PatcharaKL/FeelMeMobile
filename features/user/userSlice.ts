import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface User {
  email: string;
  name: string;
  surname: string;
  hp: number;
  level: number;
  departmentName: string;
  positionName: string;
  companyName: string;
}
const initialState: User = {
  email: '',
  name: '',
  surname: '',
  hp: 0,
  level: 0,
  departmentName: '',
  positionName: '',
  companyName: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.level = action.payload.level;
      state.positionName = action.payload.positionName;
      state.hp = action.payload.hp;
    },
    decreaseHp: (state, action: PayloadAction<number>) => {
      state.hp -= action.payload;
    },
    setHp: (state, action: PayloadAction<number>) => {
      state.hp = action.payload;
    },
  },
});

export const {setUser, decreaseHp, setHp} = userSlice.actions;
export default userSlice.reducer;
