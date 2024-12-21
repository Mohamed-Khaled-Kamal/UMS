import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { data, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AddUser() {
  
  let { register, handleSubmit, formState: { errors } } = useForm()

  let navigate = useNavigate()
  
  let onsubmit = async(data) => {
    try {
      let response = await axios.post("https://dummyjson.com/users/add", data)
      console.log(response)
      toast.success("Data Added Successfuly !!!")
      navigate("/dashbord/userlist")
    } catch (error) {
      console.log(error)
      toast.error("Somthing Wrong!!!!!!!!!!")
    }
  }

  return (
    <>
       <div className="d-flex justify-content-between m-2">
          <h3>Add User</h3>
        </div>
      <hr />
      
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="shadow-lg mt-5 m-5 p-4 border rounded"
      >
        <div className="row">
          <div className="col-md-6">
            <div className="mb-1">
              <label className="form-label">First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Firstname"
                {...register("firstName", { required: "First name is required" })}
              />
            {errors.firstName && (
                <span className="text-danger">{errors.firstName.message}</span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-1">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Last name"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <span className="text-danger">{errors.lastName.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-md-6">
            <div className="mb-1">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                {...register("email",{required:"Email is required",pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Email should be valid",
                },})}
              />
            {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-1">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your Age"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 17, message: "Min age is 17"},
                  max: { value: 60, message: "Max age is 60" },
                })}
              />
              {errors.age && (
                <span className="text-danger">{errors.age.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-1">
              <label className="form-label">Phone Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your Phone Number"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && (
                <span className="text-danger">{errors.phone.message}</span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-1">
              <label className="form-label">Birth Date</label>
              <input
                type="date"
                className="form-control"
                placeholder="Enter your Birth Date"
                {...register("birthDate", { required: "Birth date is required" })}
              />
              {errors.birthDate && (
                <span className="text-danger">{errors.birthDate.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="text-center my-4">
          <button className="btn btn-warning w-50">Save</button>
        </div>
      </form>
    </>
  )
}
