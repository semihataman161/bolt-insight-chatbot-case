import Register from '@/pages/Register';
import { Routes, Route } from 'react-router-dom';

export default function RegisterRoute() {
    return (
        <Routes>
            <Route index element={<Register />} />
        </Routes>
    );
}