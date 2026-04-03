import React from 'react';
import { Paper, Chip } from '@material-ui/core';
import './UserDetailsCard.css';
import Avatar from '@material-ui/core/Avatar';

const UserDetailsCard = ({ userData }) => {
  return (
    
      <Paper elevation={ 2 } >
          <div className='projectListsContainer'>
              <div >
              <Avatar src="./Images/profile_image.png" />
              </div>
              <div className='userDetaisContainer'>
                  <p className='userName'>{userData ? userData.first_name: ''} {userData ? userData.last_name: ''}</p>
                  <p className='userEmail'>{userData ? userData.email: ''}</p>
              </div>
              <Chip className='userRole' label="Owner" />
              
          </div>
      </Paper>
  )
}

export default UserDetailsCard
