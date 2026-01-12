import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleLogin from './GoogleLogin';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { saveOrUpdateUser } from '../../Utils';
import { useTheme } from '../../Contexts/ThemeContext';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // console.log(errors);
    const { registerUser, updateUserProfile } = useAuth();
    const { isDarkMode } = useTheme();
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
        <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
        }`}>

            <div className={`w-full shadow-xl grid grid-cols-1 md:grid-cols-2 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>

                <div className={`hidden md:flex items-center justify-center p-6 transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                    <h3 className={`text-3xl font-semibold text-center transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Create Account</h3>
                </div>

                <div className="p-8 flex flex-col justify-center items-center h-full">
                    <h2 className={`text-3xl font-semibold text-center transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Welcome To Ticket Bari</h2>
                    <p className={`text-xl font-semibold text-center mb-6 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Please Register</p>


                    <form onSubmit={handleSubmit(handleRegistration)} className="w-full max-w-lg">
                        <fieldset className="fieldset">

                            {/* name */}
                            <label className={`label transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>Name</label>
                            <input
                                name='name'
                                type="text"
                                {...register("name", { required: true, minLength: 5 })}
                                className={`input w-full transition-colors duration-300 ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500' 
                                        : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                                }`}
                                placeholder="Your Name"
                                id='name'
                            />
                            {errors.name?.type === "required" &&
                                <p className="text-red-500">Name is required</p>
                            }
                            {errors.name?.type === "minLength" &&
                                <p className="text-red-500">At least 5 characters required</p>
                            }

                            {/* photo */}
                            <label className={`label transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>Photo</label>
                            <input
                                name='photo'
                                type="file"
                                {...register("photo", { required: true })}
                                className={`file-input w-full transition-colors duration-300 ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white file:bg-gray-600 file:text-white file:border-gray-500' 
                                        : 'bg-white border-gray-300 text-gray-900'
                                }`}
                                placeholder="Your Photo"
                                id='photo'
                            />
                            {errors.photo?.type === "required" &&
                                <p className="text-red-500">Photo is required</p>
                            }

                            {/* Email */}
                            <label className={`label transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>Email</label>
                            <input
                                name='email'
                                type="email"
                                {...register("email", { required: true })}
                                className={`input w-full transition-colors duration-300 ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500' 
                                        : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                                }`}
                                id='email'
                                placeholder="Email"
                            />
                            {errors.email?.type === "required" &&
                                <p className="text-red-500">Email is required</p>
                            }

                            {/* Password */}
                            <label className={`label mt-3 transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>Password</label>
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
                                    className={`input w-full transition-colors duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                                    }`}
                                    placeholder="Password"
                                />
                                <span
                                    className={`absolute right-2 top-2.5 cursor-pointer transition-colors duration-300 ${
                                        isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                                </span>
                            </div>

                            {errors.password?.type === "required" &&
                                <p className="text-red-500">Password is Required</p>
                            }
                            {errors.password?.type === "minLength" &&
                                <p className="text-red-500">At least 8 characters required</p>
                            }
                            {errors.password?.type === "pattern" &&
                                <p className="text-red-500">Must include uppercase, lowercase, number & special character</p>
                            }

                            <div className="mt-2">
                                <a className={`link link-hover transition-colors duration-300 ${
                                    isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                                }`}>Forgot password?</a>
                            </div>

                            <button type="submit" className={`btn mt-4 w-full transition-all duration-300 hover:scale-105 ${
                                isDarkMode 
                                    ? 'bg-green-600 hover:bg-green-700 text-white border-green-600' 
                                    : 'btn-neutral'
                            }`}>
                                Register
                            </button>

                        </fieldset>
                        <p className={`text-sm font-bold mt-4 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>ALready Have An Account ? - Ticket Bari. <Link state={location.state} to='/auth/login' className={`transition-colors duration-300 ${
                            isDarkMode ? 'text-blue-400 hover:text-green-400' : 'text-blue-800 hover:text-green-500'
                        }`}>Login Now</Link></p>
                    </form>
                    <GoogleLogin></GoogleLogin>
                </div>
            </div>
        </div>
    );
};

export default Register;
