import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to logout");
        }
    }
    return (
        <div className='sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-gray-100/80 shadow-sm transition-all duration-300'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
                <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate("/")}>
                    <h1 className='text-2xl font-extrabold tracking-tight text-gray-900'>
                        Opportu<span className='text-transparent bg-clip-text bg-gradient-to-r from-[#F83002] to-[#ff6038]'>Nex</span>
                    </h1>
                </div>
                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6 text-gray-700 text-sm md:text-base'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className='hover:text-[#6A38C2] transition-colors duration-200 font-medium'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='hover:text-[#6A38C2] transition-colors duration-200 font-medium'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='hover:text-[#6A38C2] transition-colors duration-200 font-medium'>Home</Link></li>
                                    <li><Link to="/jobs" className='hover:text-[#6A38C2] transition-colors duration-200 font-medium'>Jobs</Link></li>
                                    <li><Link to="/browse" className='hover:text-[#6A38C2] transition-colors duration-200 font-medium'>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button variant="ghost" className="font-semibold text-gray-700 hover:text-[#6A38C2] hover:bg-purple-50/50 rounded-full px-5">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-gradient-to-r from-[#6A38C2] to-[#5b30a6] hover:opacity-95 text-white font-medium shadow-md shadow-purple-500/20 hover:shadow-purple-500/30 rounded-full px-6 hover:scale-[1.02] transition-all duration-200">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-purple-500/20 hover:ring-purple-500/50 transition-all shadow-sm">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4 border border-gray-100 shadow-xl rounded-2xl bg-white/95 backdrop-blur-md">
                                    <div>
                                        <div className='flex items-center gap-3 pb-3 border-b border-gray-100'>
                                            <Avatar className="h-12 w-12 border border-purple-100">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            </Avatar>
                                            <div className='overflow-hidden'>
                                                <h4 className='font-semibold text-gray-900 truncate'>{user?.fullname}</h4>
                                                <p className='text-xs text-gray-500 truncate'>{user?.profile?.bio || user?.email}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col pt-3 gap-1 text-gray-700 text-sm font-medium'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Link to="/profile" className='flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-purple-50/80 hover:text-[#6A38C2] transition-all'>
                                                        <User2 className='w-4 h-4' />
                                                        <span>View Profile</span>
                                                    </Link>
                                                )
                                            }
                                            <button onClick={logoutHandler} className='flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50/80 transition-all text-left w-full'>
                                                <LogOut className='w-4 h-4' />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar