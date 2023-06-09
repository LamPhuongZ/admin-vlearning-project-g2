import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { LoginPayload, loginRequest } from "../Service/loginAPI";

type User = {
  taiKhoan: string;
  accessToken: string;
};

type InitialStateType = {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
};

const initialState: InitialStateType = {
  user: null,
  isLoading: false,
  isError: false,
};

const NAME_SPACE = "userReducer";

// Action:
export const loginAction = createAsyncThunk(
  `${NAME_SPACE}/login`,
  async (payload: LoginPayload, thunkApi) => {
    try {
      const response = await loginRequest(payload);
      localStorage.setItem("accessToken", response.accessToken);
      return response;
    } catch (error) {
      toast.error(
        "Tài khoản hoặc mật khẩu không hợp lệ. Vui lòng kiểm tra lại hoặc đăng ký mới"
      );
      return thunkApi.rejectWithValue(error);
    }
  }
);

const userReducer = createSlice({
  name: NAME_SPACE,
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("accessToken");
    },
    cleanUpUser: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(
      loginAction.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
      }
    );
    builder.addCase(loginAction.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { logout, cleanUpUser } = userReducer.actions;

export default userReducer.reducer;
