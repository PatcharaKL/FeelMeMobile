import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Weapon {
  selectedTypeId: number;
}
const initialState: Weapon = {
  selectedTypeId: 0,
};
const weaponSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedWeapon: (state, action: PayloadAction<number>) => {
      state.selectedTypeId = action.payload;
    },
  },
});

export const {setSelectedWeapon} = weaponSlice.actions;
export default weaponSlice.reducer;
