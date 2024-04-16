import React from 'react'

function Register() {
  return (
    <div>
      <div className="flex ">
        <div className="w-full bg-card rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">Register</span>
          <form className="mb-4 text-left" action="/" method="post">
            <div className="mb-4 md:w-full">
              <label className="block text-xs mb-1">Name</label>
              <input className="w-full text-black border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Username or Email" />
            </div>
            <div className="mb-4 md:w-full">
              <label className="block text-xs mb-1">Email</label>
              <input className="w-full text-black border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Username or Email" />
            </div>
            <div className="mb-6 md:w-full">
              <label className="block text-xs mb-1">Password</label>
              <input className="w-full text-black border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" />
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" type="submit">Login</button>
          </form>
          <span>I have already account. </span>
          <a className="text-blue-700 text-center text-sm" href="/login">Login</a>
        </div>
      </div>
    </div>
  )
}

export default Register