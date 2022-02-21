import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  id: string;
  nome: string;
}

const loginInitialState: LoginState = {
  id: '',
  nome: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: loginInitialState,
  reducers: {
    adicionaLogin: (state, action: PayloadAction<LoginState>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    removeLogin: (state, action: PayloadAction<LoginState>) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

export const {
  adicionaLogin,
  removeLogin
} = loginSlice.actions;

export default loginSlice.reducer;