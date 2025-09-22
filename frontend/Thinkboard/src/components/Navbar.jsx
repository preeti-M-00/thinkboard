import React from 'react'
import { Link } from 'react-router'
import { PlusIcon, SunIcon } from "lucide-react" // added SunIcon for theme toggle

const Navbar = () => {
  return (
    <header className='bg-white/10 border-b border-white/20 backdrop-blur-md sticky top-0 z-50'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>

          {/* Logo / Title with tagline */}
          <div className='flex flex-col md:flex-row md:items-center gap-1'>
            <div className='flex items-center gap-2'>
              {/* <img src="./assets/notes.webp" alt="logo" className="h-7 w-7" /> small icon */}
              <h1 className='text-3xl font-bold text-[#07183a] font-mono tracking-tighter drop-shadow-sm'>
                ThinkBoard
              </h1>
            </div>
            <p className='text-sm md:text-base font-semibold text-[#18234d] md:ml-2'>
  Organize your thoughts, effortlessly
</p>

          </div>

          {/* Right side buttons */}
          <div className='flex items-center gap-4'>
            {/* Theme toggle / optional profile icon
            <button className='p-2 rounded-full bg-white/10 hover:bg-white/20 transition'>
              <SunIcon className='h-5 w-5 text-[#495C83]' />
            </button> */}

            {/* Create Note Button */}
            <Link 
              to={"/create"} 
              className='flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#495C83] via-[#7A86B6] to-[#A8A4CE] text-white font-medium shadow-md hover:shadow-lg transition'
            >
              <PlusIcon className='h-5 w-5'/>
              <span>New Note</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar
