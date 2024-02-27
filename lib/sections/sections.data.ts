import Header from 'sections/Header'
import Badges from 'sections/Badges'
import Stats from 'sections/Stats'

import { Content } from 'lib/sections/sections.types'
import UnderConstruction from 'shared/underConstruction'
import Projects from 'sections/Projects'


export const sectionData: Content[] = [
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
  setting: "local",
  data: {
    stats: {
      overallStatsPayload: {
        leaderBoardScore: 230000,
        totalCompleted: 32,
        languagesTotal: {
          javascript: 10,
          rust: 5
        }
      },
      mostRecentPayload: {
        // id: 1,
        // success: true,
        title: "Rectangle into Squares",
        attemptedTotal: 100000,
        completedTotal: 20000,
        url: "www.lorem.com",
        // problem: "lorem",
        languagesUsed: ["javascript", "rust"],
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
    knowledge: [
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ],
          rotations: {
            horizontal: 0,
            vertical: 0
          }
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ],
          rotations: {
            horizontal: 0,
            vertical: 0
          }
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ],
          rotations: {
            horizontal: 0,
            vertical: 0
          }
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ],
          rotations: {
            horizontal: 0,
            vertical: 0
          }
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ],
          rotations: {
            horizontal: 0,
            vertical: 0
          }
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ],
          rotations: {
            horizontal: 0,
            vertical: 0
          }
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ],
          rotations: {
            horizontal: 0,
            vertical: 0
          }
        },
        {
          "issuedOn": "2022-06-05T04:06:47Z",
          "image": "/images/mockBadge.png",
          "evidence": [{
            "url": "#"
          }],
          "name": 'JavaScript - Advanced',
          "description": 'JavaScript is an open source scripting language used to enhance user interfaces and dynamic websites. It works directly with HTML and CSS to create effects, features and formatting. In this course, students with a basic knowledge of Java will be able to advance their skillset and learn complex functions of the technology.',
          "tags": [ 'App Development', 'HTML', 'JavaScript' ],
          rotations: {
            horizontal: 0,
            vertical: 0
          }
        },
      ],
    projects: [
      {
        id: 1,
        icon: "/images/trifecta.png",
        title: "rails",
        description: "Qui ad tempor qui deserunt enim tempor ullamco aliqua cillum elit. Ut laboris pariatur ullamco occaecat officia proident ea. Voluptate veniam quis dolore eu ullamco consequat sit aute ullamco. Eu et nulla ipsum et labore Lorem. Minim duis dolor tempor ex ipsum deserunt tempor id eiusmod quis sint ut duis.",
        stacks: ["javascript", "rust"],
        repo: "https://github.com/Alvarian/mock-trade-wallet",
        lastUpdate: "2021-10-25T20:12:03.473Z",
        payload: {
          type: "Site",
          ref: "http://localhost:3000/"
        }
      },
      {
        id: 2,
        icon: "/images/trifecta.png",
        title: "paris",
        description: "Reprehenderit enim voluptate cupidatat voluptate nulla deserunt eiusmod commodo. Amet veniam adipisicing exercitation ullamco duis aute aliqua eu dolore nisi. Esse anim anim aute in sunt laborum quis. Do Lorem mollit officia pariatur. Et Lorem mollit cupidatat ex laborum quis. Eu sunt dolore cupidatat consequat aute irure sit est.",
        stacks: ["javascript", "rust"],
        repo: "https://github.com/Alvarian/mock-trade-wallet",
        lastUpdate: "2021-10-25T20:12:03.473Z",
        payload: {
          type: "Script",
          ref: "function index(el) {const element = document.createElement('div'); element.innerText = 'heymanniceshot'; return element} window.games['Paris'] = index"
        }
      },
      {
        id: 3,
        icon: "/images/trifecta.png",
        title: "everest",
        description: "Nisi incididunt deserunt minim ut ex adipisicing velit excepteur sint pariatur Lorem sit esse. Proident non ut ex nostrud incididunt laborum anim amet cillum labore ut aliqua. Adipisicing ipsum anim amet qui incididunt anim aliqua veniam nisi cupidatat laboris exercitation laboris.",
        stacks: ["javascript", "rust"],
        repo: "https://github.com/Alvarian/mock-trade-wallet",
        lastUpdate: "2021-10-25T20:12:03.473Z",
        payload: {
          type: "Service",
          ref: [
            {
              description: "Slide 1",
              image: "/images/img_bridge1.jpg"
            },
            {
              description: "Slide 2",
              image: "/images/img_clouds.jpg"
            },
            {
              description: "Slide 3",
              image: "/images/img_clock1-min.jpg"
            },
            {
              description: "Slide 4",
              image: "/images/library-min.jpg"
            }
          ]
        }
      },
      {
        id: 4,
        icon: "/images/trifecta.png",
        title: "town",
        description: "Adipisicing labore reprehenderit velit ex exercitation Lorem sint duis id ipsum ut. Anim cillum adipisicing et ad minim incididunt incididunt aute officia laboris incididunt aliquip sit et. Sunt elit mollit fugiat quis eu cupidatat duis magna. Culpa commodo fugiat exercitation ullamco amet minim irure dolore amet est excepteur nulla.",
        stacks: ["javascript", "rust"],
        repo: "https://github.com/Alvarian/mock-trade-wallet",
        lastUpdate: "2021-10-25T20:12:03.473Z",
        payload: {
          type: "Script",
          ref: "function index(el) {console.log('App1 opened', el)} window.games['Town'] = index"
        }
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
