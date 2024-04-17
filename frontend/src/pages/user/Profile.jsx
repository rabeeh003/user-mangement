import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Axios from '@/components/utils/axios'
import { getUserDetails, updateProfile } from '@/redux/User'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Profile() {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user?.user)
  const { userDetails } = useSelector(state => state.user)
  console.log("user details :", userDetails);

  useEffect(() => {
    console.log("useEffect start");
    if (userDetails == undefined || userDetails == '') {
      console.log("User in before send data into get data.", user);
      dispatch(getUserDetails(user))
    }
  }, [])

  const [profile, setProfile] = useState('')
  const [profileImageURL, setProfileImageURL] = useState('');

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

  const update = () => {
    if (profile) {
      const data = new FormData();
      data.append("user", user)
      data.append("profile", profile)
      // Axios.put(BaseUrl + `profile/${user}`, data).then(res)
      dispatch(updateProfile({user, profile:data}))
    }
  }
  return (
    <div className='pt-10' >
      <div className='max-w-sm m-auto'>
        {profileImageURL ? (
          <img src={profileImageURL} className='rounded-full w-[200px] object-cover h-[200px] m-auto mb-4' alt="" />
        ) : (
          <img src={userDetails?.profile ? userDetails.profile : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} className='rounded-full w-[200px] object-cover h-[200px] m-auto mb-4' alt="" />
        )}
        <Label htmlFor="picture">Profile picture</Label>
        <Input onChange={handleFileChange} accept="image/*" id="picture" type="file" />
        {profile && <button onClick={update} className='bg-foreground text-background px-2 py-1 mt-3 rounded-sm font-semibold' >Update</button>}
      </div>
      <div className='text-left pt-4 max-w-sm m-auto'>
        <span className='mt-4'>Name</span>
        <h4 className='text-md border rounded-md px-5 py-2 bg-card'>{userDetails?.name}</h4>
      </div>
      <div className='text-left pt-4 max-w-sm m-auto'>
        <span>Email</span>
        <h4 className='text-md border rounded-md px-5 py-2 bg-card'>{userDetails.email}</h4>
      </div>
    </div>
  )
}

export default Profile