import {Navigate, Outlet, useNavigate} from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import {useEffect} from "react";
import {getToken} from "../utils/helperFuntions.ts";

const PrivateRoute = () => {
    const { token, loading } = useAppSelector((state: any) => state.authReducer);
    const navigate = useNavigate();

    useEffect(() => {
        if(!token && getToken()) {
            navigate('/');
        }
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return token || getToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;