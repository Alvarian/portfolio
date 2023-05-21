import { animate } from "framer-motion";
import { FC, useEffect, useRef } from "react"

const Counter: FC<{duration: number, end: number}> = ({duration, end}) => {
    const nodeRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const node = nodeRef.current as HTMLElement | undefined;
      if (!node) return;
  
      const controls = animate(0, end, {
        duration,
        onUpdate(value) {
            node.textContent = `${Math.round(value)}`;
        }
      });
  
      return () => controls.stop();
    }, [0, end]);
  
    return <span ref={nodeRef} />;
}

export default Counter
