import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import User from '../assets/user.png'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from '../helper/axios'

export default function UserProfile() {
  let {user} = useContext(AuthContext)
  // let [exp,setExp] = useState(user.experience)
  let [exp,setExp] = useState([])
  console.log(user.github,user.linkedin)

  useEffect(()=>{
    let fetchExp = async()=>{
      let res = await axios.get(`/exp/${user._id}`)
      setExp(res.data) 
    }
    fetchExp()
  },[])
  
  let handleDeleteClick = async(id) => {
    try {
      let delExp = await axios.delete(`/exp/delete/${id}`)
      if (delExp.status === 200) {
        setExp((prevExp) =>
          prevExp.filter((exp) => exp._id !== id)
        );
        toast.success('Experience deleted successfully', {
          position: 'top-right',
          autoClose: 4000,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="mt-10 flex flex-col lg:flex-row items-start gap-10 px-4 md:px-10 lg:px-20 ">

      {/* Profile start */}
      <div className="w-full px-4 md:px-10 lg:px-20">
      <div className="flex flex-col-reverse items-start gap-10 sm:flex-row sm:gap-10 lg:gap-60 w-full">
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <p className='font-semibold text-3xl sm:text-4xl'>Profile Detail</p>
          <p className=' text-2xl sm:text-3xl'>{user.fullname}</p>
          <p className='text-gray-500 w-full sm:w-[400px]'>{user.bio ? user.bio : 'Bio'}</p>
          <p className='text-gray-500 w-full sm:w-[400px]'>{user.about ? user.about : 'About Me'}</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 w-full sm:w-[400px]">
        <p className="flex items-center gap-5 text-gray-700">
          <i className="fa-solid fa-envelope text-[20px]"></i> {user.email}
        </p>
        <p className="flex items-center gap-5 text-gray-700">
          <i className="fa-solid fa-phone text-[20px]"></i> {user.phone}
        </p>
        <p className="flex items-center gap-5 text-gray-700">
          <i className="fa-solid fa-location-dot text-[20px]"></i> 
          {user.address ? user.address : '-------'}, {' '}
          {user.city ? user.city : '-------'},{' '}
          {user.state ? user.state : '-------'},{' '}
          {user.country ? user.country : '-------'}
        </p>
        <p className="flex items-center gap-5 text-gray-700">
          <i className="fa-solid fa-user-graduate text-[24px]"></i> {user.degree ? user.degree : '-------'}
        </p>
        <p className="flex items-center gap-5 text-gray-700">
          <i className="fa-solid mt-1 fa-trophy text-[20px]"></i> 
          {user.skills ? 
            (Array.isArray(user.skills) 
              ? user.skills.join(', ') // If it's an array, join with ", "
              : user.skills.replace(/,/g, ', ') // If it's a string, replace commas with ", "
            )
            : '-------'}
        </p>
        <p className="flex items-center gap-5 text-gray-700">
          <i className="fa-solid fa-briefcase text-[24px]"></i> 
          {user.job_preference ? 
            (Array.isArray(user.job_preference) 
              ? user.job_preference.join(', ') // If it's an array, join with ", "
              : user.job_preference.replace(/,/g, ', ') // If it's a string, replace commas with ", "
            )
            : '-------'}
        </p>

        <p className="flex items-center gap-5 text-gray-700">
          <i className="fa-brands fa-linkedin text-[24px]"></i> 
          {user.linkedin ? (
            <a
            onClick={(e) => {
              e.preventDefault();
              window.open(user.linkedin, '_blank', 'noopener,noreferrer');
            }}
            href={user.linkedin} // Optional: this can be the actual URL if needed for SEO
            className="text-blue-500 cursor-pointer hover:text-blue-600"
          >
            LinkedIn
          </a>
          
          ) : (
            <span className="text-gray-700">-------</span>
          )}
        </p>

        <p className="flex items-center gap-5 text-gray-700">
          <i className="fa-brands fa-github text-[24px]"></i> 
          {user.github ? (
            <a
              onClick={(e) => {
                e.preventDefault();
                window.open(user.github, '_blank', 'noopener,noreferrer');
              }}
              href={user.github} 
              className="text-blue-500 cursor-pointer hover:text-blue-600"
            >
              Github
            </a>
          ) : (
            <span className="text-gray-700">-------</span>
          )}
        </p>

        <p className="flex items-center gap-5 text-gray-700">
          <i className="fa-brands fa-chrome text-[24px]"></i> 
          {user.portfolio ? (
            <a
              onClick={(e) => {
                e.preventDefault();
                window.open(user.portfolio, '_blank', 'noopener,noreferrer');
              }}
              href={user.portfolio} 
              className="text-blue-500 cursor-pointer hover:text-blue-600"
            >
              Personal Website
            </a>
          ) : (
            <span className="text-gray-700">-------</span>
          )}
        </p>

        <div className=" flex gap-3">
          <p className="flex items-center gap-5 text-gray-700">
            <i className="fa-solid fa-file text-[24px]"></i> 
            {user.cv ? (
            <Link
            onClick={(e) => {
              e.preventDefault();
              window.open(import.meta.env.VITE_BACKEND_URL_ACCESS + '/cv/' + user.cv, '_blank', 'noopener,noreferrer');
            }} 
            to={import.meta.env.VITE_BACKEND_URL_ACCESS + '/cv/' + user.cv} className='text-blue-500 ms-[7px] hover:text-blue-600'>
              Resume
            </Link>
          ) : (
            <span className="text-gray-700">-------</span>
          )}
            
          </p>
          <Link to={'/user/cv/edit'} className='bg-blue-500 p-[3px] rounded text-white hover:bg-blue-600'><i className='fa-solid fa-pen'></i></Link>
        </div>
        
        <Link to={'/user/profile/edit'} className='bg-blue-500 w-full sm:w-[110px] hover:bg-blue-600 text-white py-2 px-4 rounded text-center'>Edit Profile</Link>
      </div>       
      </div>
      {/* Profile end */}
      {/* <hr className="w-full my-10" /> */}



      {/* Experience start */}
      <div className=" w-full px-4 md:px-10 lg:px-20">
      <p className='font-semibold text-3xl sm:text-4xl'>Experience</p>
      <Link to={'/user/exp/add'}><i className='fa-solid fa-plus mt-5 bg-blue-500 p-[5px] rounded text-white'></i></Link>
      <div className=" mt-5 cursor-pointer">
        {
          exp.map((exp)=>(
            <>
            <div className=" flex flex-col gap-2" key={exp._id}>
              <p className=' font-semibold text-xl'>{exp.company}</p>
              {
                exp.company_url && (
                  <a
                  onClick={(e) => {
                  e.preventDefault();
                  window.open(exp.company_url, '_blank', 'noopener,noreferrer');
                }}
                href={exp.company_url} 
                className="text-blue-500 cursor-pointer text-[13px] underline hover:text-blue-600"
              >
                Company Website
              </a>
                )
              }
              <p className=' text-sm text-gray-500'>
                {new Date(exp.start_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} - {' '}
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
              <p>{exp.position}</p>
              <div className=" flex gap-5">
                <Link to={`/user/exp/detail/${exp._id}`} className='text-blue-500 hover:text-blue-600'><i className='fa-solid fa-eye'></i></Link>
                <Link to={`/user/exp/edit/${exp._id}`} className='text-blue-500 hover:text-blue-600'><i className='fa-solid fa-pen'></i></Link>
                <button onClick={()=>handleDeleteClick(exp._id)} className='text-red-500 hover:text-red-600'><i className='fa-solid fa-trash'></i></button>
              </div>
            </div>
            <br />
            <hr />
            <br />
            </>
            
          ))
        }
      </div>
      </div>
      {/* Experience end */}

      </div>
      <ToastContainer/>

    </>
  )
}
