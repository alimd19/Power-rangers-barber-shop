import React from 'react'
import image from '../img/power.gif'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='home-page'>
      
      <img className='home-logo' src={image}  alt="logo" ></img>
      <Link style={{textDecoration: 'none'}}  to='/login'  ><h4 className='home-book'>Book Appointment</h4></Link>
    </div>
  )
}

export default HomePage
