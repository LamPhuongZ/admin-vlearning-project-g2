import axiosClient from "../../Config/axiosClient";

// Call APi lấy danh sách khóa học chưa ghi danh
export const getCourseListNotRegisterAPI = async (accountId: string) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${accountId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

// Call API lấy danh sách khóa học chờ xét duyệt
export const getCourseListWaitingApprovalAPI = async (payload: string) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`, payload);
        return response;
    } catch (error) {
        throw error;
    }
}

// Call API lấy danh sách khóa học chờ xét duyệt
export const getCourseListApprovalAPI = async (payload: string) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}