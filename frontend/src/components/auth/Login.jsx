import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className='min-h-screen bg-slate-50/50 flex flex-col justify-between'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-12 w-full flex-1'>
                <form onSubmit={submitHandler} className='w-full max-w-md bg-white border border-gray-100/80 rounded-2xl p-8 shadow-xl shadow-purple-500/5 transition-all duration-300'>
                    <div className='text-center mb-8'>
                        <h1 className='font-extrabold text-2xl text-gray-900 tracking-tight'>Welcome Back</h1>
                        <p className='text-sm text-gray-500 mt-1'>Log in to access your Opportunex dashboard</p>
                    </div>

                    <div className='space-y-4'>
                        <div className='space-y-1.5'>
                            <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Email Address</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="name@example.com"
                                className="h-11 rounded-lg border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]/20 transition-all text-sm"
                                required
                            />
                        </div>

                        <div className='space-y-1.5'>
                            <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className="h-11 rounded-lg border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]/20 transition-all text-sm"
                                required
                            />
                        </div>

                        <div className='pt-2'>
                            <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2 block">I am a</Label>
                            <RadioGroup className="grid grid-cols-2 gap-3">
                                <label className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all ${input.role === 'student' ? 'border-[#6A38C2] bg-purple-50/60 text-[#6A38C2] shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="sr-only"
                                    />
                                    <span>🎓 Student</span>
                                </label>
                                <label className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all ${input.role === 'recruiter' ? 'border-[#6A38C2] bg-purple-50/60 text-[#6A38C2] shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="sr-only"
                                    />
                                    <span>💼 Recruiter</span>
                                </label>
                            </RadioGroup>
                        </div>
                    </div>

                    {
                        loading ? (
                            <Button disabled className="w-full h-11 my-6 rounded-xl bg-[#6A38C2]">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Logging in...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full h-11 my-6 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#5b30a6] hover:opacity-95 text-white font-semibold shadow-md shadow-purple-500/20 hover:scale-[1.01] transition-all">
                                Login to Account
                            </Button>
                        )
                    }

                    <p className='text-center text-sm text-gray-500'>
                        Don't have an account? <Link to="/signup" className='font-semibold text-[#6A38C2] hover:underline'>Create one</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login