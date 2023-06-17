import axiosClient from "../../Config/axiosClient";


// Call APi lấy danh sách người dùng chưa ghi danh
export const getUserListNotRegisterAPI = async (payload: string) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh`, payload);
        return response;
    } catch (error) {
        throw error;
    }
}

// Call API lấy danh sách học viên chờ xét duyệt
export const getUserListWaitingApprovalAPI = async (payload: string) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`, payload);
        return response;
    } catch (error) {
        throw error;
    }
}

// Call API lấy danh sách học viên khóa học
export const getUserListOfCourseAPI = async (payload: string) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`, payload);
        return response;
    } catch (error) {
        throw error;
    }
}