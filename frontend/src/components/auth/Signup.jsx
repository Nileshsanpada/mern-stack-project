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
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
        } finally{
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
                <form onSubmit={submitHandler} className='w-full max-w-lg bg-white border border-gray-100/80 rounded-2xl p-8 shadow-xl shadow-purple-500/5 transition-all duration-300'>
                    <div className='text-center mb-8'>
                        <h1 className='font-extrabold text-2xl text-gray-900 tracking-tight'>Create Your Account</h1>
                        <p className='text-sm text-gray-500 mt-1'>Join Opportunex to discover opportunities or hire talent</p>
                    </div>

                    <div className='space-y-4'>
                        <div className='space-y-1.5'>
                            <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Full Name</Label>
                            <Input
                                type="text"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeEventHandler}
                                placeholder="John Doe"
                                className="h-11 rounded-lg border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]/20 transition-all text-sm"
                                required
                            />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='space-y-1.5'>
                                <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Email Address</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="john@example.com"
                                    className="h-11 rounded-lg border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]/20 transition-all text-sm"
                                    required
                                />
                            </div>

                            <div className='space-y-1.5'>
                                <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Phone Number</Label>
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="9876543210"
                                    className="h-11 rounded-lg border-gray-200 focus:border-[#6A38C2] focus:ring-[#6A38C2]/20 transition-all text-sm"
                                    required
                                />
                            </div>
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
                            <RadioGroup className="grid grid-cols-2 gap-3 mb-4">
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

                        <div className='space-y-1.5'>
                            <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Profile Photo (Optional)</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="h-11 rounded-lg border-gray-200 file:bg-purple-50 file:text-[#6A38C2] file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 file:text-xs file:font-semibold hover:file:bg-purple-100 cursor-pointer text-xs text-gray-500 pt-2"
                            />
                        </div>
                    </div>

                    {
                        loading ? (
                            <Button disabled className="w-full h-11 my-6 rounded-xl bg-[#6A38C2]">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Creating account...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full h-11 my-6 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#5b30a6] hover:opacity-95 text-white font-semibold shadow-md shadow-purple-500/20 hover:scale-[1.01] transition-all">
                                Create Account
                            </Button>
                        )
                    }

                    <p className='text-center text-sm text-gray-500'>
                        Already have an account? <Link to="/login" className='font-semibold text-[#6A38C2] hover:underline'>Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup