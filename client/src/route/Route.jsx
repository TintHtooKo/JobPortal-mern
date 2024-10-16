import React, { useContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import Login from '../page/Login'
import Register from '../page/Register'
import Dashboard from '../page/Dashboard'
import AdminDashboard from '../adminPage/adminDashboard'
import EmployeeDashboard from '../employeePage/EmployeeDashboard'
import { AuthContext } from '../context/AuthContext'
import NotFound from '../page/NotFound'
import UserProfile from '../page/UserProfile'

export default function Route() {
    let {user} = useContext(AuthContext)
    let JobSeeker = user?.position.position === "Job Seeker"
    let Employee = user?.position.position === "Employer"
    let isAdmin = user?.role.role === "Admin" || user?.role.role === "Super Admin"

    
    let router = createBrowserRouter([
        {
            path : '/',
            element : <App/>,
            children : [
                {
                    path : '/',
                    element : !user ? <Login /> : isAdmin ? <AdminDashboard /> : Employee ? <EmployeeDashboard /> : <Dashboard />
                },
                {
                    path : '/register',
                    element : !user &&  <Register/>
                },
                {
                    path : '/dashboard',
                    element :( user && JobSeeker) ? <Dashboard/> : <Login/>
                },
                {
                    path : '/user/profile',
                    element : (user && JobSeeker) ? <UserProfile/> : <Login/>
                },
                {
                    path : '/employee',
                    element : (user && Employee) ? <EmployeeDashboard/> : <Login/>
                },
                {
                    path : '/admin',
                    element : (user && isAdmin) ? <AdminDashboard/> : <Login/> 
                },
                {
                    path : '*',
                    element : <NotFound/>
                }

            ]
        }
    ])
  return (
    <RouterProvider router={router}/>
  )
}
