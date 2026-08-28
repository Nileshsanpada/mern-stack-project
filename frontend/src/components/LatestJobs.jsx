import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-12 md:my-20 px-4 sm:px-6 md:px-8'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight'>
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6'>
                {
                    allJobs.length <= 0 ? (
                        <div className='col-span-full text-center py-8 text-gray-500 font-medium'>No Job Available</div>
                    ) : (
                        allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs