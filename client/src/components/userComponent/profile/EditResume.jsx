import React, { useContext, useState } from 'react'
import ButtonSpinner from '../../../assets/button-spinner.svg'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function EditResume() {
    let [loading,setLoading] = useState(false)
    let {dispatch,user} = useContext(AuthContext)
    let [file,setFile] = useState(user.cv)
    let navigate = useNavigate()
    let upload = (e) => {
        let file = e.target.files[0]
        setFile(file)
    }

    let handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let formData = new FormData
            formData.set('cv',file)
            let uploadRes = await axios.post('/user/upload/cv',formData,{
                headers : {
                    Accept  : 'multipart/form-data'
                }
            })
            if(uploadRes.status === 200) {
                setLoading(false)
                dispatch({type:'UPDATE_PROFILE',payload:{cv:file}})
                navigate('/user/profile')
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 ">Add Resume</h1>
        <form action="" onSubmit={handleSubmit}  className=''>
          <div className="mb-4">
            <label htmlFor="cv" className="block text-sm font-medium text-gray-700">Add Resume</label>
            <input 
              onChange={upload}
              type="file" 
              id="cv" 
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              {loading && <img src={ButtonSpinner} className=' bg-transparent'  alt="" />} Add
            </button>
          </div>
        </form>

      </div>
    </div>
    <ToastContainer/>
    </>
  )
}
