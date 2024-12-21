
import { ThreeCircles } from 'react-loader-spinner'

export default function PreLoader() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#FFEB3B"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  )
}
