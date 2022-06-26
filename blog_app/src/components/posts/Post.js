import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import { axiosInstance } from '../../axiosConfig';
import MicroPost from './MicroPost';

const Post = ({path}) => {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [user, setUser] = useContext(userContext).user;
    const getCurrentUserData = async () => {
        try {
            const res = await axiosInstance.get('/current-user');
            console.log(res.data);
            setUser(res.data);
        }
        catch (error) {
            console.log(error.response);
            navigate('/login');
        }
    }

    useEffect(() => {
        if(path === 'mypost' && !user.username){
            return;
        }
        getAllPost();
    }, [path])

    useEffect(() => {
        console.log("user ", user);
        if(user.username && path === 'mypost'){
            getAllPost();
        }
    }, [user]);

    const getAllPost = async () => {
        try {
            const res = await axiosInstance({
                method: 'get',
                url: path==='explore' ? '/explore' : `/user/${user.username}`,
            });
            const postString = path === 'explore' ? res.data.data.posts : res.data.data.user_data.posts;
            console.log("post", postString);
            setPost(JSON.parse(postString));
        }
        catch (error) {
            console.log(error)
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