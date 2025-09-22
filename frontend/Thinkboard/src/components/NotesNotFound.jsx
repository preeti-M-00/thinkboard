import { NotebookIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const NotesNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
      {/* Icon Circle */}
      <div className='bg-white/30 backdrop-blur-md rounded-full p-8 shadow-sm'>
        <NotebookIcon className='h-10 w-10 text-[#495C83]' />
      </div>

      {/* Title */}
      <h3 className='text-2xl font-bold text-[#111f3a]'>
        No Notes yet
      </h3>

      {/* Subtitle */}
      <p className='text-white/80 drop-shadow-sm'>
        Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>

      {/* Button */}
      <Link 
        to="/create" 
        className='px-6 py-3 rounded-xl bg-gradient-to-r from-[#495C83] via-[#7A86B6] to-[#A8A4CE] text-white font-medium shadow-md hover:shadow-lg transition'
      >
        Create your first Note
      </Link>
    </div>
  )
}

export default NotesNotFound
