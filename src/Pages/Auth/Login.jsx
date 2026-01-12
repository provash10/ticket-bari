import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleLogin from './GoogleLogin';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { saveOrUpdateUser } from '../../Utils';
import { useTheme } from '../../Contexts/ThemeContext';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    console.log('in the login page', location);

    const [showPassword, setShowPassword] = useState(false);


 const handleLogin = async (data) => {
  try {
    const result = await signInUser(data.email, data.password);
    const user = result.user;

    // save user to DB
    await saveOrUpdateUser({
      name: user.displayName || "N/A",
      email: user.email,
      image: user.photoURL || "",
      role: "user",
    });

    toast.success("Login successful !!");
    navigate(location?.state || "/");
  } catch (error) {
    console.log(error);
    toast.error("Invalid email or password !!");
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
                    }`}>Welcome Back</h3>
                </div>

                <div className="p-8 flex flex-col justify-center items-center h-full">
                    <h2 className={`text-3xl font-semibold text-center transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Welcome To Ticket Bari</h2>
                    <p className={`text-xl font-semibold text-center mb-6 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Please Login...</p>

                    <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-lg">
                        <fieldset className="fieldset">

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
                                placeholder="Email"
                                id='email'
                            />
                            {errors.email?.type === "required" &&
                                <p className="text-red-500">Email is required</p>
                            }

                            <label className={`label mt-3 transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>Password</label>
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
                                    className={`input w-full transition-colors duration-300 ${
                                        isDarkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500' 
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-green-500'
                                    }`}
                                    placeholder="Password"
                                    id='password'
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
                                <p className="text-red-500">Password must be at least 8 characters</p>
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
                                Login
                            </button>

                        </fieldset>
                        <p className={`text-sm font-bold mt-4 transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>Don't Have An Account ? - Ticket Bari. <Link state={location.state} to='/auth/register' className={`transition-colors duration-300 ${
                            isDarkMode ? 'text-blue-400 hover:text-green-400' : 'text-blue-800 hover:text-green-500'
                        }`}>Please Register</Link></p>
                    </form>
                    <GoogleLogin></GoogleLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;
