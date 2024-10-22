import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import ButtonSpinner from '../../../assets/button-spinner.svg'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { AuthContext } from '../../../context/AuthContext'
import axios from '../../../helper/axios'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { Country, State, City } from 'country-state-city'

export default function EditUserProfile() {
    let {dispatch} = useContext(AuthContext)
    let [loading,setLoading] = useState(false)
    let [fullname,setFullname] = useState('')
    let [bio,setBio] = useState('')
    let [about,setAbout] = useState('')
    let [address,setAddress] = useState('')
    let [degree,setDegree] = useState('')
    let [linkedin,setLinkedin] = useState('')
    let [github,setGithub] = useState('')
    let [portfolio,setPortfolio] = useState('')
    let [jobPreference,setJobPreference] = useState([])
    let [phone,setPhone] = useState('')
    let [skills,setSkills] = useState([])
    let [newSkill,setNewSkill] = useState('')
    let [selectedCountry, setSelectedCountry] = useState('');
    let [selectedState, setSelectedState] = useState('');
    let [selectedCity, setSelectedCity] = useState('');
    let navigate = useNavigate()


    // Get country options
  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name
  }));

  // Get state options based on the selected country
  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        value: state.isoCode,
        label: state.name
      }))
    : [];

  // Get city options based on the selected state
  const cityOptions = selectedState
    ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map((city) => ({
        value: city.name,
        label: city.name
      }))
    : [];

    useEffect(()=>{
        let fetchUser = async() => {
            let res = await axios.get('user/me')
            if(res.status == 200){
                setFullname(res.data.fullname)
                setBio(res.data.bio)
                setAbout(res.data.about)
                setAddress(res.data.address)
                setDegree(res.data.degree || '')
                setLinkedin(res.data.linkedin)
                setGithub(res.data.github)
                setPortfolio(res.data.portfolio)
                setJobPreference(res.data.job_preference || '')
                setPhone(String('+'+res.data.phone))
                setSkills(res.data.skills)
                setSelectedCountry(res.data.country)
                setSelectedState(res.data.state)
                setSelectedCity(res.data.city)
            }
        }
        fetchUser()
    },[])

    let addSkills = () => {
        setSkills((prevSkills) => {
            if (Array.isArray(prevSkills)) {
                return [...prevSkills, newSkill];  // Spread the previous array and add the new skill
            } else {
                return [newSkill];  // Ensure prevSkills is treated as an array
            }
        });
        setNewSkill(''); // Reset the input field after adding
    };
    

    let removeSkill = (indexToRemove) => {
        setSkills(skills.filter((_, index) => index !== indexToRemove));
      };
    
    let handleJobPreferenceChange = (e) => {
    let { value, checked } = e.target;
    
    if (checked) {
        setJobPreference([...jobPreference, value]);
    } else {
        setJobPreference(jobPreference.filter(preference => preference !== value));
    }
    };

    let handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if(!fullname || !phone){
                toast.error('Full Name and phone number are required',{
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    })
                setLoading(false)
                }else if (linkedin && !linkedin.startsWith('https://') || github && !github.startsWith('https://') || portfolio && !portfolio.startsWith('https://')) {
                    setLoading(false);
                    toast.error('Link must start with "https://"', {
                        position: 'top-right',
                        autoClose: 4000,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'dark',
                    });
                }else{
                    let data = {
                                fullname,bio,about,address,degree,linkedin,
                                github,portfolio,job_preference:jobPreference,phone,skills,
                                country:selectedCountry?.label, state:selectedState?.label, city:selectedCity?.label
                                }
                    // console.log(data)
                    let editProfile = await axios.patch('user/edit',data)

                    if(editProfile.status == 200){
                      
                        dispatch({
                            type : 'UPDATE_PROFILE',
                            payload : {
                                fullname,bio,about,address,degree,linkedin,
                                github,portfolio,job_preference:jobPreference,phone,skills,
                                country:selectedCountry?.label, state:selectedState?.label, city:selectedCity?.label
                            }
                        })
                        navigate('/user/profile')
                    }
                    setLoading(false)
                } 
               
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error?.response?.data.message,{
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
    <div className=' min-h-screen bg-gray-100'>
          <Link to={'/user/profile'} className=" ms-5"><i className='fa-solid fa-arrow-circle-left text-[30px] mt-3'></i></Link>
    <div className="flex items-center justify-center">
        <div className="w-full my-10 max-w-md p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center bg-white mb-6">Edit Profile</h1>
            <form action="" onSubmit={handleSubmit} className="bg-white">
            <div className="mb-4 bg-white">
                <label htmlFor="name" className="block text-sm bg-white font-medium text-gray-700">Full Name</label>
                <input 
                value={fullname}
                onChange={(e)=>setFullname(e.target.value)}
                type="text" 
                id="name"
                placeholder="John Doe" 
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4 bg-white">
                <label htmlFor="bio" className="block text-sm bg-white font-medium text-gray-700">Bio</label>
                <input 
                type="text" 
                value={bio}
                onChange={(e)=>setBio(e.target.value)}
                id="bio"
                placeholder="Add Your Bio" 
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4 bg-white">
                <label htmlFor="" className="block text-sm bg-white font-medium text-gray-700">About</label>
                <textarea
                value={about}
                onChange={(e)=>setAbout(e.target.value)}
                placeholder='About Me'
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>


            <div className=" mb-4 bg-white">
                <label htmlFor="" className="block text-sm bg-white font-medium text-gray-700">Country</label>
                <Select
                    placeholder="Select Country"
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    options={countryOptions}
                />
            </div>

            <div className=" mb-4 bg-white">
                <label htmlFor="" className="block text-sm bg-white font-medium text-gray-700">State</label>
                <Select
                    placeholder="Select State"
                    value={selectedState}
                    onChange={setSelectedState}
                    options={stateOptions}
                    isDisabled={!selectedCountry} // Disabled until country is selected
                />
            </div>

            <div className="mb-4 bg-white">
            <label htmlFor="" className="block text-sm bg-white font-medium text-gray-700">City</label>
                <Select
                    placeholder="Select City"
                    value={selectedCity}
                    onChange={setSelectedCity}
                    options={cityOptions}
                    isDisabled={!selectedState} // Disabled until state is selected
                />
            </div>

            
            <div className="mb-4 bg-white">
                <label htmlFor="address" className="block text-sm bg-white font-medium text-gray-700">Address</label>
                <input 
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                type="text" 
                id="address"
                placeholder="123 Main St" 
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4 bg-white">
                <label htmlFor="phone" className="block bg-white text-sm font-medium text-gray-700">Phone</label>
                <PhoneInput 
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                international
                placeholder="Phone Number"
                value={phone}
                onChange={setPhone}
                />
            </div>

            <div className="mb-4 bg-white">
                <label htmlFor="jobPreference" className="block bg-white mb-1 text-sm font-medium text-gray-700">Job Preference</label>
                <div className="flex items-center gap-4">
                    <label className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded" 
                        value="Full Time"
                        checked={jobPreference.includes('Full Time')}
                        onChange={handleJobPreferenceChange}
                    />
                    <span>Full Time</span>
                    </label>
                    <label className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded" 
                        value="Part Time"
                        checked={jobPreference.includes('Part Time')}
                        onChange={handleJobPreferenceChange}
                    />
                    <span>Part Time</span>
                    </label>
                    <label className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded" 
                        value="Remote"
                        checked={jobPreference.includes('Remote')}
                        onChange={handleJobPreferenceChange}
                    />
                    <span>Remote</span>
                    </label>
                </div>
            </div>

            <div className="mb-4 bg-white">
            <label htmlFor="" className="block bg-white mb-1 text-sm font-medium text-gray-700">Degree</label>
            <select 
            value={degree}
            onChange={(e)=>setDegree(e.target.value)}
            className=' "mt-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
              <option value="">Choose One</option>
              <option value="Bachelor" >Bachelor</option>
              <option value="Master" >Master</option>
              <option value="Other">Other</option>
            </select>
            </div>

            <div className="relative">
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                <input 
                    type="text"
                    id="skills" 
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add Your Skills" 
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="button" 
                    className="absolute top-6 inset-y-0 right-2 flex items-center px-3 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={addSkills}  // Ensure you call the function here, not in the icon
                >
                    <i className="fa-solid fa-plus text-[20px]"></i>
                </button>
            </div>

            <div className="mb-4">
                {!!skills?.length && (
                    <div className="flex flex-wrap gap-2 my-2">
                    {skills.map((skill, index) => (
                        <div className="flex items-center bg-blue-500 p-1 text-white rounded-md" key={index}>
                        <span className="mr-2">{skill}</span>
                        <button 
                            type="button"
                            className="ml-2 text-white hover:text-gray-300 focus:outline-none"
                            onClick={() => removeSkill(index)}  // Remove skill on button click
                        >
                            <i className="fa-solid fa-times"></i> {/* Icon for removing */}
                        </button>
                        </div>
                    ))}
                    </div>
                )}
            </div>
            
            <div className="mb-4 bg-white">
                <label htmlFor="" className="block text-sm bg-white font-medium text-gray-700">Linkedin</label>
                <input 
                value={linkedin}
                onChange={(e)=>setLinkedin(e.target.value)}
                type="text" 
                placeholder="https://linkedin.com/your-linkedin" 
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4 bg-white">
                <label htmlFor="" className="block text-sm bg-white font-medium text-gray-700">Github</label>
                <input 
                value={github}
                onChange={(e)=>setGithub(e.target.value)}
                type="text" 
                placeholder="https://github.com/your-github" 
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4 bg-white">
                <label htmlFor="" className="block text-sm bg-white font-medium text-gray-700">Personal Website</label>
                <input 
                value={portfolio}
                onChange={(e)=>setPortfolio(e.target.value)}
                type="text" 
                placeholder="https://your-website.com" 
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                {loading && <img src={ButtonSpinner} className="bg-transparent" alt="" />} Edit
                </button>
            </div>

            
            </form>
        </div>
    </div>

    <ToastContainer />
    </div>
  )
}
