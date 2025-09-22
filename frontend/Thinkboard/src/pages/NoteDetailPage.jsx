import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const NoteDetailPage = () => {
  const [note,setNote] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(() =>{
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      }
      finally{
        setLoading(false);
      }
    }

    fetchNote();
  },[id])

  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note",error);
      toast.error("Failed to delete note");
    }
  }

  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`,note)
      toast.success("Note updated successfully");
    } catch (error) {
      console.log("Error saving the note",error);
      toast.error("Failed to update note");
    }
    finally{
      setSaving(false);
    }
  } 

  if(loading){
    return (
      <div className='min-h-screen bg-gradient-to-br from-[#f0f4f8] via-[#e8edf2] to-[#dfe6ee] flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10 text-[#495C83]'/>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f0f4f8] via-[#e8edf2] to-[#dfe6ee]'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          {/* Header with navigation */}
          <div className='flex items-center justify-between mb-8'>
            <Link to="/" className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 backdrop-blur-sm text-[#495C83] font-medium shadow-sm hover:shadow-md transition border border-white/30'>
              <ArrowLeftIcon className='h-5 w-5'/>
              Back to Notes
            </Link>
            <button 
              onClick={handleDelete} 
              className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/90 text-white font-medium shadow-sm hover:shadow-md hover:bg-red-600/90 transition backdrop-blur-sm border border-red-300/30'
            >
              <Trash2Icon className='h-5 w-5'/>
              Delete Note
            </button>
          </div>

          {/* Note Editor Card */}
          <div className='bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-white/30'>
            <div className='p-8'>
              {/* Title Input */}
              <div className="mb-6">
                <label className='block text-sm font-medium text-[#495C83] mb-3'>
                  Title
                </label>
                <input 
                  type="text"
                  placeholder='Note Title'
                  className='w-full px-4 py-3 rounded-xl bg-white/80 border border-white/40 focus:border-[#7A86B6] focus:ring-2 focus:ring-[#7A86B6]/20 transition placeholder-gray-400 text-[#111f3a] font-medium'
                  value={note.title}
                  onChange={(e)=> setNote({...note,title:e.target.value})}
                />
              </div>

              {/* Content Textarea */}
              <div className="mb-8">
                <label className='block text-sm font-medium text-[#495C83] mb-3'>
                  Content
                </label>
                <textarea 
                  placeholder='Write your note here...'
                  className='w-full px-4 py-3 rounded-xl bg-white/80 border border-white/40 focus:border-[#7A86B6] focus:ring-2 focus:ring-[#7A86B6]/20 transition placeholder-gray-400 text-[#111f3a] min-h-48 resize-vertical'
                  value={note.content}
                  onChange={(e)=> setNote({...note,content:e.target.value})}
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button 
                  className='flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#495C83] via-[#7A86B6] to-[#A8A4CE] text-white font-medium shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed'
                  disabled={saving} 
                  onClick={handleSave}
                >
                  {saving ? (
                    <>
                      <LoaderIcon className='w-4 h-4 animate-spin'/>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage