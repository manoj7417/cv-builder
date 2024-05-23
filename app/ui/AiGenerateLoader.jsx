import Lottie from 'lottie-react'
import React from 'react'
import animation from '@/public/animations/aiGenerate.json'

function AiGenerateLoader() {
    return (
        <div className=''>
            <Lottie animationData={animation}
                loop={true}
                style={{ height: "200px" }} />
        </div>
    )
}

export default AiGenerateLoader