import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import { axiosInstance } from '../../axiosConfig';
import MicroPost from './MicroPost';

const Post = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [user, setUser] = useContext(userContext).user;
    const getCurrentUserData = async () => {
        try {
            const res = await axiosInstance.get('/current-user');
            console.log(res.data);
            setUser(res.data);
            getAllPost();
        }
        catch (error) {
            console.log(error.response);
            // navigate('/login');
        }
    }

    const getAllPost = async () => {
        try {
            const res = await axiosInstance({
                method: 'get',
                url: '/explore',
            });
            console.log(JSON.parse(res.data.data.posts));
            setPost(JSON.parse(res.data.data.posts))
        }
        catch (error) {
            console.log(error.status)
            // if(error.response.status === 401){
            //   window.location = '/login';
            // }
            console.log(error.response);
        }
    }

    useEffect(() => {
        getCurrentUserData();
    }, []);
    return (
        <div className='post-container'>
            <h1 className='post-container-heading'>All Posts</h1>
            <div className='user-posts'>
                {
                    post.map(ps => {
                        return <MicroPost key={ps.id} post={ps} />
                    })
                }
            </div>
        </div>
    )
}

export default Post