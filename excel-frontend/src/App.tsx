import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Excel from './pages/Excel';
import axios from 'axios';
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import PrivateRoute from '../src/routes/PrivateRoute.tsx';
import { getToken } from './utils/helperFuntions.ts';
import { fetchUserData } from './store/middlewares/authMiddleware.ts';
import {store} from './store/store.ts';
import PublicRoute from "./routes/PublicRoute.tsx";

axios.defaults.baseURL = 'http://localhost:3000';

if (getToken()) {
    console.log('fetchUserData', getToken())
    store.dispatch(fetchUserData());
}

function App() {
    return (
        <>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<PublicRoute Component={Login}/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="/" element={<Dashboard/>} />
                    <Route path="/excel/:id" element={<Excel/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;