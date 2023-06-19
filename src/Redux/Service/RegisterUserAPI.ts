import axiosClient from "../../Config/axiosClient";

export type CoursePayLoad = {
    maKhoaHoc: string;
}

export type DeleteCourseOfUserPayload = {
    maKhoaHoc: string;
    taiKhoan: string;
};

export type CourseOfUserRegisterPayload = {
    maKhoaHoc: string;
    taiKhoan: string;
};

// Call APi lấy danh sách người dùng chưa ghi danh
export const getUserListNotRegisterAPI = async (payload: CoursePayLoad) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Call API lấy danh sách học viên chờ xét duyệt
export const getUserListWaitingApprovalAPI = async (payload: CoursePayLoad) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Call API lấy danh sách học viên khóa học
export const getUserListOfCourseAPI = async (payload: CoursePayLoad) => {
    try {
        const response = await axiosClient.post(`QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Call API xác thực khóa học đó ghi danh cho người dùng
export const courseOfUserRegisterAPI = async (payload: CourseOfUserRegisterPayload) => {
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
export const deleteCourseOfUserRegisterAPI = async (payload: DeleteCourseOfUserPayload) => {
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
