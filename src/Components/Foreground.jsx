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
    const [desc, setDesc] = useState()



    const ref = useRef();

    const handleAddTask = () => {
        if(isPaid) {
            setIsFormOpen(true);
        } else {
            alert("Please complete the payment before adding tasks.");
            navigate('/counter');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        persistor.purge();
    };


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
                />
                <AiOutlineLogout
                    className='text-amber-500'
                    style={{ cursor: 'pointer', zIndex: '1', fontSize: '30px' }}
                    onClick={handleLogout}
                />
            </div>
            {isFormOpen && (
                <div
                    className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 py-10 z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modalTitle"
                >
                    <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-[#1f1d1e]  shadow-lg">
                        <div className="relative w-full">
                            <button
                                type="button"
                                className="absolute right-10 top-0 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:text-gray-500 dark:hover:bg-[#272222] dark:hover:text-gray-300"
                                aria-label="Close"
                                onClick={() => setIsFormOpen(false)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="m-8 my-20 max-w-[400px] mx-auto">

                                <div className="mb-8">
                                    <h2 id="modalTitle" className="mb-4 text-3xl font-bold text-zinc-700 dark:text-white">Add Task</h2>
                                    <p className="text-zinc-500 font-medium dark:text-zinc-300">Fill out the description below.</p>
                                </div>

                                <form
                                    className="flex-col flex"
                                    onSubmit={e => {
                                        e.preventDefault();
                                        Addtask();
                                    }}
                                >
                                    <label htmlFor="judul" className="text-zinc-500 text-sm mb-1 dark:text-zinc-300">Task Description</label>
                                    <textarea
                                        id="judul"
                                        name="judul"
                                        value={desc || ""}
                                        onChange={e => setDesc(e.target.value)}
                                        className="w-full rounded-md bg-gray-100 p-2 text-gray-800 dark:bg-[#1f1d1e] dark:text-white dark:border-[#644e3c] border focus:outline-none focus:ring-2 focus:ring-[#644e3c]"
                                        rows="4"
                                    />

                                    <button
                                        type="submit"
                                        className="mt-4 w-full rounded-full bg-[#322a27] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#322a27]"
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
