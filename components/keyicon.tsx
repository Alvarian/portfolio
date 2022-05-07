import Image from "next/image"

import { Content } from 'lib/sections/sections.types'
import { sectionData } from 'lib/sections/sections.data'


const KeyIcon: React.FC<any> = ({
  position,
  size,
  icon
}) => {
  return (
    <div className="rounded-full z-1">
      <Image 
        src={`/images/mainFace-min.jpg`} 
        // src={`/images/${sectionData[position].keyIcon}`} 
        alt="Picture of the author"
        width={size}
        height={size}
        style={{borderRadius: "100%"}}
      />
    </div>
  )
}

export default KeyIcon
