import MostRecent from "./MostRecent"
import Overall from "./Overall"
import Arrow from "components/arrow"


const index: React.FC<any> = ({ data }) => {
  const { overallStatsPayload, mostRecentPayload } = data

  return (
    <div>
      <Overall 
        payload={overallStatsPayload}
      />

      <MostRecent 
        payload={mostRecentPayload}
      />
      
      <Arrow 
        direction="right"
        size={50}
        // handler={}
      />
    </div>
  )
} 

// API CALLS
// https://www.codewars.com/kata/55466989aeecab5aac00003e/solutions/javascript
// 55466989aeecab5aac00003e
// https://www.codewars.com/api/v1/code-challenges/55466989aeecab5aac00003e

export default index