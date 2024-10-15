import axios from './helper/axios'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Spinner from './assets/screen-spinner.svg'

export default function App() {
   let [loading,setLoading] = useState(true)
   let navigate = useNavigation()

   let checkBackendConnection = async () => {
    let start = Date.now(); // start time

    try {
      let res = await axios.get(''); // Backend connection 
      if (res.status === 200) {
        let end = Date.now(); //  end time
        let duration = end - start; // Calculate connection time

        // If connection is fast, wait for the remaining time to complete 700ms
        let remainingTime = 1500 - duration;
        if (remainingTime > 0) {
          setTimeout(() => setLoading(false), remainingTime); // Fast connection
        } else {
          setLoading(false); // Slow connection, stop loading immediately
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false); // If connection fails, stop loading immediately
    }
  };
   useEffect(()=>{
     checkBackendConnection()
     return ()=>{}
   },[navigate.state])

   if(loading){
    return(
      <div className=" flex items-center justify-center min-h-screen">
        <img src={Spinner} className=' text-[5rem]' alt="" />
      </div>
    )
   }

  return (
    <>
      <Outlet/>
    </>
  )
}
