import  { useContext } from 'react'
import './Login.css'
import { useForm } from 'react-hook-form'
import {  useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {

  interface LoginFormInputs {
    username: string;
    password: string;
  }

  interface AuthContextType{
    saveUserData: () => void;
  }
  

  let { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>()

  let navigate = useNavigate()
  
  let {saveUserData}=useContext(AuthContext) as AuthContextType
  
  let onSubmit = async (data:LoginFormInputs) => {
    try {
      let response = await axios.post("https://dummyjson.com/auth/login", data)
      
      localStorage.setItem("userToken", response?.data?.accessToken)
      saveUserData()
      toast.success("Login Success!");
      navigate("/dashbord")
    
    } catch (error) {
      console.log(error)
      toast.error("Something Wrong!");
    }
  }
  
  
  
  return (
    <>
      <div className="container-fluid  page">
        <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-lg-4">
      <div className="login-form card border-0 rounded-4">
        <div className="card-body p-3 p-md-4 p-xl-5">
          <div className="row">
              <div className="col-12">
                    <div className="mb-5 text-center UMS">
                <h2> User Management System</h2>
              </div>
              <div className="mb-4 text-center">
                      <h3>SIGN IN</h3>
                      <p className='text-secondary'>Enter your credentials to access your account</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row gy-3 overflow-hidden">
              <div className="col-12">
                <h4>UserName</h4>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    
                    id="username"
                    placeholder="nameexample"
                    {...register("username",{required:"username is required!!!!"})}
                  />
                  <label htmlFor="username" className="form-label">
                    <i className="far fa-user-circle"></i> UserName
                  </label>
                      </div>
                      {errors.username && <span> {errors.username.message}
                      </span>}
              </div>
                    <div className="col-12">
                      <h4>Password</h4>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    
                    id="password"
                    placeholder="Password"
                    {...register("password",{required:"password is required!!!!"})}
                  />
                  <label htmlFor="password" className="form-label">
                    <i className="fas fa-key"></i> Password
                        </label>

                      {errors.password && <span> {errors.password.message}
                      </span>}
                      </div>
              </div>
              <div className="col-12">
              </div>
              <div className="col-12">
                <div className="d-grid">
                  <button className="btn btn-warning btn-lg" type="submit">
                    Log in now
                  </button>
                </div>
              </div>
            </div>
          </form>
      
        </div>
      </div>
    </div>
        </div>
      </div>
    </>
  )
}
