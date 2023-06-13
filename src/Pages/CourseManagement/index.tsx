import React, { ChangeEvent, useEffect, useState } from 'react'
import { Modal, Popconfirm, Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { BookOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteCourseAPI, getCourseListAPI } from '../../Redux/Service/courseListAPI';
import { toast } from 'react-toastify';
import { CourseType } from '../../Redux/Slice/courseListSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../../Core/Button';
import Search from '../../Core/Search';

type Props = {}

function CourseManagement({ }: Props) {
    const [dataSource, setDataSource] = useState<CourseType[]>([]);
    const [search, setSearch] = useState<CourseType[]>([]);
    const [filterData, setFIlterData] = useState('');
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
            render: (_, record) => {
                return (
                    <img
                        src={record.hinhAnh}
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
            render: (_, record) => (
                dataSource.length >= 1 ? (
                    <Space>
                        <BookOutlined
                            style={{ color: "orange", fontSize: "20px" }}
                        />
                        <EditOutlined
                            style={{ color: "green", fontSize: "20px" }}
                            onClick={() => {
                                onNavigateEditCourse(record.maKhoaHoc);
                            }}
                        />
                        <Popconfirm title='Bạn có chắc muốn xóa khóa học này không ?' onConfirm={() => onDeleteCourse(record.maKhoaHoc)}>
                            <DeleteOutlined
                                style={{ color: "red", fontSize: "20px" }}

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
            setSearch(reponse);
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

    // Hàm tìm kiếm kháo học
    const handleSearchCourse = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0) {
            const filterResult = search.filter((item) => item.tenKhoaHoc.toLocaleLowerCase().includes(event.target.value.toLowerCase()));
            setDataSource(filterResult);
        }
        else {
            setDataSource(search);
        }

        setFIlterData(event.target.value)
    }

    return (
        <div style={{ width: "100%" }}>
            <h2>QUẢN LÝ KHÓA HỌC</h2>
            <Button
                title="Thêm Khóa Học"
                margin="10px 0 10px 0"
                borderColor="rgb(65, 178, 148)"
                bgColor="transparent"
                color="rgb(65, 178, 148)"
                fontWeight="900"
                onClick={onNavigateCreateCourse}
            />

            <Search
                placeholder="Search Tên Khóa Học"
                value={filterData}
                onChange={(event) => handleSearchCourse(event)}
            />

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