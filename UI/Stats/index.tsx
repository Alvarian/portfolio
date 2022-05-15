import SlideShow from "components/slideshow";
import { useState } from "react"
import MostRecent from "./MostRecent"
import Overall from "./Overall"


const index: React.FC<any> = ({ data }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isVisible, setVisible] = useState(true)

  const { overallStatsPayload, mostRecentPayload } = data

  const handleVisible = () => {
    // setVisible({
    //   overall: !isVisible.overall,
    //   recent: !isVisible.recent
    // })
    setVisible(!isVisible)
  }
  
  const styles = {
    tailwind: {
      main: `w-full h-full`
    }
  }

  return (
    <SlideShow
      styles={styles}
    >
      {isVisible ? <Overall 
        key="overall"
        payload={overallStatsPayload}
        setPage={setPage}
        setVisible={handleVisible}
      />
        :
      <MostRecent 
        key="recent"
        payload={mostRecentPayload}
        setPage={setPage}
        setVisible={handleVisible}
      />}
    </SlideShow>
  )
} 

export default index