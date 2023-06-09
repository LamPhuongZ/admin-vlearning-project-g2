import React from "react";
import Button from "../../Core/Button";
import useCustomDispatch from "../../Hooks/useCustomDispatch";
import useCustomSelector from "../../Hooks/useCustomSelector";
import userReducer, { logout } from "../../Redux/Slice/userReducer";
import styles from "./header.module.scss";

type Props = {};

function Header({ }: Props) {
  const dispatch = useCustomDispatch();
  const { user } = useCustomSelector("userReducer");

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={styles.container}>
      {user &&
        <span className={styles.active}>{user.taiKhoan}</span>}
      <Button
        title="Đăng xuất"
        margin="0 20px 0 10px"
        bgColor="#41b294"
        onClick={handleLogout}
      />
    </div>
  );
}

export default Header;
