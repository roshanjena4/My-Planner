import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { increment,decrement,reset } from '../Slice/CounterSlice';

function Counter() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.value)
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen z-[5] relative'>
        {counter}
        <button className='bg-blue-500 p-2 m-2' onClick={()=>dispatch(increment())}>Increment</button>
        <button className='bg-blue-500 p-2 m-2' onClick={()=>dispatch(decrement())}>Decrement</button>
      </div>
    </>
  )
}

export default Counter
