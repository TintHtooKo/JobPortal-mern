import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {ToastContainer,toast} from 'react-toastify'
import axios from '../helper/axios'
import ButtonSpinner from '../assets/button-spinner.svg'
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  let [fullname,setFullname] = useState('')
  let [email,setEmail] = useState('')
  let [phone,setPhone] = useState('')
  let [position,setPosition] = useState('')
  let [password,setPassword] = useState('')
  let [confirmpassword,setConfirmpassword] = useState('')
  let [passwordVisible, setPasswordVisible] = useState(false);
  let [cpasswordVisible, setCPasswordVisible] = useState(false);
  let [existPosition,setExistPosition] = useState([])
  let [loading,setLoading] = useState(false)
  let navigate = useNavigate()
  let {dispatch} = useContext(AuthContext)

  let togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  let toggleCPasswordVisibility = () => {
    setCPasswordVisible(!cpasswordVisible);
  };

  useEffect(()=>{
    let fetchPosition = async()=>{
      let res = await axios.get('/position')
      setExistPosition(res.data);
    }
    fetchPosition()
  },[])

  let HandleRegister = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      let data = {fullname,email,phone,position,password}
      if(!fullname || !email || !phone || !position || !password || !confirmpassword){
        toast.error('All fields are required', {
          position: 'top-right',
          autoClose: 4000,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark'
      })
      setLoading(false)
      }else if(password !== confirmpassword){
        toast.error('Password does not match', {
          position: 'top-right',
          autoClose: 4000,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark'
      })
      setLoading(false)
      } else{
        let res = await axios.post('/user/register',data)
        if(res.status == 200){
          dispatch({type:'LOGIN',payload:res.data.user})
          if(res.data.user?.role.role === "Admin" || res.data.user?.role.role === "Super Admin"){
            navigate('/admin')
          }else if(res.data.user?.position.position === "Employer"){
            navigate('/employee')
          }else{
            navigate('/dashboard')
          }
        }
      }

      

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message, {
        position: 'top-right',
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    })
      setLoading(false)
    }
  }

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center bg-white mb-6">Register</h1>
        <form action="" onSubmit={HandleRegister} className=' bg-white'>
        <div className="mb-4 bg-white">
            <label htmlFor="name" className="block text-sm bg-white font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              id="name"
              value={fullname}
              onChange={(e)=>setFullname(e.target.value)} 
              placeholder="John Doe" 
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 bg-white">
            <label htmlFor="email" className="block bg-white text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="johndoe@example.com" 
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 bg-white">
            <label htmlFor="" className="block bg-white mb-1 text-sm font-medium text-gray-700">Who are you?</label>
            <select 
            value={position}
            onChange={(e)=>setPosition(e.target.value)}
            className=' "mt-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
              <option value="">Choose One</option>
              {
                existPosition.map((item,index)=>{
                  return(
                    <option key={index} value={item._id}>{item.position}</option>
                  )
                })
              }
            </select>
          </div>

          <div className="mb-4 bg-white">
            <label htmlFor="phone" className="block bg-white text-sm font-medium text-gray-700">Phone</label>
            <PhoneInput 
            className='mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            international
            placeholder=" Phone Number"
            value={phone}
            onChange={setPhone}/>
          </div>

          <div className="mb-4 relative bg-white">
            <label htmlFor="password" className="block bg-white text-sm font-medium text-gray-700">Password</label>
            <input 
              type={passwordVisible ? 'text' : 'password'} 
              id="password" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="*********" 
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="button" 
              onClick={togglePasswordVisibility} 
              className="absolute top-6 inset-y-0 right-2 flex items-center px-3 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {passwordVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
            </button>
          </div>

          <div className="mb-6 relative bg-white">
            <label htmlFor="confirmpassword" className="block bg-white text-sm font-medium text-gray-700">Confirm Password</label>
            <input 
              type={cpasswordVisible ? 'text' : 'password'}
              value={confirmpassword}
              onChange={(e)=>setConfirmpassword(e.target.value)} 
              id="confirmpassword" 
              placeholder="*********" 
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="button" 
              onClick={toggleCPasswordVisibility} 
              className="absolute top-6 inset-y-0 right-2 flex items-center px-3 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {cpasswordVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
            </button>
          </div>

          <div>
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              {loading && <img src={ButtonSpinner} className=' bg-transparent'  alt="" />} Register
            </button>
          </div>
        </form>
        <div className="mt-6 bg-white">
            <span className='text-sm bg-white text-gray-600'>Have you already registered? <Link to={'/'} className='text-sm bg-white text-blue-600 underline'>Login</Link></span>
          </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}
