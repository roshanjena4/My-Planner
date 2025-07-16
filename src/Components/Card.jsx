import React, { useState } from 'react'
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
                <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 bg-opacity-50 py-10 z-50">
                    <div className="relative max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl dark:bg-[#1f1d1e]">
                        <button
                            type="button"
                            className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:text-gray-500 dark:hover:bg-[#272222] dark:hover:text-gray-300"
                            aria-label="Close"
                            onClick={() => setIsModalOpen(false)}
                        >✕</button>
                        <div className="w-full">
                            <div className="m-8 my-20 max-w-[400px] mx-auto">
                                <div className="mb-8">
                                    <h1 className="mb-4 text-3xl font-bold text-white">Update status</h1>
                                    <p className="text-white font-medium">{currentTask.desc}</p>
                                </div>
                                <div className="flex gap-4">
                                    <button className="p-3 bg-[#b1b0ca] rounded-full text-black w-1/2 font-semibold" onClick={updateTaskStart}>Start</button>
                                    <button className="p-3 bg-[#919d6c] rounded-full text-black w-1/2 font-semibold" onClick={updateTaskDone}>Done</button>
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
