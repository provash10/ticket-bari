import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleLogin from './GoogleLogin';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { saveOrUpdateUser } from '../../Utils';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // console.log(errors);
    const { registerUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // console.log('in the register page', location);

    const [showPassword, setShowPassword] = useState(false);


        const handleRegistration = async (data) => {
      try {
        const result = await registerUser(data.email, data.password);
        console.log(result.user);

        const profileImg = data.photo[0];

        const formData = new FormData();
        formData.append('image', profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
        const res = await axios.post(image_API_URL, formData);

        const imageURL = res.data.data.url;

        // saveOrUpdateUser
        await saveOrUpdateUser({
      name: data.name,
      email: data.email,
      image: imageURL
    });


        await updateUserProfile({
          displayName: data.name,
          photoURL: imageURL
        });

        toast.success('Registration Successful !!');
        navigate(location?.state || '/');

      } catch (error) {
        console.log(error);
        toast.error('Registration Failed !!');
      }
    };

  
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">


            <div className="w-full bg-white shadow-xl grid grid-cols-1 md:grid-cols-2">


                <div className="hidden md:flex items-center justify-center p-6 bg-gray-200">
                    <h3 className="text-3xl font-semibold text-center">Create Account</h3>
                </div>


                <div className="p-8 flex flex-col justify-center items-center h-full">
                    <h2 className="text-3xl font-semibold text-center">Welcome To Ticket Bari</h2>
                    <p className="text-xl font-semibold text-center mb-6">Please Register</p>


                    <form onSubmit={handleSubmit(handleRegistration)} className="w-full max-w-lg">
                        <fieldset className="fieldset">

                            {/* name */}
                            <label className="label">Name</label>
                            <input
                                name='name'
                                type="text"
                                {...register("name", { required: true, minLength: 5 })}
                                className="input w-full"
                                placeholder="Your Name"
                                id='name'
                            />
                            {errors.name?.type === "required" &&
                                <p className="text-red-700">Name is required</p>
                            }
                            {errors.name?.type === "minLength" &&
                                <p className="text-red-600">At least 5 characters required</p>
                            }

                            {/* photo */}
                            <label className="label">Photo</label>
                            <input
                                name='photo'
                                type="file"
                                {...register("photo", { required: true })}
                                className="file-input w-full"
                                placeholder="Your Photo"
                                id='photo'
                            />
                            {errors.photo?.type === "required" &&
                                <p className="text-red-700">Photo is required</p>
                            }

                            {/* Email */}
                            <label className="label">Email</label>
                            <input
                                name='email'
                                type="email"
                                {...register("email", { required: true })}
                                className="input w-full"
                                id='email'
                                placeholder="Email"
                            />
                            {errors.email?.type === "required" &&
                                <p className="text-red-700">Email is required</p>
                            }

                            {/* Password */}
                            <label className="label mt-3">Password</label>
                            {/* <input
                                type="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 8,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
                                })}
                                className="input w-full"
                                placeholder="Password"
                            /> */}
                            <div className='relative'>
                                <input

                                    // type="password"
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: true,
                                        minLength: 8,
                                        // pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

                                    })}
                                    name='password'
                                    id='password'
                                    className="input w-full"
                                    placeholder="Password"
                                />
                                <span
                                    className="absolute right-2 top-2.5 cursor-pointer text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                                </span>
                            </div>

                            {errors.password?.type === "required" &&
                                <p className="text-red-600">Password is Required</p>
                            }
                            {errors.password?.type === "minLength" &&
                                <p className="text-red-600">At least 8 characters required</p>
                            }
                            {errors.password?.type === "pattern" &&
                                <p className="text-red-600">Must include uppercase, lowercase, number & special character</p>
                            }

                            <div className="mt-2">
                                <a className="link link-hover">Forgot password?</a>
                            </div>

                            <button type="submit" className="btn btn-neutral mt-4 w-full">
                                Register
                            </button>

                        </fieldset>
                        <p className='text-sm font-bold mt-4'>ALready Have An Account ? - Ticket Bari. <Link state={location.state} to='/auth/login' className='text-blue-800 hover:text-green-500'>Login Now</Link></p>
                    </form>
                    <GoogleLogin></GoogleLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;
