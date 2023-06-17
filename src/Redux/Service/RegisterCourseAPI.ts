import axiosClient from "../../Config/axiosClient";

// Call APi lấy danh sách khóa học chưa ghi danh
export const getCourseListNotRegister = async (accountId: string) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${accountId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Call API lấy danh sách khóa học chờ xét duyệt
export const getCourseListWaitingApproval = async (payload: string) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Call API lấy danh sách khóa học chwof xét duyệt
export const getCourseListApproval = async (payload: string) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}