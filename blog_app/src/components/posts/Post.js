import React, { useContext, useEffect } from 'react'
import { userContext } from '../../App';
import { axiosInstance } from '../../axiosConfig';

const Post = () => {
    const [user, setUser] = useContext(userContext).user;
    const getCurrentUserData = async () => {
        try{
            const res = await axiosInstance.get('/current-user');
            console.log(res.data);
            setUser(res.data);
        }
        catch(error){
            console.log(error.response);
        }
    }
    useEffect(() => {
        getCurrentUserData();
    }, []);
const getAllPost = async () => {
    try {
        const res = await axiosInstance({
        method: 'get',
        url : '/explore',
        });
        console.log(res);
    }
    catch(error){
        console.log(error.status)
        // if(error.response.status === 401){
        //   window.location = '/login';
        // }
        console.log(error.response);
    }
    }
  return (
    <div>Post</div>
  )
}

export default Post