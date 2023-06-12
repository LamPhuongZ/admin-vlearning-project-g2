import React, { useEffect, useState } from 'react'
import { Modal, Popconfirm, Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { BookOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteCourseAPI, getCourseListAPI } from '../../Redux/Service/courseListAPI';
import { toast } from 'react-toastify';
import { CourseType } from '../../Redux/Slice/courseListSlice';
import { useNavigate } from 'react-router-dom';

type Props = {}

function CourseManagement({ }: Props) {
    const [dataSource, setDataSource] = useState<CourseType[]>([]);
    const navigate = useNavigate();

    // Chuyển trang thêm khóa học
    const onNavigateCreateCourse = () => {
        navigate(`/course-management/create`);
    }

    // Chuyển trang chỉnh sửa thông tin
    const onNavigateEditCourse = (courseId: string) => {
        navigate(`/course-management/edit/${courseId}`);
    }

    const columns: ColumnsType<CourseType> = [
        {
            title: 'Mã Khóa Học',
            dataIndex: 'maKhoaHoc',
            key: 'maKhoaHoc',
            width: 150
        },
        {
            title: 'Tên Khóa Học',
            dataIndex: 'tenKhoaHoc',
            key: 'tenKhoaHoc',
            width: 200,
        },
        {
            title: 'Bí Danh',
            dataIndex: 'biDanh',
            key: 'biDanh',
            width: 200,
        },
        {
            title: 'Lượt Xem',
            dataIndex: 'luotXem',
            key: 'luotXem',
            width: 100,
            sorter: {
                compare: (a, b) => a.luotXem - b.luotXem,
                multiple: 3
            }
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'hinhAnh',
            key: 'hinhAnh',
            width: 150,
            render: (record) => {
                return (
                    <img
                        src={record}
                        alt={record.maKhoaHoc}
                        width="100"
                        height="150"
                    />
                );
            },
        },
        {
            title: 'Người Tạo',
            dataIndex: 'nguoiTao',
            width: 150,
            render: (_, record) => {
                return (
                    <>
                        {record.nguoiTao.taiKhoan}
                    </>
                )
            }
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'ngayTao',
            key: 'ngayTao',
            width: 150,
        },
        {
            title: 'Danh Mục',
            dataIndex: 'danhMucKhoaHoc',
            width: 200,
            render: (_, record) => {
                return (
                    <>
                        {record.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                    </>
                )
            }
        },
        {
            title: 'Hành Động',
            key: 'hanhDong',
            render: (record) => (
                dataSource.length >= 1 ? (
                    <Space>
                        <BookOutlined
                            style={{ color: "orange" }}
                        />
                        <EditOutlined
                            style={{ color: "green" }}
                            onClick={() => {
                                onNavigateEditCourse(record.maKhoaHoc);
                            }}
                        />
                        <Popconfirm title='Bạn có chắc muốn xóa khóa học này không ?' onConfirm={() => onDeleteCourse(record.maKhoaHoc)}>
                            <DeleteOutlined
                                style={{ color: "red" }}

                            />
                        </Popconfirm>
                    </Space>
                ) : null
            )
        },
    ];

    const onChange: TableProps<CourseType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    // Lấy danh sách khóa học
    const getCourseList = async () => {
        try {
            const reponse = await getCourseListAPI();
            setDataSource(reponse);
        } catch (error) {
            toast.error("Không lấy được danh sách khóa học");
        }
    }

    useEffect(() => {
        getCourseList();
    }, []);

    // Hàm xóa dữ liệu
    const onDeleteCourse = async (courseId: string) => {
        try {
            await deleteCourseAPI(courseId);
            // toast.success("Xoá khóa học thành công!");
            getCourseList();
        } catch (error) {
            toast.error("Xóa khóa học không thành công");
        }
    }

    return (
        <div style={{ width: "100%" }}>
            <h3>Quản Lý Khóa Học</h3>

            <button
                onClick={() => onNavigateCreateCourse()}
            >
                Thêm dữ liệu
            </button>
            <Table
                columns={columns}
                dataSource={dataSource}
                onChange={onChange}
                scroll={{ x: 400 }}
            />
        </div>
    )
}

export default CourseManagement


