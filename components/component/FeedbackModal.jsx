import React from 'react';
import { MdCancel } from "react-icons/md";

function FeedbackModal({ content, showModal, onClick, onClose }) {
    return (

        <div className={`absolute w-[500px] right-5 rounded-lg  p-6 shadow-lg bg-white z-40 ${showModal ? null : 'hidden'}`}>
            <MdCancel onClick={onClose} className=' cursor-pointer text-3xl absolute top-0 right-0'/>
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
            <div className='w-full mt-3 flex flex-col justify-center items-center'>
                <p className='text-xs text-center text-red-500'>Integrate the Pointers to Create a Better CV with the Genie</p>
                <button className='border bg-blue-900 hover:bg-blue-700 text-white w-52 h-12 rounded-lg my-2' onClick={onClick}>Create Now</button>
            </div>
        </div>
    )
}

export default FeedbackModal