import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import ClientAPI from "../../service/ClientAPI";
import Loading from "../Loading";

const matchRole = (pathRole, userRole) => {
    if (pathRole === 1) return userRole === 1;
    if (pathRole === 2) return userRole === 2;
    if (pathRole === 3) return userRole === 3;
    if (pathRole === 4) return true;
};

function PrivateRoute(props) {
    const { component, ...rest } = props;
    const path = props.path;

    const [isAuth, setIsAuth] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        const fetchToken = async () => {
            // Find valid role of current path name
            let currRole = 4;
            if (path.match(/^\/admin/g)) {
                currRole = 1;
            }
            if (path.match(/^\/manager/g)) {
                currRole = 2;
            }
            if (path.match(/^\/employee/g)) {
                currRole = 3;
            }

            try {
                const res = await ClientAPI.get("/auth/verify");

                if (res.status === 200 && matchRole(currRole, res.data.role)) {
                    setIsAuth(true);
                    setIsAuthenticating(false);
                } else {
                    setIsAuth(false);
                    setIsAuthenticating(false);
                }
            } catch (error) {
                console.log(error);
                setIsAuth(false);
                setIsAuthenticating(false);
            }
        };

        fetchToken();
    }, [path]);

    if (isAuthenticating)
        return (
            <Loading
                tip="Đang xác thực, vui lòng đợi giây lát..."
                style={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            />
        );

    if (isAuth) {
        const AuthenticatedLayout = component;
        return <Route {...rest} component={AuthenticatedLayout} />;
    } else {
        return <Redirect to="/login" />;
    }
}

export default PrivateRoute;
