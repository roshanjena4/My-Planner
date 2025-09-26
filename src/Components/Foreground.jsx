import React, { useState, useRef, useEffect } from 'react'
import Card from './Card'
import { MdOutlineAdd } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { ImPaypal } from "react-icons/im";
import { u } from 'motion/react-client';
import { useSelector, useDispatch } from 'react-redux';
import { AddTask } from '../Slice/TaskSlice';
import { logout } from '../Slice/UserSlice';
import { persistor } from "../store";
import { useNavigate } from 'react-router-dom';

function Foreground() {
    const navigate = useNavigate();
    const task = useSelector((state) => state.task.value)
    const { isPaid } = useSelector((state) => state.counter.value)
    const dispatch = useDispatch();
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [desc, setDesc] = useState("")



    const ref = useRef();

    const handleAddTask2 = () => {
       
    };

    const handleAddTask = () => {
        setIsFormOpen(true);
    };

    const handleLogout = () => {
        if (isPaid) {
            dispatch(logout());
            persistor.purge();
        } else {
            alert("Please complete the payment before logout.");
            navigate('/counter');
        }
    };

    // Close on Escape and lock body scroll when modal is open
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setIsFormOpen(false);
        };

        if (isFormOpen) {
            document.addEventListener('keydown', onKey);
            // lock body scroll
            const prevOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.removeEventListener('keydown', onKey);
                document.body.style.overflow = prevOverflow;
            };
        }

        return () => {};
    }, [isFormOpen]);


    const Addtask = () => {
        if (desc.trim() === "") {
            alert("Please enter a task.");
            return;
        }
        dispatch(AddTask([
            ...task,
            {
                id: Date.now(),
                title: "New Task",
                desc: desc,
                status: { Todo: true, InProgress: false, Done: false }
            }
        ]));
        setIsFormOpen(false);
        setDesc("");
    }


    return (
        <div ref={ref} className='fixed flex flex-col sm:flex-row justify-between items-end sm:items-start gap-5 flex-wrap top-0 left-0 w-full h-full z-[5] p-6'>
            <div className="w-full justify-between flex ">
                <MdOutlineAdd
                    className='text-amber-500'
                    style={{ cursor: 'pointer', zIndex: '1', fontSize: '30px' }}
                    onClick={handleAddTask}
                    onLongPress={handleAddTask2}
                />
                <AiOutlineLogout
                    className='text-amber-500'
                    style={{ cursor: 'pointer', zIndex: '1', fontSize: '30px' }}
                    onClick={handleLogout}
                />
            </div>
            {isFormOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center py-10 z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modalTitle"
                >
                    {/* Backdrop / dim + blur */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsFormOpen(false)}
                        aria-hidden="true"
                    />

                    <div
                        className="border border-gray-700 rounded-3xl relative z-[92] flex w-full max-w-[520px] flex-col overflow-hidden p-0 shadow-2xl max-h-[90vh]"
                        style={{
                            background: 'linear-gradient(180deg, rgba(10,12,18,0.9), rgba(6,8,12,0.98))',
                            boxShadow: '0 12px 40px rgba(2,6,23,0.7)',
                            transformStyle: 'preserve-3d',
                            backfaceVisibility: 'hidden',
                            transformOrigin: 'left center',
                        }}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                            <h3 id="modalTitle" className="text-xl font-bold text-white">Add Task</h3>
                            <button
                                type="button"
                                className="rounded-full p-2 text-gray-300 hover:bg-gray-800/60 hover:text-white focus:outline-none"
                                aria-label="Close"
                                onClick={() => setIsFormOpen(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            <div className="mx-auto max-w-[460px]">
                                <form
                                    className="flex flex-col"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        Addtask();
                                    }}
                                >
                                    <label htmlFor="judul" className="text-zinc-400 text-sm mb-2 block">Task Description</label>
                                    <textarea
                                        id="judul"
                                        name="judul"
                                        value={desc || ""}
                                        onChange={e => setDesc(e.target.value)}
                                        placeholder="Describe your task..."
                                        className="w-full rounded-lg bg-gray-900/60 p-3 text-gray-100 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-gray-400 mb-4"
                                        rows="5"
                                    />

                                    <button
                                        type="submit"
                                        className="mt-2 w-full rounded-full bg-amber-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-500"
                                    >
                                        Done
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {task.map((item) => (
                <Card key={item.id} reference={ref} data={item} />
            ))}

        </div>
    )
}

export default Foreground
