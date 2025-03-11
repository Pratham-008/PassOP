import React from 'react'
import { href } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-green-500 justify-around flex  w-full text-black'>
      <div className='logo my-3 p-2 text-2xl font-bold '>
        <span className='text-green-800'>&lt;</span>Pass
        <span className='text-green-800'>OP/&gt;</span>
      </div>
      <button onClick={()=>window.open("https://github.com","_blank")} className='hover:border-white group border border-green-600 flex my-3 rounded-full text-xl p-2 relative bg-green-600 '>
        <img src='/icons/github.svg' className='w-9 '/>
        <span className='px-2 items-center'>GitHub</span>
      </button>
    </nav>
  )
}

export default Navbar
