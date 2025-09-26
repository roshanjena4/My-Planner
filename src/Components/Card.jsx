import React, { useState, useEffect } from 'react'
import { FaRegFileLines } from "react-icons/fa6";
import { MdFileDownloadDone } from "react-icons/md";
import { motion } from "motion/react"
import { UpdateTask } from '../Slice/TaskSlice';
import { useDispatch, useSelector } from 'react-redux';

function Card({ data, reference }) {
    // console.log(data);
    const dispatch = useDispatch();
    const task = useSelector((state)=> state.task.value)
    const [currentTask, setCurrentTask] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    // close on Escape and lock body scroll while modal is open
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setIsModalOpen(false);
        };

        if (isModalOpen) {
            document.addEventListener('keydown', onKey);
            const prevOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.removeEventListener('keydown', onKey);
                document.body.style.overflow = prevOverflow;
            };
        }

        return () => {};
    }, [isModalOpen]);
    const handleOpenModal = (task) => {
        setIsModalOpen(true);
        setCurrentTask(task);
        // console.log(task);

    }

    const updateTaskStart = () => {
        const updatedTask = {
            ...currentTask,
            status: {
                Todo: false,
                InProgress: true,
                Done: false
            }
        };
        dispatch(UpdateTask(updatedTask));
        setIsModalOpen(false);
    }

    const updateTaskDone = () => {
        const updatedTask = {
            ...currentTask,
            status: {
                Todo: false,
                InProgress: false,
                Done: true
            }
        };
        dispatch(UpdateTask(updatedTask));
        setIsModalOpen(false);
    }


    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center py-10 z-50" role="dialog" aria-modal="true" aria-labelledby="updateModalTitle">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} aria-hidden="true" />

                    <div className="relative z-[92] w-full max-w-[520px] rounded-3xl shadow-2xl overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(10,12,18,0.9), rgba(6,8,12,0.98))', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
                            <h3 id="updateModalTitle" className="text-lg font-bold text-white">Update status</h3>
                            <button type="button" className="rounded-full p-2 text-gray-300 hover:bg-gray-800/60 hover:text-white focus:outline-none" aria-label="Close" onClick={() => setIsModalOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <div className="mx-auto max-w-[460px]">
                                <p className="text-gray-200 mb-6">{currentTask.desc}</p>

                                <div className="flex gap-4">
                                    <button className="flex-1 p-3 bg-gray-300 rounded-full text-black font-semibold hover:bg-gray-200" onClick={updateTaskStart}>Start</button>
                                    <button className="flex-1 p-3 bg-emerald-500 rounded-full text-white font-semibold hover:bg-emerald-400" onClick={updateTaskDone}>Done</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <motion.div key={data.id} drag dragConstraints={reference} whileDrag={{ scale: 1.1 }} dragElastic={0.1} dragTransition={{
                bounceStiffness: 100, bounceDamping: 10
            }} className="relative flex-shrink-0 w-60 h-72 rounded-[40px] px-8 py-10 bg-zinc-900/90 overflow-hidden"
                onDoubleClick={() => handleOpenModal(data)}>
                <div className="content">
                    <div className="flex items-center space-x-2">
                        <FaRegFileLines color="white" size="1.5em" />
                        <span className="text-white text-md leading-tight font-semibold">{data.title}</span>
                    </div>
                    <p className="text-white text-sm leading-tight mt-5">
                        {data.desc}
                    </p>
                </div>
                {!data.status.Todo && (
                    <div className="footer absolute bottom-0 left-0 w-full h-13">
                        {data.status.InProgress && (<div className='flex justify-between items-center text-white px-8 mb-3 py-5 bg-blue-600'>
                            <h4 className='text-sm text-white font-semibold'>Progress</h4>
                            <span className='w-26 h-5 flex justify-center items-center '>
                                <div className="w-full h-2 overflow-hidden rounded-full bg-gray-200">
                                    <div className="h-full w-2/3 rounded-full bg-green-500"></div>
                                </div>
                            </span>
                        </div>)}
                        {data.status.Done && (<div className="tag w-full py-4 bg-green-500 flex justify-between items-center px-8 mb-3">
                            <h3 className='text-sm text-white font-semibold'>Completed</h3>
                            <MdFileDownloadDone color='white' />
                        </div>)}
                    </div>
                )}
            </motion.div>
        </>
    )
}

export default Card
