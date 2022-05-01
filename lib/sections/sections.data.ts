import Header from '@UI/header'
import Badges from 'UI/badges'

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
    bgImageName: "img_class-min.jpg"
  },
  {
    alt: "knowledge",
    content: {
      body: Badges,
      isFull: false
    },
    type: "default",
    bgImageName: "img_clock1-min.jpg"
  }
];