import React, { useState } from 'react'
import ButtonSpinner from '../../../assets/button-spinner.svg'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from '../../../helper/axios';

export default function ChangePassword() {
    let [oldPassword, setOldPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    let [newPasswordVisible, setNewPasswordVisible] = useState(false);
    let [cPasswordVisible, setCPasswordVisible] = useState(false);
    let [loading,setLoading] = useState(false)
    let navigate = useNavigate()

    let toggleOldPasswordVisibility = () => {
      setOldPasswordVisible(!oldPasswordVisible);
    }

    let toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
      }

    let toggleCPasswordVisibility = () => {
    setCPasswordVisible(!cPasswordVisible);
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            
            if(!oldPassword || !newPassword || !confirmPassword){
                setLoading(false)
                toast.error('All fields are required', {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            }else if(newPassword !== confirmPassword){
                setLoading(false)
                toast.error(' New Password and Confirm Password must be the same', {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            }else{
                let data = {oldPassword:oldPassword,newPassword:newPassword}
                let res = await axios.post('/user/change/password',data)
                if(res.status == 200){
                    setLoading(false)
                    navigate('/user/setting')
                }
            }
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message, {
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
        <h1 className="text-2xl font-bold text-center mb-6 ">Change Password</h1>
        <form action="" onSubmit={handleSubmit} className=''>
          <div className="mb-4 relative">
            <label htmlFor="oldpassword" className="block text-sm font-medium text-gray-700"> Old Password</label>
            <input 
              type={oldPasswordVisible ? 'text' : 'password'} 
              id="oldpassword" 
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="*********" 
              className="mt-1  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="button" 
              onClick={toggleOldPasswordVisibility} 
              className="absolute top-6 inset-y-0 right-2 flex items-center px-3 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {oldPasswordVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
            </button>
          </div>

          <div className="mb-4 relative">
            <label htmlFor="newpassword" className="block text-sm font-medium text-gray-700"> New Password</label>
            <input 
              type={newPasswordVisible ? 'text' : 'password'} 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="newpassword" 
              placeholder="*********" 
              className="mt-1  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="button" 
              onClick={toggleNewPasswordVisibility} 
              className="absolute top-6 inset-y-0 right-2 flex items-center px-3 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {newPasswordVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
            </button>
          </div>

          <div className="mb-4 relative">
            <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700"> Confirm Password</label>
            <input 
              type={cPasswordVisible ? 'text' : 'password'} 
              id="confirmpassword" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="*********" 
              className="mt-1  w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="button" 
              onClick={toggleCPasswordVisibility} 
              className="absolute top-6 inset-y-0 right-2 flex items-center px-3 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {cPasswordVisible ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
            </button>
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              {loading && <img src={ButtonSpinner} className=' bg-transparent'  alt="" />} Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
    <ToastContainer/>
    </>
  )
}
