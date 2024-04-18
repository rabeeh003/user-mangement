import React, { useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AxiosAdmin from './utils/axiosAdmin';
import { BaseUrl } from './const/urls';
import { Input } from './ui/input';
import axios from 'axios';

export function UserTable({ users, getData }) {
    console.log("users", users);
    // buttons
    const [editModalContent, setEditModalContent] = useState(null);
    const [deleteUser, setDeleteUser] = useState()
    const [addUserBtn, setAddUserBtn] = useState()

    // data
    const [username, setUsername] = useState()
    const [first_name, setFirst_name] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [profile, setProfile] = useState('')
    const [profileImageURL, setProfileImageURL] = useState('');

    const [err,setErr] =useState()

    const updateUser = async () => {
        const data = new FormData()
        if (username) {
            data.append("username", username);
        }
        if (first_name) {
            data.append("first_name", first_name);
        }
        if (email) {
            data.append("email", email);
        }
        try {
            const res = await AxiosAdmin.patch(BaseUrl + `user/update/${editModalContent.user.id}/`, data)
            console.log("res", res);
            getData()
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUserFun = async () => {
        const data = new FormData()
        if (username) {
            data.append("username", username);
        }
        if (first_name) {
            data.append("first_name", first_name);
        }
        if (email) {
            data.append("email", email);
        }
        try {
            const res = await AxiosAdmin.delete(BaseUrl + `user/delete/${deleteUser}/`)
            console.log("res", res);
            setDeleteUser('')
            getData()
        } catch (error) {
            console.log(error);
        }
    }

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

    const addUser = async () => {
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
                        setAddUserBtn('')
                        getData()
                    })
                    .catch(err => console.log("profile error:", err));
            })
            .catch(err => console.log("signUp error:", err));
        }else{
            setErr('All fields are required !')
        }
    }
    return (
        <div className="absolute w-[100vw] h-[90vh]">
            <div >
                <button onClick={() => setAddUserBtn(1)} className='m-auto bg-blue-500 font-md rounded-sm text-white px-4 py-1 my-2 mx-1'>Add User</button>
            </div>
            <div className='overflow-x-auto'>
                <table className="container mt-3 w-[100vw] rounded-sm shadow-md">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Index</th>
                            <th className="px-4 py-2">Profile</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">
                                    <img
                                        src={
                                            user?.profile
                                                ? user.profile
                                                : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                                        }
                                        className="rounded-full w-[50px] object-cover h-[50px] m-auto"
                                        alt="profile"
                                    />
                                </td>
                                <td className="border px-4 py-2">{user.user.first_name}</td>
                                <td className="border px-4 py-2">{user.user.username}</td>
                                <td className="border px-4 py-2">{user.user.email}</td>
                                <td className="border px-4 py-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <EllipsisVertical />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <button onClick={() => {
                                                    setEditModalContent(user)
                                                    setEmail(user.user.email)
                                                    setFirst_name(user.user.first_name)
                                                    setUsername(user.user.username)
                                                }}>
                                                    Edit
                                                </button>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <button onClick={() => {
                                                    setDeleteUser(user.user.id)
                                                }}>
                                                    Delete
                                                </button>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editModalContent && (
                <div className={`h-[90vh] w-[100vw] top-0 right-0 bg-gray-500 bg-opacity-80 absolute flex justify-center items-center`}>
                    <div className='w-[80%] md:max-w-[500px] p-3 rounded-sm bg-card flex-col'>
                        <div className='bg-background border-b px-2 py-2 flex justify-between'>
                            <span className='text-xl font-semibold'>Edit</span>
                            <button onClick={() => setEditModalContent('')} className='font-mono text-xl font-semibold'>X</button>
                        </div>
                        <div>
                            <span>Name</span>
                            <br />
                            <input onChange={(e) => setFirst_name(e.target.value)} className='bg-gray-300 text-black rounded-sm py-2 px-2' type="text" value={first_name} />
                        </div>
                        <div>
                            <span>Username</span>
                            <br />
                            <input onChange={(e) => setUsername(e.target.value)} className='bg-gray-300 text-black rounded-sm py-2 px-2' type="text" value={username} />
                        </div>
                        <div>
                            <span>Email</span>
                            <br />
                            <input onChange={(e) => setEmail(e.target.value)} className='bg-gray-300 text-black rounded-sm py-2 px-2' type="text" value={email} />
                        </div>
                        <div className='bg-background border-t mt-3 pt-2'>
                            <button onClick={() => updateUser()} className='m-auto bg-blue-500 font-md rounded-sm text-white px-4 py-1'>Edit</button>
                        </div>
                    </div>
                </div>
            )}
            {deleteUser && (
                <div className={`h-[90vh] w-[100vw] top-0 right-0 bg-gray-500 bg-opacity-80 absolute flex justify-center items-center`}>
                    <div className='w-[80%] md:max-w-[500px] p-3 rounded-sm bg-card flex-col'>
                        <div className='bg-background border-b flex justify-between'>
                            <span className='text-xl font-semibold'>Delete</span>
                            <button onClick={() => setDeleteUser('')} className='font-mono text-xl font-semibold'>X</button>
                        </div>
                        <p className='mt-3'>Are you sure you want to delete this Delete User?</p>
                        <div className='bg-background border-t mt-3 px-2 py-2'>
                            <button onClick={() => setDeleteUser()} className='m-auto bg-gray-400 font-md rounded-sm text-white px-4 py-1 mx-2'>Cancel</button>
                            <button onClick={() => deleteUserFun()} className='m-auto bg-red-800 font-md rounded-sm text-white px-4 py-1 mx-2'>Delete</button>
                        </div>
                    </div>
                </div>
            )}
            {addUserBtn && (
                <div className={`h-[90vh] w-[100vw] top-0 right-0 bg-gray-500 bg-opacity-80 absolute flex justify-center items-center`}>
                    <div className='w-[80%] md:max-w-[500px] p-3 rounded-sm bg-card flex-col'>
                        <div className='bg-background px-2 py-2 border-b flex justify-between'>
                            <span className='text-xl font-semibold'>Register</span>
                            <button onClick={() => setAddUserBtn('')} className='font-mono text-xl font-semibold'>X</button>
                        </div>
                        <div className='max-w-sm m-auto'>
                            <img width={100} src={profileImageURL ? profileImageURL : "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"} className='rounded-full object-cover m-auto' alt="" />
                            <label >Profile picture</label>
                            <Input id="picture" onChange={handleFileChange} type="file" />
                        </div>
                        <div>
                            <div className="text-left mb-6 md:w-full">
                                <label className="block text-xs mb-1">Name</label>
                                <input onChange={(e) => setFirst_name(e.target.value)} className="w-full text-black border rounded p-2 outline-none focus:shadow-outline" type="text" name="name" id="name" placeholder="Full name" />
                            </div>
                            <div className="text-left mb-4 md:w-full">
                                <label className="block text-xs mb-1">Username</label>
                                <input onChange={(e) => setUsername(e.target.value)} className="w-full text-black border rounded p-2 outline-none focus:shadow-outline" type="text" name="username" id="username" placeholder="Username" />
                            </div>
                            <div className="text-left mb-4 md:w-full">
                                <label className="block text-xs mb-1">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} className="w-full text-black border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Email" />
                            </div>
                            <div className="text-left mb-6 md:w-full">
                                <label className="block text-xs mb-1">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} className="w-full text-black border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" />
                            </div>
                        </div>
                        {err && <p className='text-center text-red-600'>{err}</p>}
                        <div className='bg-background border-t mt-3 px-2 py-2'>
                            <button onClick={() => addUser()} className='m-auto bg-blue-500 font-md rounded-sm text-white px-4 py-1 mx-2'>Add User</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


// export default UserTable;
