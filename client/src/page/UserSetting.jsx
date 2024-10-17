import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../helper/axios'

export default function UserSetting() {
  let { user,dispatch } = useContext(AuthContext)
  let [isModalOpen, setIsModalOpen] = useState(false)
  let navigate = useNavigate()

  let handleDeleteClick = () => {
    setIsModalOpen(true)
  }

  let closeModal = () => {
    setIsModalOpen(false)
  }

  let confirmDelete = async(id) => {
    setIsModalOpen(false)
    try {
        let delUser = await axios.delete(`/user/delete/${id}`)
        if (delUser.status === 200) {
            dispatch({ type: 'LOGOUT' })
            navigate('')
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
      <h1 className="text-center mt-5 font-semibold text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem]">
        Account Settings
      </h1>
      <div className="mx-4 md:mx-10 lg:mx-20 xl:mx-60">
        <div className="my-5">
          <div>
            <h1 className="mt-5 font-semibold text-[1.25rem] sm:text-[1.5rem] lg:text-[1.75rem]">
              Account Type
            </h1>
            <p className="text-gray-700 text-[1rem] sm:text-[1.1rem] lg:text-[1.25rem]">
              {user.position.position}
            </p>
          </div>
        </div>
        <hr />

        <div className="my-5 flex flex-col sm:flex-row items-center justify-between">
          <div className="w-full sm:w-auto">
            <h1 className="mt-5 font-semibold text-[1.25rem] sm:text-[1.5rem] lg:text-[1.75rem]">
              Email
            </h1>
            <p className="text-gray-700 text-[1rem] sm:text-[1.1rem] lg:text-[1.25rem]">
              {user.email}
            </p>
          </div>
          <div className="w-full sm:w-auto mt-3 sm:mt-0">
            <Link to={'/user/setting/changemail'} className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded border border-gray-600 text-[1rem] sm:text-[1.1rem] lg:text-[1.25rem] text-center block sm:inline-block">
              Change Email
            </Link>
          </div>
        </div>

        <hr />

        <div className="my-5 flex flex-col sm:flex-row items-center justify-between">
          <div className="w-full sm:w-auto">
            <h1 className="mt-5 font-semibold text-[1.25rem] sm:text-[1.5rem] lg:text-[1.75rem]">
              Password
            </h1>
            <p className="text-gray-700 text-[1rem] sm:text-[1.1rem] lg:text-[1.25rem]">********</p>
          </div>
          <div className="w-full sm:w-auto mt-3 sm:mt-0">
            <Link to={'/user/setting/changepw'} className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded border border-gray-600 text-[1rem] sm:text-[1.1rem] lg:text-[1.25rem] text-center block sm:inline-block">
              Change Password
            </Link>
          </div>
        </div>

        <hr />

        <div className="my-5 flex items-center justify-between">
          <div></div>
          <div>
            <button type="button" onClick={handleDeleteClick} className="bg-gray-200 hover:bg-gray-300 text-red-700 font-semibold py-2 px-4 rounded border border-red-600 text-[1rem] sm:text-[1.1rem] lg:text-[1.25rem]">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] sm:w-[80%] lg:w-[40%]">
            <h2 className="text-xl mb-4 text-center">Are you sure you want to delete your account?</h2>
            <div className="flex justify-between mt-5">
              <button onClick={closeModal} className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded">
                No
              </button>
              <button onClick={() => confirmDelete(user._id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
