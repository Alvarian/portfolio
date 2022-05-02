import Image from "next/image"

import { Content } from 'lib/sections/sections.types'
import { sectionData } from 'lib/sections/sections.data'


const KeyIcon: React.FC<any> = ({
  position,
  icon
}) => {
  return (
    <div className="fixed rounded-full z-1">
      <Image 
        src={`/images/mainFace-min.jpg`} 
        // src={`/images/${sectionData[position].keyIcon}`} 
        alt="Picture of the author"
        width={300}
        height={300}
        style={{borderRadius: "100%"}}
      />
    </div>
  )
}

export default KeyIcon
