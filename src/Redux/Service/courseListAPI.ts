import axiosClient from "../../Config/axiosClient";

// Call API lấy danh sách khóa học
export const getCourseListAPI = async () => {
    try {
        const response = await axiosClient.get(`/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Call API thêm khóa học
export const createCourseAPI = async (payload: any) => {
    try {
        const formData = new FormData();
        for (let key in payload) {
          formData.append(key, payload[key]);
        }

        const response = await axiosClient.post(`/QuanLyKhoaHoc/ThemKhoaHocUploadHinh`, formData);
        return response;
    } catch (error) {
        throw error;
    }
}

// Call API chỉnh sửa khóa học
export const updateCourseAPI = async (payload: any) => {
    try {
        const formData = new FormData();
        for (let key in payload) {
          formData.append(key, payload[key]);
        }

        const response = await axiosClient.post(`/QuanLyKhoaHoc/CapNhatKhoaHocUpload`, formData);
        return response;
    } catch (error) {
        throw error;
    }
}

// Call API xóa khóa học
export const deleteCourseAPI = async (courseId: string) => {
    try {
        const response = await axiosClient.delete(`/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${courseId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Call API lấy danh mục khóa học
export const getCategoiesCourseAPI = async () => {
    try {
        const response = await axiosClient.get(`/QuanLyKhoaHoc/LayDanhMucKhoaHoc`);
        return response.data;
    } catch (error) {
        throw error;
    }
}