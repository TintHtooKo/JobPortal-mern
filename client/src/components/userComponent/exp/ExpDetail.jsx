import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function ExpDetail() {
    let [exp,setExp] = useState('')
    let {id} = useParams()

    useEffect(()=>{
        let fetchExp = async()=>{
            let res = await axios.get('/exp/detail/'+id)
            console.log(res.data)
            setExp(res.data)
        }
        fetchExp()
    },[id])
  return (
    <div className=' min-h-screen bg-gray-100'>
    <Link to={'/user/profile'} className=" ms-5"><i className='fa-solid fa-arrow-circle-left text-[30px] mt-3'></i></Link>

    <div className="flex items-center justify-center py-5">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 ">Experience Detail</h1>
        <div className="mb-4">
            <label htmlFor="" className=' className="block text-sm font-medium text-gray-700"'>Company Name</label>
            <p className=" mt-1 w-full cursor-pointer p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {exp.company}
            </p>
        </div>

        <div className="mb-4">
            <label htmlFor="" className=' className="block text-sm font-medium text-gray-700"'>Position</label>
            <p className=" mt-1 w-full cursor-pointer p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {exp.position}
            </p>
        </div>

        {
          exp.company_url && (
            <div className="mb-4">
            <label htmlFor="" className=' className="block text-sm font-medium text-gray-700"'>Position</label>
            <p className=" mt-1 w-full cursor-pointer p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {exp.company_url}
            </p>
            </div>
          )
        }

        <div className=" flex gap-2">
        <div className="mb-4 w-full">
            <label htmlFor="" className=' className="block text-sm font-medium text-gray-700"'>Start Date</label>
            <p className=" mt-1 w-full cursor-pointer p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            {new Date(exp.start_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
            </p>
        </div>
        <div className="mb-4 w-full">
            <label htmlFor="" className=' className="block text-sm font-medium text-gray-700"'>End Date</label>
            <p className=" mt-1 w-full cursor-pointer p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            {
                  exp.end_date ?( 
                    new Date(exp.end_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  ): ('Present')
                }
            </p>
        </div>
        </div>

        <div className="mb-4">
            <label htmlFor="" className=' className="block text-sm font-medium text-gray-700"'>Responsibilities</label>
            <p className=" mt-1 w-full cursor-pointer p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {exp.responsibilities}
            </p>
        </div>
        
      </div>
    </div>
    <ToastContainer/>
    </div>
  )
}
