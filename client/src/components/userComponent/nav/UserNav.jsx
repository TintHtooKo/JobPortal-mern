import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import axios from '../../../helper/axios'
import { useNavigate } from 'react-router-dom'
import User from '../../../assets/user.png'
import Logo from '../../../assets/logo.jpg'

export default function UserNav() {
    let {user,dispatch} = useContext(AuthContext)
    let navigate = useNavigate()


    let handleLogout = async() => {
        try {
          let res = await axios.post('/user/logout')
          if(res.status == 200){
            dispatch({type:'LOGOUT'})
            navigate('')
          }
        } catch (error) {
          console.log(error.response.data.message)
        }
      }

  return (
    <>
        <div className="flex items-center justify-between mx-5">
            <div className="">
                <img src={Logo} className="cursor-pointer w-[80px] sm:w-[100px] lg:w-[120px]" alt="Logo" />
            </div>
            <div className=" flex items-center gap-3 sm:gap-5">
                <p className="text-sm sm:text-base lg:text-lg truncate max-w-[100px] sm:max-w-none">
                    {user?.fullname}
                </p>
                <img src={User} className="cursor-pointer w-[40px] sm:w-[50px] lg:w-[60px]" alt="User" />
            </div>
        </div>
    </>

  )
}
