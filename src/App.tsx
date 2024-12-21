import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Notfound from './Components/Notfound/Notfound'
import Home from './Components/Home/Home'
import AuthLayout from './Components/AuthLayout/AuthLayout'
import Login from './Components/Login/Login'
import MasterLayout from './Components/MasterLayout/MasterLayout'
import UserList from './Components/UserList/UserList'
import AddUser from './Components/AddUser/AddUser'
import Address from './Components/Address/Address'
import Profile from './Components/Profile/Profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateUser from './Components/UpdateUser/UpdateUser'


function App() {
  let routes = createBrowserRouter([{
    path: '/',
    element: <AuthLayout/>,
    errorElement: <Notfound />,
    children: [
      { index: true, element: <Login/> },
      { path: "login", element: <Login/> },
    ]
},{
  path: 'dashbord',
    element:<MasterLayout/> ,
    errorElement: <Notfound />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "userlist", element: <UserList /> },
      { path: "adduser", element: <AddUser /> },
      { path: "address", element: <Address /> },
      { path: "profile", element: <Profile /> },
      { path: "updateuser/:id" , element: <UpdateUser/>}
      
    ]

    }])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
