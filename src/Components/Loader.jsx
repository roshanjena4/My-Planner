import React from 'react'
import { BeatLoader } from "react-spinners";

function Loader() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <BeatLoader
                cssOverride={override}
                size={15}
                color={"#000"}
                loading={loading}
                speedMultiplier={1}
            />
        </div>
    )
}

export default Loader
