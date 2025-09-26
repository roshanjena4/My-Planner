import React, { useState } from 'react'
import logo from '../assets/clipboard-tasks-svgrepo-com.svg'
import { useNavigate,Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../Slice/UserSlice';


function Signup() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.userAuth)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup({ name, email, password }))
            .then((result) => {
                // debugger;
                if (result.meta.requestStatus === 'fulfilled') {
                    toast.success("Signup Success")
                    navigate('/');
                   
                } else {
                    toast.success("Signup failed")
                    console.error('Signup Failed:', result.error);
                }
            });
    }
    return (
        <div className="flex h-screen w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-transparent">
            <ToastContainer theme="dark" />
            <div className="rounded-3xl relative z-[5] w-full max-w-lg shadow-2xl overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(10,12,18,0.9), rgba(6,8,12,0.98))', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="p-10">
                    <div className="text-white">
                        <div className="mb-6 flex flex-col items-center">
                            <img src={logo} width="90" alt="loading" />
                            <h1 className="mb-1 text-2xl"> My Planner </h1>
                            <span className="text-gray-400">Enter Details</span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 text-lg">
                                <input type="text" value={name} required minLength={2} maxLength={20} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg bg-gray-900/60 px-4 py-2 text-center text-gray-100 placeholder:text-gray-500 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="fullname" />
                            </div>
                            <div className="mb-4 text-lg">
                                <input type="email" value={email} required minLength={5} maxLength={30} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg bg-gray-900/60 px-4 py-2 text-center text-gray-100 placeholder:text-gray-500 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="@email.com" />
                            </div>

                            <div className="mb-4 text-lg">
                                <input type="password" value={password} required minLength={5} maxLength={15} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg bg-gray-900/60 px-4 py-2 text-center text-gray-100 placeholder:text-gray-500 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="*********" />
                            </div>
                            <div className="mt-6 flex justify-center text-lg">
                                <button type="submit" className="rounded-full bg-amber-600 px-10 py-2 text-white shadow-md transition-colors duration-300 hover:bg-amber-500">Signup</button>
                            </div>
                        </form>
                        <Link to="/" className="mt-4 flex justify-center text-lg text-amber-400 hover:text-amber-600">
                            Already have an account? Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
