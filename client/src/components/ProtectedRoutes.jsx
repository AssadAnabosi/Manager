import { useContext } from "react";
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { UserContext } from "../App.jsx"

export const AuthRoutes = () => {
    const useAuth = () => {
        const { user } = useContext(UserContext);
        return user;
    };
    const location = useLocation();
    const isAuth = useAuth();
    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace state={{ from: location }} />
    );
}
// routes that requires accessLevel to be higher than "User"
export const SpecRoutes = () => {
    const useAuth = () => {
        const { user } = useContext(UserContext);
        return (user?.accessLevel !== "User");
    };
    const location = useLocation();
    const isAuth = useAuth();
    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace state={{ from: location }} />
    );
}