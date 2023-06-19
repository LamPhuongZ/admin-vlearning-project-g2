import axiosClient from "../../Config/axiosClient";

export type UserPayLoad = {
    taiKhoan: string;
}

export type DeleteCoursePayload = {
    maKhoaHoc: string;
    taiKhoan: string;
};

export type CourseRegisterPayload = {
    maKhoaHoc: string;
    taiKhoan: string;
};

// Call APi lấy danh sách khóa học chưa ghi danh
export const getCourseListNotRegisterAPI = async (accountId: string) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${accountId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

// Call API lấy danh sách khóa học chờ xét duyệt
export const courseListWaitingApprovalAPI = async (payload: UserPayLoad) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Call API lấy danh sách khóa học đã xét duyệt
export const courseListApprovalAPI = async (payload: UserPayLoad) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Call API xác thực người dùng ghi danh vào khóa học
export const courseRegisterAPI = async (payload: CourseRegisterPayload) => {
    try {
        const response = await axiosClient.post(
            "/QuanLyKhoaHoc/GhiDanhKhoaHoc",
            payload
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};


// Call API huỷ ghi danh
export const deleteCourseRegisterAPI = async (payload: DeleteCoursePayload) => {
    try {
        const response = await axiosClient.post(
            "/QuanLyKhoaHoc/HuyGhiDanh",
            payload
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
