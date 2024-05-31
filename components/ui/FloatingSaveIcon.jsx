import { useResumeStore } from '@/app/store/ResumeStore';
import React from 'react';

const FloatingSaveIcon = () => {
    return (
        <div
            className={`fixed bottom-5 right-5 bg-white border border-gray-300 rounded-full p-3 shadow-md flex items-center justify-center z-50 transition-colors duration-300 `}
        >
            <div className='flex items-center justify-center'>
                <CloudUploadIcon />
                <p className=' text-sm ml-2'>
                    Saving
                </p>
            </div>

        </div>
    );
};

export default FloatingSaveIcon;


function CloudUploadIcon(props) {
    return (
        <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function CloudSaveIcon(props) {
    return (
        <svg
            className="w-12 h-12 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}