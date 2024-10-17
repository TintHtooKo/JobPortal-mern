import React, { useContext, useState } from 'react'
import ButtonSpinner from '../../../assets/button-spinner.svg'
import { AuthContext } from '../../../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from '../../../helper/axios'

export default function ChangeEmail() {
    let {user,dispatch} = useContext(AuthContext)
    let [email,setEmail] = useState(user.email)
    let [loading,setLoading] = useState(false)
    let navigate = useNavigate()
    let handleSubmit = async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            
            if(!email){
                setLoading(false)
                toast.error('Email should not be empty',{
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            }else{
                let data = {email}
                let res = await axios.patch('/user/change/email',data)
                if(res.status === 200){
                    setLoading(false)
                    dispatch({type : 'UPDATE_PROFILE',payload : {email}})
                    navigate('/user/setting')
                }
            }
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message,{
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 ">Change Email</h1>
        <form action="" onSubmit={handleSubmit}  className=''>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email" 
              id="email" 
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              {loading && <img src={ButtonSpinner} className=' bg-transparent'  alt="" />} Change
            </button>
          </div>
        </form>

      </div>
    </div>
    <ToastContainer/>
    </>
  )
}
