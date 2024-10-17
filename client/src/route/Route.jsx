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
import EditUserProfile from '../components/userComponent/profile/EditUserProfile'
import EditResume from '../components/userComponent/profile/EditResume'
import UserSetting from '../page/UserSetting'
import ChangeEmail from '../components/userComponent/settings/ChangeEmail'
import ChangePassword from '../components/userComponent/settings/ChangePassword'

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
                    path : 'user/profile/edit',
                    element : (user && JobSeeker) ? <EditUserProfile/> : <Login/>
                },
                {
                    path : '/user/cv/edit',
                    element : (user && JobSeeker) ? <EditResume/> : <Login/>
                },
                {
                    path : '/user/setting',
                    element : (user && JobSeeker) ? <UserSetting/> : <Login/>
                },
                {
                    path : '/user/setting/changemail',
                    element : (user && JobSeeker) ? <ChangeEmail/> : <Login/>
                },
                {
                    path : '/user/setting/changepw',
                    element : (user && JobSeeker) ? <ChangePassword/> : <Login/>
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
