import React from 'react'

const MicroPost = ({post}) => {
  return (
    <div className='user-post'>
        <h1 className='user-post-user'>
            {post.user_name}
        </h1>
        <p className='user-post-data'>{post.body}</p>
        <p className='user-post-time'>{post.timestamp}</p>
    </div>
  )
}

export default MicroPost