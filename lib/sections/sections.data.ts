import Intro from 'UI/intro'
import Badges from 'UI/badges'

import { Content } from 'lib/sections/sections.types'

export const sectionData: Array<Content> = [
  {
    title: "About",
    content: Intro,
    bgImageName: "img_class-min.jpg"
  },
  {
    title: "Knowledge",
    content: Badges,
    bgImageName: "img_clock1-min.jpg"
  },
];