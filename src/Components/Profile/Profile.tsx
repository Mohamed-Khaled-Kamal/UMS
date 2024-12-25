import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import PreLoader from "../PreLoader/PreLoader";

interface userFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phoneNumber: string;
  birthData: string;
}

export default function Profile() {
  const navigate = useNavigate();
  let[loading,setLoading]=useState(false)
  const [adminData, setAdminData] = useState<any>(null);
  const { userData }: any = useContext(AuthContext); 

  const userId = userData?.id || JSON.parse(localStorage.getItem("userData") || "{}").id;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<userFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 0,
      phoneNumber: "",
      birthData: "",
    },
  });

  const onSubmit: SubmitHandler<userFormData> = async (data) => {
    try {
      await axios.post(`https://dummyjson.com/users/add`, data);
      toast.success("Your profile is updated successfully!");
      navigate("/dashboard/users-list");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  async function getUser() {
    if (!userId) {
      console.error("User ID is missing!");
      return;
    }
    try {
      setLoading(true)
      const { data } = await axios.get(`https://dummyjson.com/users/${userId}`);
      setAdminData(data); 
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }

  useEffect(() => {
    getUser();
  }, [userId]);

  useEffect(() => {
    if (adminData) {
      setValue("firstName", adminData.firstName || "");
      setValue("lastName", adminData.lastName || "");
      setValue("email", adminData.email || "");
      setValue("age", adminData.age || 0);
      setValue("phoneNumber", adminData.phone || "");
      setValue("birthData", adminData.birthDate || "");
    }
  }, [adminData, setValue]);

  return (
    <>
      {loading?<PreLoader/>:<>
      <div className="m-3">
        <h3>Profile</h3>
      </div>
      <hr className="" />
      <div className="  ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-lg mt-5 m-5  p-4 border rounded "
        >
          
          <div className="row">
            <div className="col-md-6">
              <div className="mb-1">
                <label className="form-label">First name</label>
                <input
                disabled
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
                disabled
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
                disabled
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
                disabled
                  type="number"
                  className="form-control"
                  placeholder="Enter your Age"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 17, message: "Min age is 17" },
                    max: { value: 60, message: "Max age is 60" },
                  })}
                />
                {errors.age && (
                  <span className="text-danger">{errors.age.message}</span>
                )}
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="mb-1">
                <label className="form-label">Phone Number</label>
                <input
                disabled
                  type="text"
                  className="form-control"
                  placeholder="Enter your Phone Number"
                  {...register("phoneNumber", { required: "Phone number is required" })}
                />
                {errors.phoneNumber && (
                  <span className="text-danger">{errors.phoneNumber.message}</span>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-1">
                <label className="form-label">Birth Date</label>
                <input
                disabled
                  type="text"
                  className="form-control"
                  placeholder="Enter your Birth Date"
                  {...register("birthData", { required: "Birth date is required" })}
                />
                {errors.birthData && (
                  <span className="text-danger">{errors.birthData.message}</span>
                )}
              </div>
            </div>
          </div>

          
        </form>
      </div>
    </>}
    </>
  );
}
