import React, { useContext } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import { userContext } from '../App';
import { axiosInstance } from '../axiosConfig';

const Header = () => {
    const [user, setUser] = useContext(userContext).user;
    const logout_user = async () => {
        try{
            const res = await axiosInstance.get('/logout');
            setUser({});
        }
        catch(error){
            console.log(error.response)
        }
    }
    return (
        <>
            <header>
                <h1>GoBlogging</h1>
                <div className='user'>
                    <h3>
                        { Object.keys(user).length === 0
                            ? <FaUserAlt className='user-logo' />
                            : <FiLogOut className='user-logo' onClick={logout_user}/>}
                    </h3>
                </div>
            </header>
            <Outlet/>
        </>

    )
}

export default Header