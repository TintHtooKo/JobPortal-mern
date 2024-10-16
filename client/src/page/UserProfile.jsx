import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import User from '../assets/user.png'
import { Link } from 'react-router-dom'

export default function UserProfile() {
  let {user} = useContext(AuthContext)
  return (
    <>
      <div className="mt-10 flex flex-col items-center">

      {/* Profile start */}
      <div className="w-full px-4 md:px-10 lg:px-20">
      <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:gap-10 lg:gap-60 w-full">
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <p className='font-semibold text-2xl sm:text-3xl'>{user.fullname}</p>
          <p className='text-gray-500 w-full sm:w-[400px]'>{user.bio ? user.bio : 'Bio'}</p>
          <p className='text-gray-500 w-full sm:w-[400px]'>{user.about ? user.about : 'About Me'}</p>
        </div>
        <div className="flex justify-center sm:justify-start">
          <img src={User} className="w-full sm:w-[150px] rounded-full" alt="User" />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 w-full sm:w-[400px]">
        <p className="flex items-start gap-5 text-gray-700">
          <i className="fa-solid fa-envelope text-[20px]"></i> {user.email}
        </p>
        <p className="flex items-start gap-5 text-gray-700">
          <i className="fa-solid fa-phone text-[20px]"></i> {user.phone}
        </p>
        <p className="flex items-start gap-5 text-gray-700">
          <i className="fa-solid fa-map text-[20px]"></i> {user.address ? user.address : '-------'}
        </p>
        <p className="flex items-start gap-5 text-gray-700">
          <i className="fa-solid fa-user-graduate text-[24px]"></i> {user.degree ? user.degree : '-------'}
        </p>
        <p className="flex items-start gap-5 text-gray-700">
          <i className="fa-solid mt-1 fa-trophy text-[20px]"></i> {user.skills ? user.skills : '-------'}
        </p>
        <p className="flex items-start gap-5 text-gray-700">
          <i className="fa-brands fa-linkedin text-[24px]"></i> 
          <Link to={user.linkedin} className='text-blue-500 hover:text-blue-600'>{user.linkedin ? 'LinkedIn' : <span className=' text-gray-700'>-------</span>}</Link>
        </p>
        <p className="flex items-start gap-5 text-gray-700">
          <i className="fa-brands fa-github text-[24px]"></i> 
          <Link to={user.github} className='text-blue-500 hover:text-blue-600'>{user.github ? 'Github' : <span className=' text-gray-700'>-------</span>}</Link>
        </p>
        <p className="flex items-start gap-5 text-gray-700">
          <i className="fa-brands fa-chrome text-[24px]"></i> 
          <Link to={user.portfolio} className='text-blue-500 hover:text-blue-600'>{user.portfolio ? 'Personal Website' : <span className=' text-gray-700'>-------</span>}</Link>
        </p>
        <p className="flex items-start gap-5 text-gray-700">
          <i className="fa-solid fa-file text-[24px]"></i> 
          <Link to={user.cv} className='text-blue-500 ms-[7px] hover:text-blue-600'>{user.cv ? 'Resume' : <span className=' text-gray-700'>-------</span>}</Link>
        </p>
        <Link className='bg-blue-500 w-full sm:w-[110px] hover:bg-blue-600 text-white py-2 px-4 rounded text-center'>Edit Profile</Link>
      </div>       
      </div>
      {/* Profile end */}
      <hr className="w-full my-10" />
      {/* Experience start */}
      <div className=" w-full px-4 md:px-10 lg:px-20">
      <p className="text-gray-700 font-semibold text-[25px]"> Experience </p>
      </div>
      {/* Experience end */}

      </div>


    </>
  )
}
