import React, { useState } from 'react'
import logo from '../assets/clipboard-tasks-svgrepo-com.svg'
import { useNavigate } from 'react-router-dom';
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
                    console.log('Signup Success:', result.payload);
                   
                } else {
                    toast.success("Signup failed")
                    console.error('Signup Failed:', result.error);
                }
            });
    }
    return (
        <div className="flex h-screen w-full items-center justify-center " >
            <ToastContainer theme="dark" />
            <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8 z-[5] ">
                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">
                        <img src={logo} width="100" alt="loading" />
                        <h1 className="mb-2 text-2xl"> My Planner </h1>
                        <span className="text-gray-300">Enter Details</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 text-lg">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="rounded-3xl border-none bg-yellow-100 bg-opacity-50 px-6 py-2 text-center text-black  placeholder-zinc shadow-lg outline-none backdrop-blur-md" placeholder="fullname" />
                        </div>
                        <div className="mb-4 text-lg">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-3xl border-none bg-yellow-100 bg-opacity-50 px-6 py-2 text-center text-black  placeholder-zinc shadow-lg outline-none backdrop-blur-md" placeholder="@email.com" />
                        </div>

                        <div className="mb-4 text-lg">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-3xl border-none bg-yellow-100 bg-opacity-50 px-6 py-2 text-center text-black placeholder-zinc shadow-lg outline-none backdrop-blur-md" placeholder="*********" />
                        </div>
                        <div className="mt-8 flex justify-center text-lg text-black">
                            <button type="submit" className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-black shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Signup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
