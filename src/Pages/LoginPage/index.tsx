import React from "react";
import styles from "./loginPage.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import Button from "../../Core/Button";
import { LoginPayload } from "../../Redux/Service/loginAPI";
import { loginAction } from "../../Redux/Slice/userReducer";
import useCustomDispatch from "../../Hooks/useCustomDispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Navigate } from "react-router-dom";
import useCustomSelector from "../../Hooks/useCustomSelector";

type Props = {};

const schema = yup.object({
    taiKhoan: yup
        .string()
        .required("Tài khoản không được trống")
        .matches(/^\S+$/, "Tài khoản không chứa khoảng trắng"),
    matKhau: yup
        .string()
        .required("Mật khẩu không được trống")
        .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, "Mật khẩu phải chứa ít nhất 1 chữ cái và 1 chữ số")
})

function LoginPage({ }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            taiKhoan: "",
            matKhau: ""
        },
        mode: "onTouched",
        resolver: yupResolver(schema)
    })

    // const { user } = useSelector((state: RootState) => {
    //     return state.userReducer
    // })

    const { user } = useCustomSelector('userReducer')


    const dispatch = useCustomDispatch()

    const onSubmit = (values: LoginPayload) => {
        dispatch(loginAction(values))
    }

    if (user) {
        return <Navigate to="/" />
    }

    return <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.content}>
                <div className={styles.icon}>
                    <i className="fa fa-user-lock"></i>
                </div>
                <h3>Đăng nhập User Admin</h3>

                <div className={styles.formStyle}>
                    <input type="text"
                        placeholder="Tài khoản *"
                        {...register("taiKhoan")} />
                    {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
                </div>


                <div className={styles.formStyle}>
                    <input type="password"
                        placeholder="Mật khẩu *"
                        {...register("matKhau")} />
                    {errors.matKhau && <p>{errors.matKhau.message}</p>}
                </div>


                <div className={styles.buttonStyle}>
                    <Button title="Đăng nhập" margin="10px 0 0 0" />
                </div>
            </div>
        </form>
    </div>;
}

export default LoginPage;
