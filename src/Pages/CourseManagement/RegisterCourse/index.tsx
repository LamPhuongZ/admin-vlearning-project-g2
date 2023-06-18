import React, { useEffect, useState } from 'react'
import styles from './registerCourse.module.scss'
import Button from '../../../Core/Button'
import cls from 'classnames'
import { Popconfirm, Select, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { toast } from 'react-toastify';
import { listUserRequest } from '../../../Redux/Service/listUserAPI';
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Column from 'antd/es/table/Column';
import { getUserListNotRegisterAPI, getUserListOfCourseAPI } from '../../../Redux/Service/RegisterUserAPI';
import { useParams } from 'react-router-dom';

interface UserType {
    taiKhoan: string;
    hoTen: string;
};

type Props = {}

function RegisterCourse({ }: Props) {
    const { courseId } = useParams();
    const [userList, setUserList] = useState<UserType[]>([]);
    const [dataUserOfCourse, setDataUserOfCourse] = useState([]);
    // const [page, setPage] = useState(1);

    const columnsUserWaitingApproval: ColumnsType<UserType> = [
        {
            title: 'Tài Khoản',
            dataIndex: 'taiKhoan',
        },
        {
            title: 'Học Viên',
            dataIndex: 'hoTen',
        },
        {
            title: 'Chờ Xác Nhận',
            key: 'choXacNhan',
            render: (_, record) => (
                <Space>
                    <Popconfirm title='Bạn có chắc muốn xóa khóa học này không ?' onConfirm={() => onDeleteCourse(record.taiKhoan)}>
                        <DeleteOutlined
                            style={{ color: "red", fontSize: "20px" }}

                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const columnsUserOfCourse: ColumnsType<UserType> = [
        {
            title: 'Tài Khoản',
            dataIndex: 'taiKhoan',
        },
        {
            title: 'Học Viên',
            dataIndex: 'hoTen',
        },
        {
            title: 'Chờ Xác Nhận',
            key: 'choXacNhan',
            render: (_, record) => (
                <Space>
                    <CheckCircleOutlined />

                    <Popconfirm title='Bạn có chắc muốn xóa khóa học này không ?' onConfirm={() => onDeleteCourse(record.taiKhoan)}>
                        <DeleteOutlined
                            style={{ color: "red", fontSize: "20px" }}

                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Call API lấy danh sách học viên khóa học
    const getUserListOfCourse = async (courseId: string) => {
        try {
            const response = await getUserListOfCourseAPI(courseId);
            setDataUserOfCourse(response);
        } catch (error) {
            toast.error("Không lấy được danh sách");
        }
    };

    console.log(dataUserOfCourse);
    

    useEffect(() => {
        if (courseId) {
            getUserListOfCourse(courseId);
        }
    }, [courseId]);

    // Call lấy danh sách tài khoản
    const getUserList = async () => {
        try {
            const response = await listUserRequest();
            setUserList(response);
        } catch (error) {
            toast.error("Không lấy được danh sách người dùng");
        }
    }

    useEffect(() => {
        getUserList();
    }, []);

    // Hiển thị danh sách tài khoản để chọn
    const renderUserList = () => {
        return userList.map((option: UserType) => {
            return (
                <Select.Option key={option.taiKhoan} value={option.taiKhoan}>
                    {option.hoTen}
                </Select.Option>
            );
        })
    };

    // Hàm xóa dữ liệu
    const onDeleteCourse = async (account: string) => {
        try {
            // await deleteCourseAPI(courseId);
            // // toast.success("Xoá khóa học thành công!");
            // getCourseList();
        } catch (error) {
            toast.error("Xóa khóa học không thành công");
        }
    }

    const onHandleRegister = async (accountId: string) => {
        try {
            // await getUserListNotRegisterAPI(accountId);
            // toast.success("Ghi danh thành công")
        } catch (error) {
            toast.error("Ghi danh không thành công");
        }
    }

    return (
        <div className={styles.registerCourse}>
            <div className={cls(styles.registerCourse__top, styles.border__bottom)}>
                <div className={styles.row}>
                    <h3 className={styles.col__3}>Chọn người dùng</h3>

                    <form className={styles.col__6}>
                        <div className={styles.formStyle}>
                            <Select
                                style={{ width: "100%" }}
                                showSearch
                                optionFilterProp="children"
                                placeholder="Chọn người dùng"
                            >
                                {renderUserList()}
                            </Select>
                        </div>
                    </form>

                    <div className={cls(styles.col__3, styles.registerCourse__button)}>
                        <Button
                            title='Ghi danh'
                            bgColor='#41b294'
                            onClick={() => {
                                // onHandleRegister(selected)
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className={cls(styles.registerCourse__middle, styles.border__bottom)}>
                <div className={styles.row}>
                    <h3 className={styles.col__6}>Học viên chờ xác thực</h3>

                    <div className={styles.col__6}>
                        <div className={styles.formStyle}>
                            {/* <Search
                                placeholder="Nhập tên học viên"
                            // value={filterData}
                            // onChange={(event) => handleSearchCourse(event)}
                            /> */}
                        </div>
                    </div>
                </div>
                {"."}

                <Table
                    columns={columnsUserOfCourse}
                    // dataSource={data}
                    bordered
                />
            </div>

            <div className={styles.registerCourse__bottom}>
                <div className={styles.row}>
                    <h3 className={styles.col__6}>Học viên đã tham gia khóa học</h3>

                    <div className={styles.col__6}>
                        <div className={styles.formStyle}>
                            {/* <Search
                                placeholder="Nhập tên học viên"
                            // value={filterData}
                            // onChange={(event) => handleSearchCourse(event)}
                            /> */}
                        </div>
                    </div>
                </div>
                {"."}

                <Table
                    columns={columnsUserWaitingApproval}
                    dataSource={dataUserOfCourse}
                    bordered
                >
                    {/* <Column
                        title="STT"
                        key="STT"
                        render={(value, item, index) => (page - 1) * 10 + index}
                    /> */}
                </Table>
            </div>
        </div>
    )
}

export default RegisterCourse