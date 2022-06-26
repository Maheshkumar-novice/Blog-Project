import React, { useContext, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io'
import { Outlet, useNavigate } from 'react-router-dom';
import { userContext } from '../App';
import { axiosInstance } from '../axiosConfig';
import BlogForm from './BlogForm';

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(userContext).user;
    const [isFormOpen, setIsFormOpen] = useState(false)
    const logout_user = async () => {
        try{
            await axiosInstance.get('/logout');
            setUser({});
        }
        catch(error){
            console.log(error.response)
        }
    }
    const handleAddClick = () => {
        setIsFormOpen(true)
    }
    return (
        <>
            <header>
                <h1 onClick={() => {navigate('/')}} style={{cursor: "pointer"}}>GoMicrO</h1>
                <div onClick={handleAddClick} style={{cursor: "pointer"}}>
                    Create Post <IoMdAdd className='create-logo' />
                </div>
                <div className='user'>
                    <h3 onClick={() => {navigate('/mypost')}}>My Posts</h3>
                    <h3>
                        { Object.keys(user).length === 0
                            ? <FaUserAlt className='user-logo' onClick={() => {
                                navigate('/login');
                            }} />
                            : <div onClick={logout_user}>{`Hi, ${user.username}`}<FiLogOut className='user-logo'/></div>}
                    </h3>
                </div>
            </header>
            {isFormOpen ? (<BlogForm setIsOpen={setIsFormOpen} />) : ("")}
            <Outlet/>
        </>

    )
}

export default Header