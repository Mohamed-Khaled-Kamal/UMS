
import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useForm} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PreLoader from '../PreLoader/PreLoader';


interface UserFormData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
}

export default function UpdateUser() {
  
  const [userData, setUserData]:any = useState([]);

  
  const { id } = useParams<{ id: string }>();
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<UserFormData>();

  const navigate = useNavigate();


  const onSubmit  = async (data:UserFormData) => {
    try {
      const response = await axios.post("https://dummyjson.com/users/add", data);
      console.log(response);
      toast.success("Data Updated Successfully!!!");
      navigate("/dashbord/userlist");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!!!!!!!");
    }
  };


  const getUser = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);


  useEffect(() => {
    if (userData) {
      setValue('firstName', userData.firstName);
      setValue('lastName', userData.lastName);
      setValue('email', userData.email);
      setValue('age', userData.age);
      setValue('phone', userData.phone);
      setValue('birthDate', userData.birthDate);
    }
  }, [userData, setValue]);

  if (!userData) {
    return <PreLoader />;
  }

  return (
    <>
      <div className="d-flex justify-content-between m-2">
        <h3>Update User</h3>
        <h3>#{userData.id} - {userData.firstName} {userData.lastName}</h3>
      </div>
      <hr />
      <form
        onSubmit={handleSubmit(onSubmit)}
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
                defaultValue={userData.firstName}
              />
              {errors.firstName && (
                <span className="text-danger">{errors.firstName.message}
</span>
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
                defaultValue={userData.lastName}
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Email should be valid",
                  },
                })}
                defaultValue={userData.email}
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
                  min: { value: 17, message: "Min age is 17" },
                  max: { value: 60, message: "Max age is 60" },
                })}
                defaultValue={userData.age}
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
                type="text"
                className="form-control"
                placeholder="Enter your Phone Number"
                {...register("phone", { required: "Phone number is required" })}
                defaultValue={userData.phone}
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
                type="text"
                className="form-control"
                placeholder="Enter your Birth Date"
                {...register("birthDate", { required: "Birth date is required" })}
                defaultValue={userData.birthDate}
              />
              {errors.birthDate && (
                <span className="text-danger">{errors.birthDate.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="text-center my-4">
          <button className="btn btn-warning w-50">Update</button>
        </div>
      </form>
    </>
  );
}

