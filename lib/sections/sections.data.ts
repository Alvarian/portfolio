import Intro from 'UI/intro'
import Badges from 'UI/badges'

import { Content } from 'lib/sections/sections.types'

export const sectionData: Array<Content> = [
  {
    alt: "about",
    content: null,
    // content: Intro,
    bgImageName: "img_class-min.jpg"
  },
  {
    alt: "knowledge",
    content: Badges,
    bgImageName: "img_clock1-min.jpg"
  }
];