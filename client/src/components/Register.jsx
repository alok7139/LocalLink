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
    const [errors, seterrors] = useState({name: '' , lastname : '' , email: '' , 
        phone: '' , password: '' , dob: '' , gender: '' 
    })

    const validateForm = () => {
        const newErrors = {};
        if(!name){
            newErrors.name = 'First Name is required';
        }
        if(!lastname){
            newErrors.lastname = 'Last Name is required';
        }
        if (!email) {
            newErrors.email = 'Email is required';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        }
        if(!phone){
            newErrors.phone = 'Phone Number is required';
        }
        if(!dob){
            newErrors.dob = 'Date of Birth is required';
        }
        if(!gender){
            newErrors.gender = 'Gender is required';
        }
        return newErrors;
    }

    const handleregister = async(e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if(Object.keys(validationErrors).length>0){
            seterrors(validationErrors);
            return ;
        }

        await axios.post("https://locallink.onrender.com/api/v1/user/register" , {
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
  <div className='flex flex-col w-full lg:w-1/2'>
    <input
      type='text'
      placeholder='First Name'
      value={name}
      onChange={(e) => setname(e.target.value)}
      className={`p-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} border-2 bg-white text-black rounded`}
    />
    {errors.name && <p className='text-red-500 mt-2 text-sm'>{errors.name}</p>}
  </div>
  <div className='flex flex-col w-full lg:w-1/2'>
    <input
      type='text'
      placeholder='Last Name'
      value={lastname}
      onChange={(e) => setlastname(e.target.value)}
      className={`p-2 ${errors.lastname ? 'border-red-500' : 'border-gray-300'} border-2 bg-white text-black rounded`}
    />
    {errors.lastname && <p className='text-red-500 mt-2 text-sm'>{errors.lastname}</p>}
  </div>
</div>

<div className='flex flex-col lg:flex-row gap-4'>
  <div className='flex flex-col w-full lg:w-1/2'>
    <input
      type='email'
      value={email}
      placeholder='Email'
      onChange={(e) => setemail(e.target.value)}
      className={`p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} border-2 bg-white text-black rounded w-full`}
    />
    {errors.email && <p className='text-red-500 text-sm mt-2'>{errors.email}</p>}
  </div>
  <div className='flex flex-col w-full lg:w-1/2'>
    <input
      type='text'
      value={phone}
      placeholder='Phone Number'
      onChange={(e) => setphone(e.target.value)}
      className={`p-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'} border-2 bg-white text-black rounded w-full`}
    />
    {errors.phone && <p className='text-red-500 text-sm mt-2'>{errors.phone}</p>}
  </div>
</div>

<div className='flex flex-col lg:flex-row gap-4'>
  <div className='flex flex-col w-full lg:w-1/2'>
    <input
      type='date'
      value={dob}
      placeholder='Date Of Birth'
      onChange={(e) => setdob(e.target.value)}
      className={`p-2 ${errors.dob ? 'border-red-500' : 'border-gray-300'} border-2 bg-white text-black rounded w-full`}
    />
    {errors.dob && <p className='text-red-500 text-sm mt-1'>{errors.dob}</p>}
  </div>
  <div className='flex flex-col w-full lg:w-1/2'>
    <select
      value={gender}
      onChange={(e) => setgender(e.target.value)}
      className={`p-2 ${errors.gender ? 'border-red-500' : 'border-gray-300'} border-2 bg-white text-black rounded w-full`}
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Others">Others</option>
    </select>
    {errors.gender && <p className='text-red-500 text-sm mt-1'>{errors.gender}</p>}
  </div>
</div>

          <div className='flex flex-col lg:flex-row gap-4'>
              <div className='flex flex-col w-full '>
              <input
                  type='password'
                  value={password}
                  placeholder='Password'
                  onChange={(e) => setpassword(e.target.value)}
                  className={`border-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} p-3 bg-white text-black rounded w-full`}
              />
              {errors.password && <p className='text-red-500 text-sm mt-2'>{errors.password}</p>}
              </div>
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
