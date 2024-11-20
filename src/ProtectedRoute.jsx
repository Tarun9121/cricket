import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
    const token = localStorage.getItem("token");
    return token === "admin" ? <Outlet /> : <Navigate to="/login-form" />;
}
