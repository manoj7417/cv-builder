import React from 'react'

function FeedbackModal({ content, className }) {
    return (

        <div className={`absolute w-[400px] rounded-lg  p-6 shadow-lg bg-white z-50 ${className}`}>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pointers</h3>
                <ul className="space-y-2">
                    {
                        content?.length > 0 && content.map((item, index) => {
                            return <li key={index} className=' text-xs flex items-start'>
                                <span className=' flex justify-center items-center rounded-full mr-3 font-bold'>{index + 1}.</span>
                                {item}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default FeedbackModal