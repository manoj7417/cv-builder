import Lottie from 'lottie-react'
import React from 'react'
import animation from '@/public/animations/Loader.json'

function Loader() {
    return (
        <div className='h-screen w-screen bg-black bg-opacity-80 flex flex-col items-center justify-center fixed z-50 top-0'>
            <Lottie animationData={animation}
                loop={true}
                style={{ height: "300px" }} />
            <h1 className='text-2xl text-white tracking-wider'>Analysing your CV with <span className='text-3xl font-bold text-purple-500 mx-1'> AI</span> </h1>
        </div>
    )
}

export default Loader