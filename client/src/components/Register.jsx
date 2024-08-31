import React, { useContext, useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { Context } from '../main';
import { Navigate, useNavigate  , Link } from 'react-router-dom';

function Register() {

   const {isauthenticated,setisauthenticated} = useContext(Context)

   const navigate=  useNavigate();

    const [name, setname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [dob, setdob] = useState('');
    const [gender, setgender] = useState('');
    

    const handleregister = async(e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/api/v1/user/register" , {
         name,lastname,email,phone,password,dob,gender} , {withCredentials:true , headers:{"Content-Type" : "application/json"}})
         .then((res) => {
            toast.success(res.data.message);
            setisauthenticated(true); 
            navigate('/');
            setname('')
            setlastname('')
            setemail('')
            setdob('')
            setpassword('')
            setphone('')
            setgender('')
         }).catch((error) => {
            toast.error(error.response.data.message);
         })
        
    };

    if(isauthenticated){
      return <Navigate to={'/'}/>
    }

    return (
      <div className='mt-44 mb-10 font-serif px-4 py-4 mx-auto max-w-md lg:max-w-2xl flex flex-col justify-center items-center'>
      <h1 className='text-center text-3xl font-bold mb-8'>Sign Up</h1>
      <form onSubmit={handleregister} className='flex flex-col gap-6 w-full'>
          <div className='flex flex-col lg:flex-row gap-4'>
              <input
                  type='text'
                  placeholder='First Name'
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className='p-2 border-2 bg-white text-black rounded w-full lg:w-1/2'
              />
              <input
                  type='text'
                  placeholder='Last Name'
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  className='p-2 border-2 bg-white text-black rounded w-full lg:w-1/2'
              />
          </div>
          <div className='flex flex-col lg:flex-row gap-4'>
              <input
                  type='email'
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setemail(e.target.value)}
                  className='p-2 border-2 bg-white text-black rounded w-full lg:w-1/2'
              />
              <input
                  type='text'
                  value={phone}
                  placeholder='Phone Number'
                  onChange={(e) => setphone(e.target.value)}
                  className='p-2 border-2 bg-white text-black rounded w-full lg:w-1/2'
              />
          </div>
          <div className='flex flex-col lg:flex-row gap-4'>
              <input
                  type='date'
                  value={dob}
                  placeholder='Date Of Birth'
                  onChange={(e) => setdob(e.target.value)}
                  className='p-2 border-2 bg-white text-black rounded w-full lg:w-1/2'
              />
              <select
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  className='border-2 p-2 bg-white text-black rounded w-full lg:w-1/2'
              >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
              </select>
          </div>
          <div className='flex flex-col gap-4'>
              <input
                  type='password'
                  value={password}
                  placeholder='Password'
                  onChange={(e) => setpassword(e.target.value)}
                  className='border-2 p-3 bg-white text-black rounded w-full'
              />
          </div>
          <div className='text-right w-full'>
              <Link to='/login' className='text-blue-500 hover:underline'>
                  Already have an account? Sign in
              </Link>
          </div>
          <div className='flex justify-center'>
              <button
                  type='submit'
                  className='bg-black text-white px-4 py-3 rounded-xl shadow-lg text-xl w-full lg:w-auto'
              >
                  Create Account
              </button>
          </div>
      </form>
  </div>
  
    );
}

export default Register;
