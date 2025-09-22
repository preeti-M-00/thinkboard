import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({ note, setNotes }) => {
    const handleDelete = async (e, id) => {
        e.preventDefault(); // prevent navigation

        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`)
            setNotes(prev => prev.filter(note => note._id !== id))
            toast.success("Note deleted successfully")
        } catch (error) {
            console.log("Error in deleting the note", error);
            toast.error("Failed to delete note");
        }
    }

    return (
        <Link to={`/note/${note._id}`}
            className='group bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-lg 
                       border border-white/30 rounded-2xl shadow-2xl hover:shadow-3xl 
                       transition-all duration-300 hover:scale-[1.02] hover:from-white/50 
                       hover:to-white/30 relative overflow-hidden'>
            
            {/* Subtle accent gradient edge */}
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#495C83] via-[#7A86B6] to-[#A8A4CE]'></div>
            
            <div className='p-6 relative z-10'>
                <h3 className='font-bold text-[#111f3a] text-xl mb-3 line-clamp-2 
                              group-hover:text-[#2a3a5a] transition-colors drop-shadow-sm'>
                    {note.title}
                </h3>
                <p className='text-[#2a3a5a] text-sm leading-relaxed line-clamp-3 mb-4 
                            font-medium drop-shadow-sm whitespace-pre-wrap'>
                    {note.content}
                </p>
                <div className='flex justify-between items-center pt-4 border-t border-white/50'>
                    <span className='text-xs text-[#495C83] font-semibold bg-white/30 px-2 py-1 rounded-full'>
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 rounded-full bg-white/40 hover:bg-white/60 
                                      transition-all group-hover:scale-110'>
                            <PenSquareIcon className='w-4 h-4 text-[#495C83]'/>
                        </div>
                        <button 
                            className='p-2 rounded-full bg-white/40 hover:bg-red-50 
                                     transition-all group-hover:scale-110'
                            onClick={(e) => handleDelete(e, note._id)}
                        >
                            <Trash2Icon className='w-4 h-4 text-red-500 hover:text-red-700 transition-colors'/>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Subtle shimmer effect on hover */}
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000'></div>
        </Link>
    )
}

export default NoteCard