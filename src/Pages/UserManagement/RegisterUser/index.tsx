import React, { useEffect, useState } from 'react'
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Select, Space, Table } from 'antd';
import styles from './registerUser.module.scss'
import cls from 'classnames'
import Button from '../../../Core/Button';
import Column from 'antd/es/table/Column';
import { ColumnsType } from 'antd/es/table';
import { getCourseListAPI } from '../../../Redux/Service/courseListAPI';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { getCourseListApprovalAPI } from '../../../Redux/Service/RegisterCourseAPI';


interface CourseType {
    maKhoaHoc: string;
    tenKhoaHoc: string;
}

type Props = {}

function RegisterUser({ }: Props) {
    const { userId } = useParams();
    const [courseList, setCourseList] = useState<CourseType[]>([]);
    const [dataUserCourse, setDataUserCourse] = useState([]);

    const columnsCourseWaitingApproval: ColumnsType<CourseType> = [
        {
            title: 'Tên khóa học',
            dataIndex: 'tenKhoaHoc',
        },
        {
            title: 'Chờ Xác Nhận',
            key: 'choXacNhan',
            render: (_, record) => (
                <Space>
                    <Popconfirm title='Bạn có chắc muốn xóa khóa học này không ?'>
                        <DeleteOutlined
                            style={{ color: "red", fontSize: "20px" }}

                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const columnsCourse: ColumnsType<CourseType> = [
        {
            title: 'Tên khóa học',
            dataIndex: 'tenKhoaHoc',
        },
        {
            title: 'Chờ Xác Nhận',
            key: 'choXacNhan',
            render: () => (
                <Space>
                    <CheckCircleOutlined />

                    <Popconfirm title='Bạn có chắc muốn xóa khóa học này không ?'>
                        <DeleteOutlined
                            style={{ color: "red", fontSize: "20px" }}

                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const getUserListOfCourse = async (userId: string) => {
        try {
            const response = await getCourseListApprovalAPI(userId);
            console.log(response);

            setDataUserCourse(response);
        } catch (error) {
            toast.error("Không lấy được dữ liệu")
        }
    };

    console.log(dataUserCourse);


    useEffect(() => {
        if (userId) {
            console.log(userId);

            getUserListOfCourse(userId);
        }
    }, [userId])

    // Lấy danh sách khóa học
    const getCourseList = async () => {
        try {
            const reponse = await getCourseListAPI();
            setCourseList(reponse);
        } catch (error) {
            toast.error("Không lấy được danh sách khóa học");
        }
    }

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


    return (
        <div className={styles.registerUser}>
            <div className={cls(styles.registerUser__top, styles.border__bottom)}>
                <div className={styles.row}>
                    <h3 className={styles.col__3}>Chọn khóa học</h3>

                    <form className={styles.col__6}>
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
                    </form>

                    <div className={cls(styles.col__3, styles.registerUser__button)}>
                        <Button title='Ghi danh' bgColor='#41b294' />
                    </div>
                </div>
            </div>

            <div className={cls(styles.registerUser__middle, styles.border__bottom)}>
                <div className={styles.row}>
                    <h3 className={styles.col__6}>Khóa học chờ xác thực</h3>
                </div>
                {"."}

                <Table
                    columns={columnsCourse}
                    // dataSource={data}
                    bordered
                />
            </div>

            <div className={styles.registerUser__bottom}>
                <div className={styles.row}>
                    <h3 className={styles.col__6}>Khóa học đã ghi danh</h3>
                </div>
                {"."}

                <Table
                    columns={columnsCourseWaitingApproval}
                    dataSource={dataUserCourse}
                    bordered
                >
                </Table>
            </div>
        </div>
    )
}

export default RegisterUser