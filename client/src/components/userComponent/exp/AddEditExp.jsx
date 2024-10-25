import React, { useEffect, useState } from 'react'
import ButtonSpinner from '../../../assets/button-spinner.svg'
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../helper/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';


export default function AddEditExp() {
    let [loading,setLoading] = useState(false)
    let [position,setPosition] = useState('')
    let [company,setCompany] = useState('')
    let [companyLink,setCompanyLink] = useState('')
    let [start,setStart] = useState('')
    let [end,setEnd] = useState('')
    let [responsibilities,setResponsibilities] = useState('')
    let [isPresent, setIsPresent] = useState(false);
    let navigate = useNavigate()
    let {id} = useParams()

    useEffect(()=>{
        let fetchExp = async()=>{
            let res = await axios.get('/exp/detail/'+id)
            setCompany(res.data.company)
            setCompanyLink(res.data.company_url)
            setPosition(res.data.position)
            setStart(new Date(res.data.start_date).toISOString().slice(0, 10));
            setEnd(isPresent ? '' : new Date(res.data.end_date).toISOString().slice(0, 10));
            setResponsibilities(res.data.responsibilities)
            setIsPresent(!res.data.end_date);
        }
        fetchExp()
    },[id])

    let handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if(!position || !company || !start || !responsibilities || !end && !isPresent) {
                setLoading(false)
                toast.error('You need to fill required fields', {
                    position: 'top-right',
                    autoClose: 4000,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark'
                })
            }else if (companyLink && !companyLink.startsWith('https://')) {
                // Check if companyLink is filled but does not start with "https://"
                setLoading(false);
                toast.error('Company Website Link must start with "https://"', {
                    position: 'top-right',
                    autoClose: 4000,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
            }else{
                let data = {position,company,company_url:companyLink,start_date:start,end_date:end,responsibilities}
                let res;
                if(id){
                    res = await axios.patch('/exp/update/'+id,data)
                }else{
                    res = await axios.post('/exp/create',data)
                }
                
                if(res.status === 200) {
                    setLoading(false)
                    toast.success(id ? 'Experience updated successfully' : 'Experience added successfully', {
                        position: 'top-right',
                        autoClose: 4000,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'dark'
                    })
                    if(id){
                        navigate('/user/profile')
                    }
                    setPosition('')
                    setCompany('')
                    setCompanyLink('')
                    setStart('')
                    setEnd('')
                    setResponsibilities('')
                    
                    
                }
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    

  return (
    <div className=' bg-gray-100 '>
    <Link to={'/user/profile'} className=" ms-5"><i className='fa-solid fa-arrow-circle-left text-[30px] mt-3'></i></Link>
    <div className="flex flex-col items-center justify-center min-h-screen py-5 ">       
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 ">Add New Experience</h1>
        <form action="" onSubmit={handleSubmit} className=''>
            <div className="mb-4">
                <label htmlFor="job" className="flex gap-2 items-center text-sm font-medium text-gray-700">Job Title <i className='fa-solid fa-asterisk text-red-500 text-[10px]'></i></label>
                <input 
                type="text" 
                value={position}
                onChange={(e)=>setPosition(e.target.value)}
                id="job" 
                placeholder="Enter Your Job Title" 
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="company" className="flex items-center gap-2 text-sm font-medium text-gray-700">Company <i className='fa-solid fa-asterisk text-red-500 text-[10px]'></i></label>
                <input 
                type="text" 
                value={company}
                onChange={(e)=>setCompany(e.target.value)}
                id="company" 
                placeholder="Enter Your Company" 
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="companylink" className="block text-sm font-medium text-gray-700">Company Website Link</label>
                <input 
                type="text" 
                value={companyLink}
                onChange={(e)=>setCompanyLink(e.target.value)}
                id="companylink" 
                placeholder="https://yourcompany.com" 
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="start" className="flex items-center gap-2 text-sm font-medium text-gray-700">Start Date <i className='fa-solid fa-asterisk text-red-500 text-[10px]'></i></label>
                <input 
                type="date" 
                value={start}
                onChange={(e)=>setStart(e.target.value)}
                id="start" 
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="end" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    End Date <i className='fa-solid fa-asterisk text-red-500 text-[10px]'></i>
                </label>
                <input 
                    type="date" 
                    id="end" 
                    value={end}
                    onChange={(e)=>setEnd(e.target.value)}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isPresent} // disable if "Present" is checked
                />
                <div className="flex items-center mt-2">
                    <input 
                    type="checkbox" 
                    id="present" 
                    onChange={() => setIsPresent(!isPresent)} // toggle "Present" checkbox
                    checked={isPresent} // reflect the checkbox state
                    />
                    <label htmlFor="present" className="ml-2 text-sm text-gray-700">I am currently working here</label>
                </div>
            </div>


            <div className="mb-4">
                <label htmlFor="res" className="flex items-center gap-2 text-sm font-medium text-gray-700">Responsibilities <i className='fa-solid fa-asterisk text-red-500 text-[10px]'></i></label>
                <textarea value={responsibilities} onChange={(e)=>setResponsibilities(e.target.value)} name="" id="res" cols="30" rows="10" 
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>

            <div>
                <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                {loading && <img src={ButtonSpinner} className=' bg-transparent'  alt="" />} {id ? 'Edit Experience' : 'Add Experience'}  
                </button>
            </div>
        </form>
      </div>
    </div>
    <ToastContainer/>
    </div>
  )
}
