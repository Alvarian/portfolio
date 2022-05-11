import Header from 'UI/header'
import Badges from 'UI/Badges'
import Stats from 'UI/Stats'

import { Content } from 'lib/sections/sections.types'

export const sectionData: Array<Content> = [
  {
    alt: "about",
    // content: null,
    content: {
      body: Header,
      isFull: true
    },
    type: "default",
    keyIcon: "mainFace-min.jpg",
    bgImageName: "img_class-min.jpg"
  },
  {
    alt: "stats",
    // content: null,
    content: {
      body: Stats,
      isFull: false
    },
    type: "default",
    keyIcon: "",
    bgImageName: "img_bridge3-min.jpg"
  },
  {
    alt: "knowledge",
    content: {
      body: Badges,
      isFull: false
    },
    type: "default",
    keyIcon: "",
    bgImageName: "img_clock1-min.jpg"
  }
]

export const defaultVariants = { 
  dropDown: (duration: number) => {
    return {
      drop: {
        opacity: 0,
        y: "-8vw",
      },
      lift: {
        opacity: 1,
        y: 0,
        transition: {
          duration,
          ease: "easeInOut",
        }
      }
    }
  },
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
