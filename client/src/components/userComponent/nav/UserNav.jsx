import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import axios from '../../../helper/axios'
import { useNavigate } from 'react-router-dom'
import User from '../../../assets/user.png'
import Logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom'

export default function UserNav() {
  let { user, dispatch } = useContext(AuthContext)
  let [open, setOpen] = useState(false)
  let navigate = useNavigate()

  let handleOpen = () => {
    setOpen(!open)
  }

  let handleLogout = async () => {
    try {
      let res = await axios.post('/user/logout')
      if (res.status === 200) {
        dispatch({ type: 'LOGOUT' })
        navigate('')
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mx-5 ">
        <div>
          <Link to={'/dashboard'}><img onClick={()=>setOpen(false)} src={Logo} className="cursor-pointer w-[70px] sm:w-[80px] lg:w-[100px]" alt="Logo" /></Link>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="relative">
            <img
              src={User}
              onClick={handleOpen}
              className="cursor-pointer w-[40px] sm:w-[40px] lg:w-[50px] rounded-full"
              alt="User"
            />
            <div
              className={`${
                open ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              } transition-all duration-300 ease-in-out transform origin-top-right flex flex-col absolute top-16 right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-40 sm:w-48 lg:w-52 py-2 z-50`}
            >
              <p 
              className="px-4 py-2 bg-white font-bold lg:text-base mb-5 text-center"
              >
                {user.fullname}
              </p>

              <Link
                to="/user/profile"
                className=" flex gap-3 items-center mb-2 px-4 py-2 bg-white text-sm lg:text-base hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setOpen(false)} 
              >
                <i className="fa-solid fa-user text-[20px]"></i>Profile
              </Link>

              <Link
                to="/user/profile"
                className=" flex gap-3 items-center mb-2 px-4 py-2 bg-white text-sm lg:text-base hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setOpen(false)} 
              >
                <i className="fa-solid fa-bookmark text-[20px]"></i>My Jobs
              </Link>

              <Link
                to="/user/setting"
                className=" flex gap-3 items-center mb-2 px-4 py-2 bg-white text-sm lg:text-base hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setOpen(false)} 
              >
                <i className="fa-solid fa-gear text-[20px]"></i>Settings
              </Link>

              <button
                type="submit"
                onClick={handleLogout}
                className=" flex gap-3 items-center px-4 py-2 text-sm lg:text-base text-left hover:bg-gray-100 transition-colors duration-200"
              >
                <i className="fa-solid fa-right-from-bracket"></i>Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}
