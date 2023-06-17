import React, { useEffect, useRef, useState } from "react";
import styles from "./userManagement.module.scss";
import Button from "../../Core/Button";
import { BookOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Search from "../../Core/Search";
import { Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
    deleteUserRequest,
    listUserRequest,
    searchUserRequest,
} from "../../Redux/Service/listUserAPI";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import RegisterUser from "./RegisterUser";

interface DataType {
    key: React.Key;
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDt: string;
    maLoaiNguoiDung: string;
}

type Props = {};

function UserManagement({ }: Props) {
    const [accounts, setAccounts] = useState<DataType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const inputSearchRef = useRef("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        inputSearchRef.current = value;
    };
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/user-management?query=${inputSearchRef.current}`);
    };
    const handleNavigateToEditUser = (userId: string) => {
        navigate(`/user-management/edit/${userId}`);
    };
    const handleNavigateToCreateUser = () => {
        navigate("/user-management/create");
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "Tài khoản",
            width: 200,
            dataIndex: "taiKhoan",
            key: "taiKhoan",
            fixed: "left",
        },
        {
            title: "Họ và tên",
            dataIndex: "hoTen",
            key: "hoTen",
            width: 200,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 200,
        },
        {
            title: "Số ĐT",
            dataIndex: "soDt",
            key: "soDt",
            width: 200,
        },
        {
            title: "Người dùng",
            dataIndex: "maLoaiNguoiDung",
            key: "maLoaiNguoiDung",
            width: 200,
        },
        {
            title: "Hành động",
            dataIndex: "hanhDong",
            key: "hanhDong",
            width: 200,
            render: (_, row) => {
                return (
                    <div className={styles.buttonStyle}>
                        <BookOutlined
                            className={styles.registerButton}
                            onClick={() => {
                                showModal();
                            }}
                        />

                        <DeleteOutlined
                            className={styles.deleteButton}
                            onClick={() => fetchDeleteUser(row.taiKhoan)}
                        />
                        <EditOutlined
                            className={styles.editButton}
                            onClick={() => handleNavigateToEditUser(row.taiKhoan)}
                        />
                    </div>
                );
            },
        },
    ];

    const data: DataType[] = [
        {
            key: 1,
            taiKhoan: "abc",
            hoTen: "aaa",
            email: "aaa",
            soDt: "123456",
            maLoaiNguoiDung: "hv",
        },
    ];

    const fetchListUser = async () => {
        try {
            const response = await listUserRequest();
            setAccounts(response);
        } catch (error: any) {
            toast.error(error);
        }
    };

    const fetchDeleteUser = async (userId: string) => {
        try {
            await deleteUserRequest(userId);
            toast.success("Xoá thành công");
            fetchListUser();
        } catch (error: any) {
            toast.error(error);
        }
    };

    const fetchSearchUser = async (userName: string) => {
        try {
            const response = await searchUserRequest(userName);
            setAccounts(response);
        } catch (error) { }
    };

    useEffect(() => {
        fetchListUser();
    }, []);

    useEffect(() => {
        if (searchParams.get(`query`)) {
            fetchSearchUser(searchParams.get(`query`) as string);
        } else {
            fetchListUser();
        }
    }, [searchParams.get(`query`)]);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <h2>Danh sách người dùng</h2>
            <Button
                title="Thêm người dùng"
                margin="10px 0 10px 0"
                borderColor="rgb(65, 178, 148)"
                bgColor="transparent"
                color="rgb(65, 178, 148)"
                fontWeight="900"
                onClick={handleNavigateToCreateUser}
            />
            <Search
                placeholder="Search tài khoản"
                onChange={handleChange}
                onClick={handleSearch}
            />

            <Table
                columns={columns}
                dataSource={accounts}
                rowKey={(row) => row.taiKhoan}
            />

            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={900}
            >
                <RegisterUser />
            </Modal>
        </div>
    );
}

export default UserManagement;
