import React from 'react'

function Home() {
  return (
    <div>
      <div className="container mx-4 my-4">
        <div className="w-64 bg-accent border">
          <img src="https://via.placeholder.com/150" className="w-full" alt="..." />
          <div className="p-4">
            <h5 className="text-sm text-gray-500 font-bold tracking-widest mb-2 uppercase">Hello World</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, rem.</p>
            <a href="#" className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 inline-block mt-4 rounded">Read more</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home