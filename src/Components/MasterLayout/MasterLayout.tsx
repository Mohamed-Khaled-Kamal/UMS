
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import SideBar from '../Sidebar/SideBar'


export default function MasterLatout() {
  return (
    <>
      
        <div className="d-flex">
          <div className=" p-0  "><SideBar/></div>
          <div className="w-100 p-0 vh-100 overflow-auto">
            <NavBar />

            <Outlet/>
          </div>
      </div>
      
    </>
  )
}
