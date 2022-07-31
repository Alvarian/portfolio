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
        description: "Qui ad tempor qui deserunt enim tempor ullamco aliqua cillum elit. Ut laboris pariatur ullamco occaecat officia proident ea. Voluptate veniam quis dolore eu ullamco consequat sit aute ullamco. Eu et nulla ipsum et labore Lorem. Minim duis dolor tempor ex ipsum deserunt tempor id eiusmod quis sint ut duis.",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 2,
        icon: "https://picsum.photos/id/234/620/620",
        title: "paris",
        description: "Reprehenderit enim voluptate cupidatat voluptate nulla deserunt eiusmod commodo. Amet veniam adipisicing exercitation ullamco duis aute aliqua eu dolore nisi. Esse anim anim aute in sunt laborum quis. Do Lorem mollit officia pariatur. Et Lorem mollit cupidatat ex laborum quis. Eu sunt dolore cupidatat consequat aute irure sit est.",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 3,
        icon: "https://picsum.photos/id/235/620/620",
        title: "everest",
        description: "Nisi incididunt deserunt minim ut ex adipisicing velit excepteur sint pariatur Lorem sit esse. Proident non ut ex nostrud incididunt laborum anim amet cillum labore ut aliqua. Adipisicing ipsum anim amet qui incididunt anim aliqua veniam nisi cupidatat laboris exercitation laboris.",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 4,
        icon: "https://picsum.photos/id/236/620/620",
        title: "town",
        description: "Adipisicing labore reprehenderit velit ex exercitation Lorem sint duis id ipsum ut. Anim cillum adipisicing et ad minim incididunt incididunt aute officia laboris incididunt aliquip sit et. Sunt elit mollit fugiat quis eu cupidatat duis magna. Culpa commodo fugiat exercitation ullamco amet minim irure dolore amet est excepteur nulla.",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 5,
        icon: "https://picsum.photos/id/237/620/620",
        title: "puppy",
        description: "Qui mollit incididunt incididunt elit aliquip do. Non tempor cupidatat occaecat minim officia ut consequat labore. Pariatur voluptate tempor elit nulla ex qui cupidatat qui culpa. Ipsum reprehenderit Lorem elit eiusmod adipisicing eiusmod do nostrud sint velit veniam enim non. Officia excepteur amet non irure. Excepteur magna veniam ex culpa elit anim anim. Minim amet laboris ea duis ipsum quis dolore incididunt aliqua sit velit.",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 6,
        icon: "https://picsum.photos/id/238/620/620",
        title: "city",
        description: "Fugiat ea excepteur labore eiusmod minim ullamco eiusmod labore sint mollit excepteur quis non sint. Aliquip laboris proident consectetur qui ut veniam. Deserunt cupidatat aliquip non exercitation sint ipsum adipisicing velit cillum ex in deserunt. Ad sit Lorem consequat eu sint culpa reprehenderit.",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 7,
        icon: "https://picsum.photos/id/239/620/620",
        title: "dandylion",
        description: "Commodo occaecat labore Lorem aute Lorem cupidatat sunt do fugiat ea sit tempor. Amet nulla aliqua commodo esse. Est laborum velit consectetur ad minim voluptate tempor laboris do reprehenderit. Ad tempor sunt elit in ut ut exercitation qui sint fugiat exercitation consequat eu.",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 8,
        icon: "https://picsum.photos/id/240/620/620",
        title: "stairs",
        description: "Elit aliquip nisi consequat dolore aliqua. Lorem ut culpa proident reprehenderit enim pariatur incididunt consequat laborum minim nostrud. Eiusmod sit sunt nostrud dolor laborum ipsum minim.",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 9,
        icon: "https://picsum.photos/id/241/620/620",
        title: "road",
        description: "Laboris aute irure Lorem proident commodo. In id tempor et exercitation occaecat exercitation non commodo sint irure eiusmod minim. Velit laborum officia consequat Lorem amet sit dolor dolor ullamco. Aliqua fugiat Lorem dolore anim enim qui dolor dolore irure non ullamco qui ex occaecat. Eiusmod laborum duis pariatur aute excepteur sint magna aute sint laborum velit ullamco.",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 10,
        icon: "https://picsum.photos/id/242/620/620",
        title: "factory",
        description: "Minim occaecat sunt anim culpa. Et occaecat non adipisicing ut excepteur ipsum veniam dolor id quis labore. Ea tempor aliquip ad sint qui. Sit qui ullamco ex occaecat eiusmod tempor dolor ea proident. Sit cupidatat velit eu quis ex Lorem sint magna quis dolor ullamco excepteur in cupidatat. Dolore quis Lorem cupidatat commodo ex. Deserunt enim laboris ut consequat labore consectetur adipisicing proident consequat ad aute labore.",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 11,
        icon: "https://picsum.photos/id/243/620/620",
        title: "forest",
        description: "Reprehenderit incididunt incididunt cupidatat laboris consequat ullamco irure excepteur Lorem labore consectetur non cupidatat quis. Aute ipsum id sint mollit. Dolor laborum culpa elit officia laboris consectetur. Qui labore consectetur labore minim minim sunt ad non id excepteur occaecat id sint. Et reprehenderit aute ea tempor minim aute laborum ipsum cupidatat.",
        stacks: [""],
        repo: "",
        lastUpdate: "",
        type: "Embedded script(modal) / slideshow(modal) / deployed(new window)"
      },
      {
        id: 12,
        icon: "https://picsum.photos/id/244/620/620",
        title: "pier",
        description: "Id minim labore ullamco commodo commodo qui anim laborum aute consequat fugiat. Commodo anim fugiat dolore eiusmod elit voluptate minim cupidatat cupidatat dolor veniam veniam. Pariatur cupidatat labore in in aliqua irure duis do laborum adipisicing amet irure. Dolor aliqua Lorem dolor consequat magna officia. Cupidatat proident voluptate duis exercitation occaecat anim commodo.",
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
