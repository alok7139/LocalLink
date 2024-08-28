import React, { useState, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../main';

function Login() {
    const { isauthenticated, setisauthenticated } = useContext(Context);
    const navigate = useNavigate();

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handlelogin = async (e) => {
        e.preventDefault();
            await axios.post("http://localhost:3000/api/v1/user/login" , {email,password} , {withCredentials:true , headers:{"Content-Type": "application/json"}})
            .then((res) => {
                toast.success(res.data.message);
                setisauthenticated(true)
                setemail('')
                setpassword('')
            }).catch((error) => {
                toast.error(error.response.data.message)
            })
            
        
        
    };

    if(isauthenticated){
        return <Navigate to={'/'} />
    }

    return (
        <div className='flex flex-col items-center justify-center mt-48 mb-10 px-4 '>
            <div className='w-full max-w-md p-8 rounded-lg shadow-md'>
                <h2 className='text-2xl font-bold text-center mb-4'>Sign in</h2>
                <p className='text-center text-gray-600 mb-8'>Please Sign in to continue</p>
                <form onSubmit={handlelogin} className='space-y-6'>
                    <div>
                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div className='text-right'>
                        <Link to='/register' className='text-blue-500 hover:underline'>
                            Not Have an account? Sign up
                        </Link>
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='w-full py-3 bg-black text-white font-semibold rounded-lg shadow-lg'
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
