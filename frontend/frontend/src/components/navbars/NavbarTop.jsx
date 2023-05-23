import React from 'react'
import { TbSwitch3 } from 'react-icons/tb';
import { SlOptionsVertical } from 'react-icons/sl';


const NavbarTop = () => {
  return (
    <div className='flex justify-between items-center p-2 text-white text-sm font-bold bg-primary-bg-color border-b-2 border-white'>
        <p className='text-base text-[#ecfdf5]'>Smakoszownia Delicjów</p>  
        <div className="flex items-center gap-2">
            <button className='uppercase flex items-center  text-[#ecfdf5] gap-2'>Switch user
            <TbSwitch3 className='text-2xl'/> </button> 
            <SlOptionsVertical/>
        </div>
    </div>
  )
}

export default NavbarTop