import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Outlet, useLocation, useParams } from 'react-router-dom';

function Home() {
    const [isLogged, setIsLogged] = useState(false);
    const [userData, setUserData] = useState({});
    const location = useLocation();
    const params = useParams(); // Access route parameters

    useEffect(() => {
        if (location.state !== null) {
            if(location.state.isLogged===true) {
            setIsLogged(true);
            setUserData(location.state.userData);
            sessionStorage.setItem('userData', JSON.stringify(location.state.userData));
            }
        }
        else
        {
            const storedUserData = sessionStorage.getItem('userData');
            if (storedUserData) {
                const parsedUserData = JSON.parse(storedUserData);
                setIsLogged(true);
                setUserData(parsedUserData);
            }
        }
    }, [location.state]);

    return (
        <div>
            <Header isLogged={isLogged} userData={userData} />
            <Outlet isLogged={isLogged} userData={userData}/>
        </div>
    );
}

export default Home;
