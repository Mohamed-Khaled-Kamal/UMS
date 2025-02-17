
import { useContext, useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import './SideBar.css';
import { IoHome } from "react-icons/io5";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaUsers } from "react-icons/fa";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from '../Context/AuthContext';

export default function SideBar() {

  let { userData }: any = useContext(AuthContext);
  let [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {  
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  let toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  let logout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className='sidebarContainer vh-100'>
      <Sidebar collapsed={collapsed} className='vh-100 SideBar'>
        {collapsed ? <FaArrowAltCircleRight className='IC' onClick={toggleCollapsed} size={25} />
          : <FaArrowAltCircleLeft className='IC' onClick={toggleCollapsed} size={25} />}
         
        <div className="sidebar-title UMS ms-2 mt-2 ps-3">
          <h5>UMS</h5>
        </div>

        <div className="sidebar-img text-center my-4">
          <img className='rounded-circle w-50' src={userData?.image} alt='profile-admin' />
          <h6>{userData?.firstName} {userData?.lastName}</h6>
          <h6 className='text-warning'>Admin</h6>
        </div>
        <Menu
          className='m-auto'
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem icon={<IoHome size={25} />} component={<Link to="home" />}> Home</MenuItem>
          <MenuItem icon={<FaUsers size={25} />} component={<Link to="userlist" />}> Users</MenuItem>
          <MenuItem icon={<AiOutlineUsergroupAdd size={25} />} component={<Link to="adduser" />}> Add User</MenuItem>
          <MenuItem icon={<CgProfile size={25} />} component={<Link to="profile" />}> Profile</MenuItem>
          <MenuItem icon={<CiLogout color='red' size={25} />} className='log-out' onClick={logout}> Log Out</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
