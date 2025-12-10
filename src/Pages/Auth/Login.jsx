import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router';
import GoogleLogin from './GoogleLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signInUser } = useAuth();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

           
            <div className="w-full bg-white shadow-xl grid grid-cols-1 md:grid-cols-2">

                
                <div className="hidden md:flex items-center justify-center p-6 bg-gray-200">
                    <h3 className="text-3xl font-semibold text-center">Welcome Back</h3>
                </div>

          
                <div className="p-8 flex flex-col justify-center items-center h-full">
                    <h2 className="text-3xl font-semibold text-center">Welcome To Ticket Bari</h2>
                    <p className="text-xl font-semibold text-center mb-6">Please Login...</p>

                    <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-lg">
                        <fieldset className="fieldset">

                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="input w-full"
                                placeholder="Email"
                            />
                            {errors.email?.type === "required" &&
                                <p className="text-red-700">Email is required</p>
                            }

                            <label className="label mt-3">Password</label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 8,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
                                })}
                                className="input w-full"
                                placeholder="Password"
                            />

                            {errors.password?.type === "required" &&
                                <p className="text-red-600">Password is Required</p>
                            }
                            {errors.password?.type === "minLength" &&
                                <p className="text-red-600">Password must be at least 8 characters</p>
                            }
                            {errors.password?.type === "pattern" &&
                                <p className="text-red-600">Must include uppercase, lowercase, number & special character</p>
                            }

                            <div className="mt-2">
                                <a className="link link-hover">Forgot password?</a>
                            </div>

                            <button className="btn btn-neutral mt-4 w-full">
                                Login
                            </button>

                        </fieldset>
                        <p className='text-sm font-bold mt-4'>Don't Have An Account ? - Ticket Bari. <Link to='/register' className='text-blue-800 hover:text-green-500'>Please Register</Link></p>
                    </form>
                    <GoogleLogin></GoogleLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;
