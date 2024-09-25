import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login');
    }, [navigate]);

    return (
        <></>
    );
};

export default HomeRoute;