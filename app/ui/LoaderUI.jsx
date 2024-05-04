import React from 'react';
import './preloader.css'; // Assuming you use CSS modules

const LoaderUI = () => {
    return (
        <main className="main h-screen w-screen flex justify-center items-center  bg-cover bg-center">
            <p className="text font-bold bg-gradient-to-r from-cyan-600 to-blue-900 bg-clip-text text-transparent text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                GENIES CAREER HUB
                <span className="preloader"></span>
            </p>
        </main>
    );
};

export default LoaderUI;
