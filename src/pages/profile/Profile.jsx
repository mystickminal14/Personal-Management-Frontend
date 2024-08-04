import React from 'react'
import Dashboard from '../../components/dashboard/Dashboard'
import ProfileCard from './ProfileCard'

const Profile = () => {
  return (
    <div>
         <Dashboard mainContent={<ProfileCard/>}/>
    </div>
  )
}

export default Profile
