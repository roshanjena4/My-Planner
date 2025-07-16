import React from 'react'

function Background() {
    return (
        <>
        <div className='fixed w-full h-screen z-[4]'>
            <div className='w-full py-10 flex justify-center items-center text-zinc-600 font-semibold text-xl top-[5%]'>
                My Plans
            </div>
            <h1 className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[13vw] leading-none tracking-tighter text-zinc-900 font-semibold' >Task.</h1>
        </div>

        </>
    )
}

export default Background
