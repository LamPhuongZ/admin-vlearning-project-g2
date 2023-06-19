import React, { useEffect, useState } from 'react'
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Select, Space, Table } from 'antd';
import styles from './registerUser.module.scss'
import cls from 'classnames'
import Button from '../../../Core/Button';
import { ColumnsType } from 'antd/es/table';
import { getCourseListAPI } from '../../../Redux/Service/courseListAPI';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { courseRegisterAPI, CourseRegisterPayload, DeleteCoursePayload, courseListApprovalAPI, courseListWaitingApprovalAPI, deleteCourseRegisterAPI } from '../../../Redux/Service/RegisterCourseAPI';
import Search from '../../../Core/Search';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import { useForm } from "react-hook-form";

interface CourseType {
    maKhoaHoc: string;
    tenKhoaHoc: string;
}

type Props = {}

function RegisterUser({ }: Props) {
    const { userId } = useParams();
    const [courseList, setCourseList] = useState<CourseType[]>([]);
    const [dataCourseWaitingApproval, setDataCourseWaitingApproval] = useState<CourseType[]>([]);
    const [dataCourseApproval, setDataCourseApproval] = useState<CourseType[]>([]);
    const [search, setSearch] = useState<CourseType[]>([]);
    const [searchWaitingApproval, setSearchWaitingApproval] = useState<CourseType[]>([]);
    const [filterData, setFIlterData] = useState('');
    const [filterDataWaitingApproval, setFIlterDataWaitingApproval] = useState('');
    const [page, setPage] = useState(1);

    const { user } = useSelector((state: RootState) => {
        return state.userReducer;
    });

    const columnsCourseWaitingApproval: ColumnsType<CourseType> = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            render: (text: string, record: any, index: number) => (page - 1) * 10 + index + 1,
        },
        {
            title: 'Mã khóa học',
            dataIndex: 'maKhoaHoc',
        },
        {
            title: 'Tên khóa học',
            dataIndex: 'tenKhoaHoc',
        },
        {
            title: 'Chờ Xác Nhận',
            key: 'choXacNhan',
            render: (_, record) => (
                <Space>
                    <CheckCircleOutlined
                        style={{ color: "green", fontSize: "20px" }}
                        onClick={() => {
                            if (userId) {
                                handleCourseRegister({ maKhoaHoc: record.maKhoaHoc, taiKhoan: userId })
                            }
                        }}
                    />

                    <Popconfirm
                        title='Bạn có chắc muốn xóa khóa học này không ?'
                        onConfirm={() => {
                            if (user) {
                                handleDeleteRegister({ maKhoaHoc: record.maKhoaHoc, taiKhoan: user.taiKhoan })
                            }
                        }}
                    >
                        <DeleteOutlined
                            style={{ color: "red", fontSize: "20px" }}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const columnsCourseApproval: ColumnsType<CourseType> = [
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            render: (text: string, record: any, index: number) => (page - 1) * 10 + index + 1,
        },
        {
            title: 'Mã khóa học',
            dataIndex: 'maKhoaHoc',
        },
        {
            title: 'Tên khóa học',
            dataIndex: 'tenKhoaHoc',
        },
        {
            title: 'Chờ Xác Nhận',
            key: 'choXacNhan',
            render: (_, record) => (
                <Space>
                    <Popconfirm
                        title='Bạn có chắc muốn xóa khóa học này không ?'
                        onConfirm={() => {
                            if (user) {
                                handleDeleteRegister({ maKhoaHoc: record.maKhoaHoc, taiKhoan: user.taiKhoan })
                            }
                        }}
                    >
                        <DeleteOutlined
                            style={{ color: "red", fontSize: "20px" }}

                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Call lấy danh sách khóa học chờ xét duyệt
    const courseWaitingApproval = async (userId: string) => {
        try {
            let payload = { taiKhoan: userId };
            const response = await courseListWaitingApprovalAPI(payload);
            setDataCourseWaitingApproval(response);
            setSearchWaitingApproval(response);
        } catch (error) {
            toast.error("Không lấy được dữ liệu")
        }
    };

    useEffect(() => {
        if (userId) {
            courseWaitingApproval(userId);
        }
    }, [userId]);

    // Call lấy danh sách khóa học đã xét duyệt
    const courseApproval = async (userId: string) => {
        try {
            let payload = { taiKhoan: userId };
            const response = await courseListApprovalAPI(payload);
            setDataCourseApproval(response);
            setSearch(response);
        } catch (error) {
            toast.error("Không lấy được dữ liệu")
        }
    };

    useEffect(() => {
        if (userId) {
            courseApproval(userId);
        }
    }, [userId]);

    // Lấy danh sách khóa học
    const getCourseList = async () => {
        try {
            const reponse = await getCourseListAPI();
            setCourseList(reponse);
        } catch (error) {
            toast.error("Không lấy được danh sách khóa học");
        }
    };

    useEffect(() => {
        getCourseList();
    }, []);

    // Hiển thị danh sách tài khoản để chọn
    const renderCourseList = () => {
        return courseList.map((option: CourseType) => {
            return (
                <Select.Option key={option.maKhoaHoc} value={option.maKhoaHoc}>
                    {option.tenKhoaHoc}
                </Select.Option>
            );
        })
    };

    // Hàm tìm kiếm khoa học đã xét duyệt
    const handleSearchCourseApproval = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0) {
            const filterResult = search.filter((item) => item.tenKhoaHoc.toLocaleLowerCase().includes(event.target.value.toLowerCase()));
            setDataCourseApproval(filterResult);
        }
        else {
            setDataCourseApproval(search);
        }

        setFIlterData(event.target.value)
    };

    // Hàm tìm kiếm khóa chờ xét duyệt
    const handleSearchWaitingApproval = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0) {
            const filterResult = searchWaitingApproval.filter((item) => item.tenKhoaHoc.toLocaleLowerCase().includes(event.target.value.toLowerCase()));
            setDataCourseWaitingApproval(filterResult);
        }
        else {
            setDataCourseWaitingApproval(searchWaitingApproval);
        }

        setFIlterDataWaitingApproval(event.target.value);
    };

    // Call xác thực người dùng ghi danh khóa học
    const handleCourseRegister = async (values: CourseRegisterPayload) => {
        try {
            await courseRegisterAPI(values);
            courseApproval(userId || "");
            courseWaitingApproval(userId || "");
            toast.success("Xác thực ghi danh thành công")
        } catch (error) {
            toast.error("Xác thực ghi danh không thành công");
        }
    };

    // Hủy ghi danh
    const handleDeleteRegister = async (values: DeleteCoursePayload) => {
        try {
            const response = await deleteCourseRegisterAPI(values);
            courseApproval(userId || "");
            courseWaitingApproval(userId || "");
            toast.success("Hủy ghi danh thành công");
        } catch (error) {
            toast.error("Huỷ ghi danh không thành công");
        }
    };

    const {
        handleSubmit,
    } = useForm({
        defaultValues: {
            taiKhoan: "",
            maKhoaHoc: "",
        },
    });

    return (
        <div className={styles.registerUser}>
            <div className={cls(styles.registerUser__top, styles.border__bottom)}>
                <div className={styles.row}>
                    <h3 className={styles.col__3}>Chọn khóa học</h3>

                    <form className={styles.col__6} >
                        <div className={styles.formStyle}>
                            <Select
                                style={{ width: "100%" }}
                                showSearch
                                optionFilterProp="children"
                                placeholder="Chọn người dùng"
                            >
                                {renderCourseList()}
                            </Select>
                        </div>

                        <div className={cls(styles.formStyle)}>
                            <Button title='Ghi danh' bgColor='#41b294' />
                        </div>
                    </form>

                </div>
            </div>

            <div className={cls(styles.registerUser__middle, styles.border__bottom)}>
                <div className={styles.row}>
                    <h3 className={styles.col__6}>Khóa học chờ xác thực</h3>

                    <div className={styles.col__6}>
                        <div className={styles.formStyle}>
                            <Search
                                placeholder="Nhập tên khóa học"
                                value={filterDataWaitingApproval}
                                onChange={(event) => handleSearchWaitingApproval(event)}
                            />
                        </div>
                    </div>
                </div>
                {"."}

                <Table
                    columns={columnsCourseWaitingApproval}
                    dataSource={dataCourseWaitingApproval}
                    bordered
                />
            </div>

            <div className={styles.registerUser__bottom}>
                <div className={styles.row}>
                    <h3 className={styles.col__6}>Khóa học đã ghi danh</h3>

                    <div className={styles.col__6}>
                        <div className={styles.formStyle}>
                            <Search
                                placeholder="Nhập tên khóa học"
                                value={filterData}
                                onChange={(event) => handleSearchCourseApproval(event)}
                            />
                        </div>
                    </div>
                </div>
                {"."}

                <Table
                    columns={columnsCourseApproval}
                    dataSource={dataCourseApproval}
                    bordered
                >
                </Table>
            </div>
        </div>
    )
}

export default RegisterUser