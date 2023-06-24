import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useCustomSelector from "../Hooks/useCustomSelector";

type Props = {
    children: React.ReactElement;
};

function AdminProtected({ children }: Props) {
    const { user } = useCustomSelector("userReducer");
    const { pathname } = useLocation();

    if (!user)
        return <Navigate to={`/login?redirectUrl=${pathname}`} replace />
    return children;
}

export default AdminProtected;
