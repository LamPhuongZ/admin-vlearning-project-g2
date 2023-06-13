import axiosClient from "../../Config/axiosClient";

export type UpdateUserInfoPayload = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
};

//API lấy danh sách người dùng
export const listUserRequest = async () => {
  try {
    const response = await axiosClient(
      `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${"GP02"}`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

//API xoá người dùng thông qua tài khoản
export const deleteUserRequest = async (userId: string) => {
  try {
    const response = await axiosClient.delete(
      `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userId}`
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

//Tìm kiếm người dùng
export const searchUserRequest = async (userName: string) => {
  try {
    const response = await axiosClient.get(
      `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${"GP02"}&tuKhoa=${userName}`
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//Sau khi call api để fill vào form, viết hàm cập nhật
export const updateUserInfoRequest = async (payload: UpdateUserInfoPayload) => {
  try {
    const response = await axiosClient.put(
      "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      payload
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

//API thêm người dùng
export const createUserRequest = async (payload: UpdateUserInfoPayload) => {
  try {
    const response = await axiosClient.post(
      "/QuanLyNguoiDung/ThemNguoiDung",
      payload
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};
