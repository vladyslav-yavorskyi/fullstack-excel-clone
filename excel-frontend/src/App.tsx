import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Excel from './pages/Excel';
import axios from 'axios';
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

axios.defaults.baseURL = 'http://localhost:3000';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/excel/:id" element={<Excel />} />
      </Routes>
    </>
  );
}

export default App;
