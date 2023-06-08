import axiosClient from "../../Config/axiosClient";

export type LoginPayload = {
  taiKhoan: string;
  matKhau: string;
};
export const loginRequest = async (payload: LoginPayload) => {
  try {
    const response = await axiosClient.post(
      "/QuanLyNguoiDung/DangNhap",
      payload
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
