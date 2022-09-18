import { rateLimiters } from 'lib/sections/sections.methods';
import { useLayoutEffect, useState } from 'react';


export const useResize = () => {
  const [size, setSize] = useState([0, 0]);
  
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
  
    window.addEventListener('resize', rateLimiters.throttle(300, rateLimiters.debounce(300, updateSize)))
    
    updateSize();
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  return size;
}
