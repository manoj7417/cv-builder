// hooks/useWindowSize.js
import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 500,
    height: 500*1.41,
  });

  useEffect(() => {
    const handleResize = () => {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        const aspectRatio = 210 / 297; // Width / Height for A4
  
        const newWidth = windowHeight * aspectRatio;
  
        setWindowSize({
          width: newWidth,
          height: windowHeight,
        });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
