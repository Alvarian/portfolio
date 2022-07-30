import Header from 'sections/Header'
import Badges from 'sections/Badges'
import Stats from 'sections/Stats'

import { Content } from 'lib/sections/sections.types'
import UnderConstruction from 'shared/underConstruction'
import Projects from 'sections/Projects'


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
      isFull: true
    },
    type: "default",
    keyIcon: "",
    bgImageName: "img_clock1-min.jpg"
  },
  {
    alt: "projects",
    content: {
      body: Projects,
      isFull: true
    },
    type: "default",
    keyIcon: "",
    bgImageName: "img_highest-min.jpg"
  }
]

export const localMockData = {
  data: {
    stats: {
      overallStatsPayload: {
        leaderBoardScore: "230000",
        totalCompleted: 32,
        languagesTotal: {
          javascript: 10,
          rust: 5
        }
      },
      mostRecentPayload: {
        id: 1,
        success: true,
        title: "Rectangle into Squares",
        attemptedTotal: 100000,
        completedTotal: 20000,
        url: "www.lorem.com",
        problem: "lorem",
        tags: ["science", "math"],
        completionDate: "2021-10-25T20:12:03.473Z",
        solutions: {
          title: "Rectangle into Squares",
          languages:[
            {
              language: "javascript",
              solution: "function sqInRect(lng, wdth){\n  let sizeOfSquares = [];\n  if (lng == wdth) sizeOfSquares = null;\n  \n  const recurse = (lng, wdth) => {\n      if (lng == wdth) {\n          sizeOfSquares.push(lng);\n          \n          return;\n      }\n      \n      if (lng < wdth) {\n          sizeOfSquares.push(lng);\n          recurse(lng, wdth - lng);\n      } else {\n          sizeOfSquares.push(wdth);\n          recurse(lng - wdth, wdth);\n      }\n  }\n  \n  if (sizeOfSquares) recurse(lng, wdth);\n  \n  return sizeOfSquares;\n}"
            }
          ]
        }
      }
    },
    knowledge: {
      badges: [
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ]
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ]
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ]
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ]
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ]
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ]
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ]
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ]
        },
      ]
    },
    projects: [
      {
        id: 1,
        icon: "https://picsum.photos/id/233/620/620",
        title: "rails",
        description: "",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 2,
        icon: "https://picsum.photos/id/234/620/620",
        title: "paris",
        description: "",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 3,
        icon: "https://picsum.photos/id/235/620/620",
        title: "everest",
        description: "",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 4,
        icon: "https://picsum.photos/id/236/620/620",
        title: "town",
        description: "",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 5,
        icon: "https://picsum.photos/id/237/620/620",
        title: "puppy",
        description: "",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 6,
        icon: "https://picsum.photos/id/238/620/620",
        title: "city",
        description: "",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 7,
        icon: "https://picsum.photos/id/239/620/620",
        title: "dandylion",
        description: "",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 8,
        icon: "https://picsum.photos/id/240/620/620",
        title: "stairs",
        description: "",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 9,
        icon: "https://picsum.photos/id/241/620/620",
        title: "road",
        description: "",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 10,
        icon: "https://picsum.photos/id/242/620/620",
        title: "factory",
        description: "",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 11,
        icon: "https://picsum.photos/id/243/620/620",
        title: "forest",
        description: "",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 12,
        icon: "https://picsum.photos/id/244/620/620",
        title: "pier",
        description: "",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      }
    ]
  }
}

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
