import React, { useEffect } from "react";
import styles from "./editUserManagement.module.scss";
import Button from "../../../Core/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import {
    searchUserRequest,
    UpdateUserInfoPayload,
    updateUserInfoRequest,
} from "../../../Redux/Service/listUserAPI";
import { toast } from "react-toastify";
import { UserSwitchOutlined } from "@ant-design/icons";

const schema = yup.object({
    taiKhoan: yup.string().required("Tài khoản không được để trống"),
    matKhau: yup
        .string()
        .required("Mật khẩu không được để trống")
        .matches(
            /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
            "Mật khẩu chứa ít nhất 1 chữ cái và 1 chữ số"
        ),
    hoTen: yup.string().required("Họ tên không được để trống"),
    soDT: yup.string().required("SĐT không được để trống"),
    maLoaiNguoiDung: yup.string().required("Chọn mã người dùng"),
    maNhom: yup.string().required("Chọn mã người nhóm"),
});

type Props = {};

function EditUserManagement({ }: Props) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            taiKhoan: "",
            matKhau: "",
            hoTen: "",
            soDT: "",
            maLoaiNguoiDung: "",
            maNhom: "GP01",
            email: "",
        },
        mode: "onTouched",
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();
    const { userId } = useParams();

    const fetchUserInfoToEdit = async (userId: string) => {
        try {
            const response = await searchUserRequest(userId);
            if (response.length) {
                const item = response[0];
                setValue("taiKhoan", item.taiKhoan);
                setValue("matKhau", item.matKhau);
                setValue("hoTen", item.hoTen);
                setValue("soDT", item.soDt);
                setValue("maLoaiNguoiDung", item.maLoaiNguoiDung);
                setValue("maNhom", "GP01");
                setValue("email", item.email);
            }
        } catch (error: any) {
            toast.error(error);
        }
    };
    const fetchUpdateUserInfo = async (values: UpdateUserInfoPayload) => {
        try {
            await updateUserInfoRequest({
                taiKhoan: values.taiKhoan,
                matKhau: values.matKhau,
                hoTen: values.hoTen,
                soDT: values.soDT,
                maLoaiNguoiDung: values.maLoaiNguoiDung,
                maNhom: "GP01",
                email: values.email,
            });
            toast.success("Cập nhật thông tin thành công");
            navigate("/user-management");
        } catch (error: any) {
            toast.error(error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserInfoToEdit(userId);
        }
    }, [userId]);
    return (
        <form
            className={styles.container}
            onSubmit={handleSubmit(fetchUpdateUserInfo)}
        >
            <UserSwitchOutlined className={styles.iconStyle} />
            <h2>Chỉnh sửa thông tin</h2>
            <div className={styles.formStyle}>
                <input type="text" placeholder="Tài khoản" {...register("taiKhoan")} disabled />
                {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
            </div>
            <div className={styles.formStyle}>
                <input type="text" placeholder="Mật khẩu" {...register("matKhau")} />
                {errors.matKhau && <p>{errors.matKhau.message}</p>}
            </div>
            <div className={styles.formStyle}>
                <input type="text" placeholder="Họ tên" {...register("hoTen")} />
                {errors.hoTen && <p>{errors.hoTen.message}</p>}
            </div>
            <div className={styles.formStyle}>
                <input type="text" placeholder="Số ĐT" {...register("soDT")} />
                {errors.soDT && <p>{errors.soDT.message}</p>}
            </div>
            <div className={styles.formStyle}>
                <select {...register("maLoaiNguoiDung")}>
                    <option value="">Mã Loại Người Dùng</option>
                    <option value="HV">HV</option>
                    <option value="GV">GV</option>
                </select>
                {errors.maLoaiNguoiDung && <p>{errors.maLoaiNguoiDung.message}</p>}
            </div>
            <div className={styles.formStyle}>
                <select {...register("maNhom")}>
                    <option value="GP01">GP01</option>
                </select>
            </div>
            <div className={styles.formStyle}>
                <input type="email" placeholder="Email" {...register("email")} />
                {errors.maNhom && <p>{errors.maNhom.message}</p>}
            </div>
            <Button title="Cập nhật" />
        </form>
    );
}

export default EditUserManagement;
