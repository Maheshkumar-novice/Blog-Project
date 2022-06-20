import React from 'react';
import {FaUserAlt} from 'react-icons/fa';

const Header = () => {
  return (
    <header>
        <h1>GoBlogging</h1>
        <div className='user'>
            <FaUserAlt className='user-logo'/>
        </div>
    </header>
  )
}

export default Header