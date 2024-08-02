import React from 'react'
import Dashboard from '../../components/dashboard/Dashboard'
import HomeCard from './HomeCard'

const Home = () => {
  return (
    <div>
      <Dashboard mainContent={<HomeCard/>}/>
    </div>
  )
}

export default Home
