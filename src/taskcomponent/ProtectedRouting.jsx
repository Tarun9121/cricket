import { Navigate } from "react-router-dom";

export default function ProtectedRouting({children}) {
    return localStorage.getItem("authId") === "ok" ? children : <Navigate to="/" />
}