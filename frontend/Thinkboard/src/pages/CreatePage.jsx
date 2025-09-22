import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router'
import { Link } from 'react-router';
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f0f4f8] via-[#e8edf2] to-[#dfe6ee]'> {/* Gradient background similar to homepage */}
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 backdrop-blur-sm text-[#495C83] font-medium shadow-sm hover:shadow-md transition mb-6 border border-white/30'>
            <ArrowLeftIcon className='w-5 h-5'/>
            Back to Notes
          </Link>
          
          <div className='bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-white/30'>
            <div className='p-8'>
              <h2 className='text-3xl font-bold text-[#111f3a] mb-8 font-mono tracking-tighter'>
                Create New Note
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className='mb-6'>
                  <label className='block text-sm font-medium text-[#495C83] mb-2'>
                    Title
                  </label>
                  <input 
                    type="text" 
                    placeholder='Note Title' 
                    className='w-full px-4 py-3 rounded-xl bg-white/80 border border-white/40 focus:border-[#7A86B6] focus:ring-2 focus:ring-[#7A86B6]/20 transition placeholder-gray-400' 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className='mb-8'>
                  <label className='block text-sm font-medium text-[#495C83] mb-2'>
                    Content
                  </label>
                  <textarea 
                    placeholder='Write your note here...' 
                    className='w-full px-4 py-3 rounded-xl bg-white/80 border border-white/40 focus:border-[#7A86B6] focus:ring-2 focus:ring-[#7A86B6]/20 transition placeholder-gray-400 min-h-32' 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    className='flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#495C83] via-[#7A86B6] to-[#A8A4CE] text-white font-medium shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                        Creating...
                      </>
                    ) : (
                      "Create Note"
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage