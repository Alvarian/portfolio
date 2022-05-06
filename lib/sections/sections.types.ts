type Nullable<T> = T | null;

export interface Content {
  alt: string,
  content: Nullable<{
    body: React.FC<any>,
    isFull: boolean
  }>,
  type: string,
  keyIcon: string,
  bgImageName: string
}

export const defaultVariants = { 
  fallLeft: (delay: number) => {
    return {
      hidden: {
        opacity: 0,
        x: "8vw",
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          delay, 
          duration: 3,
          ease: "easeInOut",
        }
      }
    }
  },
  fallUp: (delay: number) => {
    return {
      hidden: {
        opacity: 0,
        y: "8vh",
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay, 
          duration: 3,
          ease: "easeInOut",
        }
      }
    }
  }
}

export const svgVariant = {
  flip: (delay: number) => {
    return {
      hidden: { rotate: -180 },
      visible: { 
        rotate: 0,
        transition: {
          delay, duration: 3 }
      },
    }
  }
}

export const pathVariant = {
  draw: (delay: number) => {
    return {
      hidden: {
        opacity: 0,
        pathLength: 0,
      },
      visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
          delay, 
          duration: 3,
          ease: "easeInOut",
        }
      }
    }
  }
}
