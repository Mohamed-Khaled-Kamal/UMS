import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Sidebar/Sidebar'
import NavBar from '../Navbar/Navbar'


export default function MasterLatout() {
  return (
    <>
      
        <div className="d-flex">
          <div className=" p-0"><SideBar/></div>
          <div className="w-100 p-0 vh-100 fixed">
            <NavBar />

            <Outlet/>
          </div>
      </div>
      
    </>
  )
}
