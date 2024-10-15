import React, { useContext } from 'react'

import axios from '../helper/axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import UserNav from '../components/userComponent/nav/UserNav'

export default function Dashboard() {
  let {user,dispatch} = useContext(AuthContext)
  let navigate = useNavigate()
  

  return (
    <>
      <UserNav/>
      <div>Dashboard</div>
    </>
  )
}
