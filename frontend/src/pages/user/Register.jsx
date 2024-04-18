import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios';
import { BaseUrl } from '@/components/const/urls';

function Register() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState('')
  const [profileImageURL, setProfileImageURL] = useState('')
  const [username, setUserName] = useState('')
  const [first_name, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loggedInUser = useSelector(state => state.user.user)
  const [err,setErr] =useState()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setProfile(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setProfileImageURL(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (loggedInUser) {
      navigate('/');
    }
  }, [loggedInUser]);

  const signUp = () => {
    if (username && email && first_name && password && profile){
    const data = { username, email, first_name, password };
    axios.post(BaseUrl + 'signup/', data)
      .then(res => {
        console.log("signUp response:", res.data);
        const data = new FormData();
        data.append("user", res.data.id)
        data.append("profile", profile)
        axios.post(BaseUrl + 'profile/', data)
          .then(response => {
            console.log("profile response:", response.data);
            navigate('/');
          })
          .catch(err => console.log("profile error:", err));
      })
      .catch(err => console.log("signUp error:", err));
    } else{
      setErr('All fields are required !')
    }
  };

  return (
    <div>
      <div className="flex ">
        <div className="w-full bg-card rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">Register</span>
          <div className='max-w-sm m-auto'>
            <img src={profileImageURL ? profileImageURL : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} className='rounded-full h-[100px] w-[100px] object-cover m-auto' alt="" />
            <Label >Profile picture</Label>
            <Input id="picture" onChange={handleFileChange} type="file" />
          </div>
          <div className="text-left mb-6 md:w-full">
            <label className="block text-xs mb-1">Name</label>
            <input onChange={(e) => setFirstName(e.target.value)} className="w-full text-black border rounded p-2 outline-none focus:shadow-outline" type="text" name="name" id="name" placeholder="Full name" />
          </div>
          <div className="text-left mb-4 md:w-full">
            <label className="block text-xs mb-1">Username</label>
            <input onChange={(e) => setUserName(e.target.value)} className="w-full text-black border rounded p-2 outline-none focus:shadow-outline" type="text" name="username" id="username" placeholder="Username" />
          </div>
          <div className="text-left mb-4 md:w-full">
            <label className="block text-xs mb-1">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} className="w-full text-black border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Email" />
          </div>
          <div className="text-left mb-6 md:w-full">
            <label className="block text-xs mb-1">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} className="w-full text-black border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" />
          </div>
          {err && <p className='text-center text-sm my-2 text-red-600'>{err}</p>}
          <button onClick={signUp} className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 my-3 rounded">Register</button>
          <br />
          <span>I have already account. </span>
          <Link className="text-blue-700 text-center  text-sm" to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register