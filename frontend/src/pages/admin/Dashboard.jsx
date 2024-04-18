import { UserTable } from '@/components/UserTable'
import { BaseUrl } from '@/components/const/urls';
import AxiosAdmin from '@/components/utils/axiosAdmin';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Dashboard() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const getData = async () => {
    setIsLoading(true)
    setError(null);
    try {
      const res = await axios.get(BaseUrl + "userall/");
      console.log("users", res.data);
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      {isLoading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <UserTable users={users} getData={()=>getData()} />
      )}
    </div>
  )
}

export default Dashboard