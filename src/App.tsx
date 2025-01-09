
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Notfound from './Components/Notfound/Notfound'
import Home from './Components/Home/Home'
import AuthLayout from './Components/AuthLayout/AuthLayout'
import Login from './Components/Login/Login'
import MasterLayout from './Components/MasterLayout/MasterLayout'
import UserList from './Components/UserList/UserList'
import AddUser from './Components/AddUser/AddUser'
import Profile from './Components/Profile/Profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateUser from './Components/UpdateUser/UpdateUser'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'


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
    element:<ProtectedRoute><MasterLayout/></ProtectedRoute> ,
    errorElement: <Notfound />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "userlist", element: <UserList /> },
      { path: "adduser", element: <AddUser /> },
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
