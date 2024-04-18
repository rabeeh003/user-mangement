import { adminLogin } from '@/redux/Admin'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'

function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const loggedInAdmin = useSelector(state => state.user.user);

  useEffect(() => {
    if (loggedInAdmin) {
      navigate('/admin-login');
    }
  }, [loggedInAdmin]);

  const signIn = () => {
    const data = { username, password }
    console.log("data", data);
    dispatch(adminLogin(data))
    navigate('/admin')
  }

  return (
    <div className="flex ">
      <div className="w-full bg-card rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <span className="block w-full text-xl uppercase font-bold mb-4">Admin Login</span>
        <div className="mb-4 md:w-full">
          <label className="block text-xs mb-1">Username</label>
          <input onChange={(e) => setUserName(e.target.value)} className="w-full text-black border rounded p-2 outline-none focus:shadow-outline" type="text" name="email" id="email" placeholder="Username" />
        </div>
        <div className="mb-6 md:w-full">
          <label className="block text-xs mb-1">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} className="w-full text-black border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" />
        </div>
        <button onClick={signIn} className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" >Login</button>
        <br />
        <span>If forgot password. contact developer</span>
      </div>
    </div>
  )
}

export default SignIn