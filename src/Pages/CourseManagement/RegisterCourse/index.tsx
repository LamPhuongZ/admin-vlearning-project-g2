import React, { useEffect, useState } from "react";
import styles from "./registerCourse.module.scss";
import Button from "../../../Core/Button";
import cls from "classnames";
import { Popconfirm, Select, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    CourseOfUserRegisterPayload,
    DeleteCourseOfUserPayload,
    courseOfUserRegisterAPI,
    deleteCourseOfUserRegisterAPI,
    getUserListNotRegisterAPI,
    getUserListOfCourseAPI,
    getUserListWaitingApprovalAPI,
} from "../../../Redux/Service/RegisterUserAPI";
import { useParams } from "react-router-dom";
import Search from "../../../Core/Search";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { Controller, useForm } from "react-hook-form";

interface UserType {
    taiKhoan: string;
    hoTen: string;
}

type Props = {};

function RegisterCourse({ }: Props) {
    const { courseId } = useParams();
    const [userList, setUserList] = useState<UserType[]>([]);
    const [dataUserOfCourse, setDataUserOfCourse] = useState<UserType[]>([]);
    const [dataUserWaitingApproval, setDataUserWaitingApproval] = useState<
        UserType[]
    >([]);
    const [search, setSearch] = useState<UserType[]>([]);
    const [searchWaitingApproval, setSearchWaitingApproval] = useState<
        UserType[]
    >([]);
    const [filterData, setFIlterData] = useState("");
    const [filterDataWaitingApproval, setFIlterDataWaitingApproval] =
        useState("");
    const [page, setPage] = useState(1);

    const { user } = useSelector((state: RootState) => {
        return state.userReducer;
    });

    const columnsUserWaitingApproval: ColumnsType<UserType> = [
        {
            title: "STT",
            dataIndex: "STT",
            key: "STT",
            render: (text: string, record: any, index: number) =>
                (page - 1) * 10 + index + 1,
        },
        {
            title: "Tài Khoản",
            dataIndex: "taiKhoan",
        },
        {
            title: "Học Viên",
            dataIndex: "hoTen",
        },
        {
            title: "Chờ Xác Nhận",
            key: "choXacNhan",
            render: (_, record) =>
                dataUserWaitingApproval.length >= 1 ? (
                    <Space>
                        <CheckCircleOutlined
                            style={{ color: "green", fontSize: "20px" }}
                            onClick={() => {
                                if (courseId) {
                                    handleCourseRegister({
                                        maKhoaHoc: courseId,
                                        taiKhoan: record.taiKhoan,
                                    });
                                }
                            }}
                        />

                        <Popconfirm
                            title="Bạn có chắc muốn xóa học viên này không ?"
                            onConfirm={() => {
                                if (courseId) {
                                    onDeleteUserListOfCourse({
                                        maKhoaHoc: courseId,
                                        taiKhoan: record.taiKhoan,
                                    });
                                }
                            }}
                        >
                            <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
                        </Popconfirm>
                    </Space>
                ) : null,
        },
    ];

    const columnsUserOfCourse: ColumnsType<UserType> = [
        {
            title: "STT",
            dataIndex: "STT",
            key: "STT",
            render: (text: string, record: any, index: number) =>
                (page - 1) * 10 + index + 1,
        },
        {
            title: "Tài Khoản",
            dataIndex: "taiKhoan",
        },
        {
            title: "Học Viên",
            dataIndex: "hoTen",
        },
        {
            title: "Hành động",
            key: "choXacNhan",
            render: (_, record) =>
                dataUserOfCourse.length >= 1 ? (
                    <Space>
                        <Popconfirm
                            title="Bạn có chắc muốn xóa học viên này không ?"
                            onConfirm={() => {
                                if (courseId) {
                                    onDeleteUserListOfCourse({
                                        maKhoaHoc: courseId,
                                        taiKhoan: record.taiKhoan,
                                    });
                                }
                            }}
                        >
                            <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
                        </Popconfirm>
                    </Space>
                ) : null,
        },
    ];

    // Call API lấy danh sách học viên chờ xét duyệt
    const getUserListWaitingApproval = async (courseId: string) => {
        try {
            let payload = { maKhoaHoc: courseId };
            const response = await getUserListWaitingApprovalAPI(payload);
            setDataUserWaitingApproval(response);
            setSearchWaitingApproval(response);
        } catch (error) {
            toast.error("Không lấy được danh sách");
        }
    };

    useEffect(() => {
        if (courseId) {
            getUserListWaitingApproval(courseId);
        }
    }, [courseId]);

    // Call API lấy danh sách học viên khóa học
    const getUserListOfCourse = async (courseId: string) => {
        try {
            let payload = { maKhoaHoc: courseId };
            const response = await getUserListOfCourseAPI(payload);
            setDataUserOfCourse(response);
            setSearch(response);
        } catch (error) {
            toast.error("Không lấy được danh sách");
        }
    };

    useEffect(() => {
        if (courseId) {
            getUserListOfCourse(courseId);
        }
    }, [courseId]);

    // Call lấy danh sách người dùng chưa ghi danh
    const getUserList = async (courseId: string) => {
        try {
            let payload = { maKhoaHoc: courseId };
            const response = await getUserListNotRegisterAPI(payload);
            setUserList(response);
        } catch (error) {
            toast.error("Không lấy được danh sách người dùng");
        }
    };

    useEffect(() => {
        if (courseId) {
            getUserList(courseId);
        }
    }, [courseId]);

    // Hiển thị danh sách tài khoản để chọn
    const renderUserList = () => {
        return userList.map((option: UserType) => {
            return (
                <Select.Option key={option.taiKhoan} value={option.taiKhoan}>
                    {option.hoTen}
                </Select.Option>
            );
        });
    };

    // Call học viên chờ xác thực ghi danh
    const handleCourseRegister = async (values: CourseOfUserRegisterPayload) => {
        try {
            await courseOfUserRegisterAPI(values);
            getUserListWaitingApproval(courseId || "");
            getUserListOfCourse(courseId || "");
            toast.success("Xác thực ghi danh thành công");
        } catch (error) {
            toast.error("Xác thực ghi danh không thành công");
        }
    };

    // Hàm xóa học viên đã tham gia khóa học
    const onDeleteUserListOfCourse = async (
        values: DeleteCourseOfUserPayload
    ) => {
        try {
            const dataResult = await deleteCourseOfUserRegisterAPI(values);
            getUserListWaitingApproval(courseId || "");
            getUserListOfCourse(courseId || "");
            toast.success("Hủy ghi danh thành công");
        } catch (error: any) {
            toast.error(error.content.messager);
        }
    };

    // Hàm tìm kiếm học viên đã tham gia khóa học
    const handleSearchUserListOfCourse = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.value.length > 0) {
            const filterResult = search.filter((item) =>
                item.hoTen
                    .toLocaleLowerCase()
                    .includes(event.target.value.toLowerCase())
            );
            setDataUserOfCourse(filterResult);
        } else {
            setDataUserOfCourse(search);
        }

        setFIlterData(event.target.value);
    };

    // Hàm tìm kiếm học viên chờ xác thực
    const handleSearchUserListWaitingApproval = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.value.length > 0) {
            const filterResult = searchWaitingApproval.filter((item) =>
                item.hoTen
                    .toLocaleLowerCase()
                    .includes(event.target.value.toLowerCase())
            );
            setDataUserWaitingApproval(filterResult);
        } else {
            setDataUserWaitingApproval(searchWaitingApproval);
        }

        setFIlterDataWaitingApproval(event.target.value);
    };

    const { handleSubmit, control } = useForm({
        defaultValues: {
            maKhoaHoc: courseId || "",
            taiKhoan: "",
        },
    });

    return (
        <div className={styles.registerCourse}>
            <div className={cls(styles.registerCourse__top, styles.border__bottom)}>
                <div className={styles.row}>
                    <h3 className={styles.col__3}>Chọn người dùng</h3>

                    <form
                        className={cls(styles.col__9)}
                        onSubmit={handleSubmit(handleCourseRegister)}
                    >
                        <div className={styles.formStyle}>
                            <Controller
                                name="taiKhoan"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            {...field}
                                            style={{ width: "100%" }}
                                            value={undefined}
                                            showSearch
                                            optionFilterProp="children"
                                            placeholder="Chọn người dùng"
                                        >
                                            {renderUserList()}
                                        </Select>
                                    );
                                }}
                            />
                        </div>

                        <div className={cls(styles.registerCourse__button)}>
                            <Button title="Ghi danh"
                                color='rgb(65, 178, 148)'
                                bgColor='transparent'
                                borderColor='rgb(65, 178, 148)'
                                margin="10px 0 0 0" />
                        </div>
                    </form>
                </div>
            </div>

            <div
                className={cls(styles.registerCourse__middle, styles.border__bottom)}
            >
                <div className={styles.row}>
                    <h3 className={styles.col__6}>Học viên chờ xác thực</h3>

                    <div className={styles.col__6}>
                        <div className={styles.formStyle}>
                            <Search
                                placeholder="Nhập tên học viên"
                                value={filterDataWaitingApproval}
                                onChange={(event) => handleSearchUserListWaitingApproval(event)}
                            />
                        </div>
                    </div>
                </div>
                {"."}

                <Table
                    columns={columnsUserWaitingApproval}
                    dataSource={dataUserWaitingApproval}
                    bordered
                />
            </div>

            <div className={styles.registerCourse__bottom}>
                <div className={styles.row}>
                    <h3 className={styles.col__6}>Học viên đã tham gia khóa học</h3>

                    <div className={styles.col__6}>
                        <div className={styles.formStyle}>
                            <Search
                                placeholder="Nhập tên học viên"
                                value={filterData}
                                onChange={(event) => handleSearchUserListOfCourse(event)}
                            />
                        </div>
                    </div>
                </div>
                {"."}

                <Table
                    columns={columnsUserOfCourse}
                    dataSource={dataUserOfCourse}
                    bordered
                ></Table>
            </div>
        </div>
    );
}

export default RegisterCourse;
