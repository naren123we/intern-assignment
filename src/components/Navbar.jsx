import React from 'react'
import logo from '../assets/Graviti Logo 1.png'
const Navbar = () => {
  return (
    <div className='h-[80px] bg-[#FFFFFF] hidden md:block '>
      <img src={logo} alt='logo' className="w-[160px] pt-[6px] ml-[67px] "  />
    </div>
  )
}

export default Navbar
