import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import Login from '../page/Login'
import Register from '../page/Register'
import Dashboard from '../page/Dashboard'

export default function Route() {
    let router = createBrowserRouter([
        {
            path : '/',
            element : <App/>,
            children : [
                {
                    path : '/',
                    element : <Login/>
                },
                {
                    path : '/register',
                    element : <Register/>
                },
                {
                    path : '/dashboard',
                    element : <Dashboard/>
                }
            ]
        }
    ])
  return (
    <RouterProvider router={router}/>
  )
}
