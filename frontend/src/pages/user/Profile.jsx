import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

function Profile() {

  const [profile, setProfile] = useState('')
  return (
    <div className='pt-10' >
      <div className='max-w-sm m-auto'>
        <img width={100} src={profile ? profile : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} className='rounded-full m-auto pb-4' alt="" />
        <Label htmlFor="picture">Profile picture</Label>
        <Input id="picture" type="file" />
      </div>
      <div className='text-left pt-4 max-w-sm m-auto'>
        <span className='mt-4'>Name</span>
        <h4 className='text-md border rounded-md px-5 py-2 bg-card'>user name</h4>
      </div>
      <div className='text-left pt-4 max-w-sm m-auto'>
        <span>Email</span>
        <h4 className='text-md border rounded-md px-5 py-2 bg-card'>user name</h4>
      </div>
    </div>
  )
}

export default Profile