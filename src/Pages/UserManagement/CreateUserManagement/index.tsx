import { UsergroupAddOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import styles from "./createUserManagement.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../../Core/Button";
import {
    createUserRequest,
    UpdateUserInfoPayload,
} from "../../../Redux/Service/listUserAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Props = {};

const schema = yup.object({
    taiKhoan: yup
        .string()
        .required("Tài khoản không được để trống")
        .matches(/^\S+$/, "Tài khoản không được chứa khoảng trắng"),
    matKhau: yup
        .string()
        .required("Mật khẩu không được để trống")
        .matches(
            /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
            "Mật khẩu chứa ít nhất 1 chữ cái và 1 chữ số"
        ),
    hoTen: yup
        .string()
        .required("Họ tên không được để trống")
        .matches(/[a-z\sA-Z]{6,}/, "Họ tên chứa ít nhất 6 kí tự và không chứa số"),
    soDT: yup.string().required("SĐT không được để trống"),
    maLoaiNguoiDung: yup.string().required("Chọn mã người dùng"),
    maNhom: yup.string().required("Chọn mã nhóm"),
    email: yup.string().required("Email không được để trống"),
})

function CreateUserManagement({ }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            taiKhoan: "",
            matKhau: "",
            hoTen: "",
            soDT: "",
            maLoaiNguoiDung: "",
            maNhom: "",
            email: "",
        },
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const fetchCreateUser = async (values: UpdateUserInfoPayload) => {
        try {
            await createUserRequest(values);
            toast.success("Thêm thành công");
            navigate("/user-management")
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit(fetchCreateUser)}>
            <UsergroupAddOutlined className={styles.iconStyle} />
            <h2>Thêm người dùng</h2>
            <div className={styles.formStyle}>
                <input type="text" placeholder="Tài khoản*" {...register("taiKhoan")} />
                {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
            </div>
            <div className={styles.formStyle}>
                <input
                    type="password"
                    placeholder="Mật khẩu*"
                    {...register("matKhau")}
                />
                {errors.matKhau && <p>{errors.matKhau.message}</p>}
            </div>
            <div className={styles.formStyle}>
                <input type="text" placeholder="Họ tên*" {...register("hoTen")} />
                {errors.hoTen && <p>{errors.hoTen.message}</p>}
            </div>
            <div className={styles.formStyle}>
                <input type="number" placeholder="Số ĐT*" {...register("soDT")} />
                {errors.soDT && <p>{errors.soDT.message}</p>}
            </div>
            <div className={styles.formStyle}>
                <select {...register("maLoaiNguoiDung")}>
                    <option value="">Mã loại người dùng</option>
                    <option value="HV">HV</option>
                    <option value="GV">GV</option>
                </select>
                {errors.maLoaiNguoiDung && <p>{errors.maLoaiNguoiDung.message}</p>}
            </div>
            <div className={styles.formStyle}>
                <select {...register("maNhom")}>
                    <option value="">Mã nhóm</option>
                    <option value="GP01">GP01</option>
                </select>
                {errors.maNhom && <p>{errors.maNhom.message}</p>}
            </div>
            <div className={styles.formStyle}>
                <input type="email" placeholder="Email" {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <Button title="Thêm mới" margin="10px 0 0 0" />
        </form>
    );
}

export default CreateUserManagement;
