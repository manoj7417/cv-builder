import React from 'react'
import Lottie from 'lottie-react'
import animation from '@/public/animations/betterResumeLoder.json'

function NewResumeLoader() {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <Lottie animationData={animation}
                loop={true}
                style={{ height: "300px" }} />
            <p className='text-white text-2xl '>Rectifying your CV</p>
        </div>
    )
}   

export default NewResumeLoader