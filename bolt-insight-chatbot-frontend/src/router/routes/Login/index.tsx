import Login from '@/pages/Login';
import { Routes, Route } from 'react-router-dom';

export default function LoginRoute() {
    return (
        <Routes>
            <Route index element={<Login />} />
        </Routes>
    );
}