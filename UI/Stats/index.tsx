import Icon from "components/icon";
import SlideShow from "components/slideshow";
import { dataOptions, MostrecentPayload, OverallPayload } from "lib/sections/sections.types";
import { useState } from "react"
import MostRecent from "./MostRecent"
import Overall from "./Overall"


const index: React.FC<{
  data: {
    overallStatsPayload: OverallPayload, 
    mostRecentPayload: MostrecentPayload
  },
  isSectionPermitted: boolean,
  width: number
}> = ({ 
  data,
  isSectionPermitted,
  width
}) => {
  const [isVisible, setVisible] = useState(true)

  const { overallStatsPayload, mostRecentPayload } = data

  const handleVisible: () => void = () => {
    setVisible(!isVisible)
  }
  
  const styles = {
    tailwind: {
      main: `w-full h-full`
    }
  }

  const orArrowAttributes: dataOptions = (isVisible) ? {
    position: "right",
    content: "Most Recent Challenge",
    custom: {
      parent: "",
      img: "rotate-90",
      content: "text-2xl text-center bg-gradient-to-l from-yellow-300 h-12 p-3"
    }
  } : {
    position: "left",
    content: "Overall Challenges",
    custom: {
      parent: "",
      img: "-rotate-90",
      content: "text-2xl text-center bg-gradient-to-r from-yellow-300 p-3 h-12"
    }
  }

  return (
    <SlideShow
      styles={styles.tailwind.main}
    >
      {isVisible ? <Overall 
        key="overall"
        payload={overallStatsPayload}
        isSectionPermitted={isSectionPermitted}
        width={width}
      />
        :
      <MostRecent 
        key="recent"
        payload={mostRecentPayload}
        width={width}
      />}

      <Icon 
        name="arrow"
        position={orArrowAttributes.position}
        src="/icons/up-arrow-svgrepo-com.svg"
        size="lg"
        content={orArrowAttributes.content}
        kind={{
          type: "button",
          content: "",
          callback: handleVisible
        }}
        custom={orArrowAttributes.custom}
      />
    </SlideShow>
  )
} 

export default index