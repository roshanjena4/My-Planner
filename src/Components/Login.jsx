import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, logout } from '../Slice/UserSlice';
import React, { useState,useEffect } from 'react';
import logo from '../assets/clipboard-tasks-svgrepo-com.svg'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, user, loading, error } = useSelector(state => state.userAuth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAsync({ email, password }))
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    toast.success("Login Success");
                    navigate('/task');
                }
                else{
                    toast.error("Login failed");
                }
            })
            .catch((err) => {
                console.error("Login failed:", err);
            });
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        } else {
            navigate('/task');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <div className="flex h-screen w-full items-center justify-center " >
                <ToastContainer theme='dark'/>
                <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8 z-[5] ">
                    <div className="text-white">
                        <div className="mb-8 flex flex-col items-center">
                            <img src={logo} width="100" alt="loading" />
                            <h1 className="mb-2 text-2xl"> My Planner </h1>
                            <span className="text-gray-300">Enter Login Details</span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 text-lg">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-3xl border-none bg-yellow-100 bg-opacity-50 px-6 py-2 text-center text-black  placeholder-zinc shadow-lg outline-none backdrop-blur-md" placeholder="@email.com" />
                            </div>

                            <div className="mb-4 text-lg">
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-3xl border-none bg-yellow-100 bg-opacity-50 px-6 py-2 text-center text-black placeholder-zinc shadow-lg outline-none backdrop-blur-md" placeholder="*********" />
                            </div>
                            <div className="mt-8 flex justify-center text-lg text-black">
                                <button type="submit" className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-black shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>
                            </div>
                        </form>
                        <Link to="/signup" className="mt-4 flex justify-center text-lg text-yellow-400 hover:text-yellow-600">
                            Don't have an account? Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
