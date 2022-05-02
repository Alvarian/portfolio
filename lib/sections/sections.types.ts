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
  fallLeft: (duration: number) => {
    return {
      hidden: {
        opacity: 0,
        x: "100vw",
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: { 
          duration,
          ease: "easeInOut",
        }
      }
    }
  },
  fallUp: (duration: number) => {
    return {
      hidden: {
        opacity: 0,
        y: "100vh",
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: { 
          duration,
          ease: "easeInOut",
        }
      }
    }
  }
}

export const svgVariant = {
  flip: (duration: number) => {
    return {
      hidden: { rotate: -180 },
      visible: { 
        rotate: 0,
        transition: { duration }
      },
    }
  }
}

export const pathVariant = {
  draw: (duration: number) => {
    return {
      hidden: {
        opacity: 0,
        pathLength: 0,
      },
      visible: {
        opacity: 1,
        pathLength: 1,
        transition: { 
          duration,
          ease: "easeInOut",
        }
      }
    }
  }
}
