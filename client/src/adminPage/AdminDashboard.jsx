import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from '../helper/axios'

export default function AdminDashboard() {
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
    <div>Admin Dashboard</div>
    <button type='submit' className=' bg-blue-500 text-white p-2' onClick={handleLogout}>Logout</button>
   </>
  )
}
