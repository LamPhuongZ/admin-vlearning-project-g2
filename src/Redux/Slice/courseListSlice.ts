import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCourseListAPI } from "../Service/courseListAPI";

export type CourseType = {
    maKhoaHoc: string;
    biDanh: string;
    tenKhoaHoc: string;
    moTa: string;
    luotXem: number;
    hinhAnh: string;
    maNhom: string;
    ngayTao: string;
    soLuongHocVien: number;
    nguoiTao: {
        taiKhoan: string;
        hoTen: string;
        maLoaiNguoiDung: string;
        tenLoaiNguoiDung: string;
    };
    danhMucKhoaHoc: {
        maDanhMucKhoahoc: string;
        tenDanhMucKhoaHoc: string;
    };
};

type InitialStateTypes = {
    courseList: CourseType[];
    isLoading: boolean;
    isError: boolean;
};

const initialState: InitialStateTypes = {
    courseList: [],
    isLoading: false,
    isError: false,
};


const SLICE_NAMESPACE = "courseListSlice";

export const fetchCourseListAction = createAsyncThunk(
    `${SLICE_NAMESPACE}/fetch_courselist`,
    async () => {
        try {
            const data = await getCourseListAPI();
            return data;
        } catch (error) {
            throw error;
        }
    }
);


const courseListSlice = createSlice({
    name: SLICE_NAMESPACE,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCourseListAction.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(
            fetchCourseListAction.fulfilled,
            (state, action: PayloadAction<CourseType[]>) => {
                state.courseList = action.payload;
                state.isLoading = false;
                state.isError = false;
            }
        );
        builder.addCase(fetchCourseListAction.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export default courseListSlice.reducer;










