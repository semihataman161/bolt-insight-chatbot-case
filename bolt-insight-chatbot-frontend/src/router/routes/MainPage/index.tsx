import MainPage from '@/pages/MainPage';
import { Routes, Route } from 'react-router-dom';

export default function MainPageRoute() {
    return (
        <Routes>
            <Route index element={<MainPage />} />
        </Routes>
    );
}