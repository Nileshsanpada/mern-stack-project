import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 sm:px-6 my-6'>
                <div className='bg-white border border-gray-200/80 shadow-md shadow-purple-500/5 rounded-2xl p-6 sm:p-8'>
                    <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-4'>
                        <div className='flex items-center gap-4'>
                            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border border-purple-100 shadow-sm">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt={user?.fullname} />
                            </Avatar>
                            <div>
                                <h1 className='font-bold text-lg sm:text-xl text-gray-900'>{user?.fullname}</h1>
                                <p className='text-sm text-gray-500 mt-0.5'>{user?.profile?.bio || "No bio added yet"}</p>
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} className="self-start sm:self-auto rounded-xl hover:bg-purple-50 hover:text-[#6A38C2] transition-all" variant="outline"><Pen className='w-4 h-4 mr-1' /> Edit</Button>
                    </div>

                    <div className='my-6 space-y-2 text-sm text-gray-600'>
                        <div className='flex items-center gap-3'>
                            <Mail className='w-4 h-4 text-purple-600' />
                            <span>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <Contact className='w-4 h-4 text-purple-600' />
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>

                    <div className='my-6'>
                        <h2 className='font-semibold text-sm text-gray-900 mb-2'>Skills</h2>
                        <div className='flex flex-wrap gap-2'>
                            {
                                user?.profile?.skills && user?.profile?.skills.length > 0 ? (
                                    user?.profile?.skills.map((item, index) => <Badge key={index} className="bg-purple-50 text-[#6A38C2] border-purple-200 hover:bg-purple-100">{item}</Badge>)
                                ) : <span className='text-sm text-gray-400'>No skills added</span>
                            }
                        </div>
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5 pt-2 border-t border-gray-100'>
                        <Label className="text-sm font-bold text-gray-900">Resume</Label>
                        {
                            user?.profile?.resume ? (
                                <a target='_blank' rel="noreferrer" href={user?.profile?.resume} className='text-purple-600 text-sm hover:underline cursor-pointer font-medium truncate block'>
                                    📄 {user?.profile?.resumeOriginalName || "Download Resume"}
                                </a>
                            ) : <span className='text-sm text-gray-400'>No resume uploaded</span>
                        }
                    </div>
                </div>

                <div className='bg-white border border-gray-200/80 shadow-md shadow-purple-500/5 rounded-2xl p-6 sm:p-8 mt-6'>
                    <h1 className='font-bold text-lg text-gray-900 mb-4'>Applied Jobs</h1>
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile