import React from 'react';
import './preloader.css'; // Assuming you use CSS modules

const LoaderUI = () => {
    return (
        <main className="main h-screen w-screen flex justify-center items-center  bg-cover bg-center">
            <p className="text font-bold text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                CAREER GENIES
                <span className="preloader"></span>
            </p>
        </main>
    );
};

export default LoaderUI;
