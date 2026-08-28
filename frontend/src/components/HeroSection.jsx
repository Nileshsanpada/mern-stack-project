import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center py-16 px-4 relative overflow-hidden bg-gradient-to-b from-purple-50/40 via-white to-white'>
            <div className='flex flex-col gap-6 max-w-4xl mx-auto items-center'>
                <span className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-red-500/10 border border-purple-500/20 text-[#F83002] font-semibold text-xs md:text-sm tracking-wide shadow-sm animate-pulse'>
                    🚀 No. 1 Job Hunt Website
                </span>
                <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight'>
                    Search, Apply & Get Your <br />
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] via-[#8c46ff] to-[#F83002]'>
                        Dream Jobs
                    </span>
                </h1>
                <p className='text-gray-600 text-base md:text-lg max-w-2xl font-normal leading-relaxed'>
                    Your path to success starts with seizing the right opportunity—unlock your potential and transform your career today.
                </p>
                
                <div className='w-full max-w-2xl mt-4'>
                    <div className='flex w-full bg-white shadow-xl shadow-purple-500/5 border border-gray-200/80 p-1.5 pl-5 rounded-full items-center gap-3 transition-all duration-300 focus-within:border-[#6A38C2] focus-within:ring-4 focus-within:ring-purple-500/10'>
                        <input
                            type="text"
                            placeholder='Find your dream jobs by title, skill, or company...'
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                            className='outline-none border-none w-full text-gray-800 text-sm md:text-base placeholder:text-gray-400 bg-transparent'
                        />
                        <Button 
                            onClick={searchJobHandler} 
                            className="rounded-full bg-gradient-to-r from-[#6A38C2] to-[#5b30a6] hover:opacity-95 text-white h-11 w-11 md:w-auto md:px-6 flex items-center justify-center gap-2 shadow-md shadow-purple-500/30 transition-all hover:scale-[1.03]"
                        >
                            <Search className='h-5 w-5' />
                            <span className='hidden md:inline font-medium text-sm'>Search</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection