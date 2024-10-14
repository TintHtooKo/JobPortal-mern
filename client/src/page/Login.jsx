import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonSpinner from '../assets/button-spinner.svg'
import { toast, ToastContainer } from 'react-toastify';
import axios from '../helper/axios';

export default function Login() {
  let [email,setEmail] = useState('');
  let [password,setPassword] = useState('');
  let [passwordVisible, setPasswordVisible] = useState(false);
  let [loading,setLoading] = useState(false);
  let navigate = useNavigate();

  let togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  let handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let data = {email,password}
      if(!email || !password){
        toast.error('All fields are required',{
          position: 'top-right',
          autoClose: 4000,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark'
        });
        setLoading(false);
      }else{
        let res = await axios.post('/user/login',data);
        if(res.status == 200){
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast.error(error.response.data.message,{
        position: 'top-right',
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
      });
      setLoading(false);
    }
  }

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form action="" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="johndoe@example.com" 
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
          <div className="mb-6">
            <Link className='text-sm text-blue-600 underline'>forget password?</Link>
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              {loading && <img src={ButtonSpinner}  alt="" />} Login
            </button>
          </div>
        </form>
        <div className="mt-6">
            <span className='text-sm text-gray-600'>Do you have an account? <Link to={'/register'} className='text-sm text-blue-600 underline'>Register</Link></span>
          </div>
      </div>
    </div>
    <ToastContainer/>
    </>
  );
}

