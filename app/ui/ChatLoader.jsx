import Lottie from 'lottie-react'
import React from 'react'
import animation from '@/public/animations/ChatLoader.json'

function ChatLoader() {
    return (
        <div className=''>
            <Lottie animationData={animation}
                loop={true}
                style={{ height: "50px" }} />
        </div>
    )
}

export default ChatLoader