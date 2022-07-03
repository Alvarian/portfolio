import Header from 'UI/header'
import Badges from 'UI/Badges'
import Stats from 'UI/Stats'

import { Content } from 'lib/sections/sections.types'
import UnderConstruction from '@components/underConstruction'

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
      body: UnderConstruction,
      isFull: false
    },
    type: "default",
    keyIcon: "",
    bgImageName: "img_highest-min.jpg"
  }
]

export const localMockData: {
  data: {
    [key: string]: any
  }
} = {
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
        title: "Rectangle into Squares",
        attemptedTotal: 100000,
        completedTotal: 20000,
        url: "www.lorem.com",
        problem: "lorem",
        tags: ["science", "math"],
        completionData: "1634682265",
        languagesUsed: ["javascript", "rust"]
      }
    },
    knowledge: {
      gifFrames: [
        '/images/badgeCoat/frame_000_delay-0.03s.gif',
        '/images/badgeCoat/frame_001_delay-0.04s.gif',
        '/images/badgeCoat/frame_002_delay-0.03s.gif',
        '/images/badgeCoat/frame_003_delay-0.03s.gif',
        '/images/badgeCoat/frame_004_delay-0.04s.gif',
        '/images/badgeCoat/frame_005_delay-0.03s.gif',
        '/images/badgeCoat/frame_006_delay-0.04s.gif',
        '/images/badgeCoat/frame_007_delay-0.03s.gif',
        '/images/badgeCoat/frame_008_delay-0.03s.gif',
        '/images/badgeCoat/frame_009_delay-0.04s.gif',
        '/images/badgeCoat/frame_010_delay-0.03s.gif',
        '/images/badgeCoat/frame_011_delay-0.03s.gif',
        '/images/badgeCoat/frame_012_delay-0.04s.gif',
        '/images/badgeCoat/frame_013_delay-0.03s.gif',
        '/images/badgeCoat/frame_014_delay-0.04s.gif',
        '/images/badgeCoat/frame_015_delay-0.03s.gif',
        '/images/badgeCoat/frame_016_delay-0.03s.gif',
        '/images/badgeCoat/frame_017_delay-0.04s.gif',
        '/images/badgeCoat/frame_018_delay-0.03s.gif',
        '/images/badgeCoat/frame_019_delay-0.03s.gif',
        '/images/badgeCoat/frame_020_delay-0.04s.gif',
        '/images/badgeCoat/frame_021_delay-0.03s.gif',
        '/images/badgeCoat/frame_022_delay-0.04s.gif',
        '/images/badgeCoat/frame_023_delay-0.03s.gif',
        '/images/badgeCoat/frame_024_delay-0.03s.gif',
        '/images/badgeCoat/frame_025_delay-0.04s.gif',
        '/images/badgeCoat/frame_026_delay-0.03s.gif',
        '/images/badgeCoat/frame_027_delay-0.03s.gif',
        '/images/badgeCoat/frame_028_delay-0.04s.gif',
        '/images/badgeCoat/frame_029_delay-0.03s.gif',
        '/images/badgeCoat/frame_030_delay-0.04s.gif',
        '/images/badgeCoat/frame_031_delay-0.03s.gif',
        '/images/badgeCoat/frame_032_delay-0.03s.gif',
        '/images/badgeCoat/frame_033_delay-0.04s.gif',
        '/images/badgeCoat/frame_034_delay-0.03s.gif',
        '/images/badgeCoat/frame_035_delay-0.03s.gif',
        '/images/badgeCoat/frame_036_delay-0.04s.gif',
        '/images/badgeCoat/frame_037_delay-0.03s.gif',
        '/images/badgeCoat/frame_038_delay-0.04s.gif',
        '/images/badgeCoat/frame_039_delay-0.03s.gif',
        '/images/badgeCoat/frame_040_delay-0.03s.gif',
        '/images/badgeCoat/frame_041_delay-0.04s.gif',
        '/images/badgeCoat/frame_042_delay-0.03s.gif',
        '/images/badgeCoat/frame_043_delay-0.03s.gif',
        '/images/badgeCoat/frame_044_delay-0.04s.gif',
        '/images/badgeCoat/frame_045_delay-0.03s.gif',
        '/images/badgeCoat/frame_046_delay-0.04s.gif',
        '/images/badgeCoat/frame_047_delay-0.03s.gif'
      ],
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
    }
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
