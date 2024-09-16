import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function CreateHandyservice() {

    const { isauthenticated, setisauthenticated } = useContext(Context);
    const navigate = useNavigate();

    const [name, setname] = useState('')
    const [typeofservice, settypeofservice] = useState('')
    const [address, setaddress] = useState('')
    const [phone, setphone] = useState('')
    const [fee, setfee] = useState('')
    const [error, seterror] = useState({name:'' , typeofservice:'' , address: '' , phone:'' , fee:'' });

    const validationForm = () => {
        const newerror = {};
        if(!name){
            newerror.name = 'Service Provider Name ';
        }
        if(!typeofservice){
            newerror.typeofservice = 'Service type';
        }
        if(!address){
            newerror.address = 'Address is required';
        }
        if(!phone){
            newerror.phone = 'Phone Number is required';
        }
        if(!fee){
            newerror.fee = 'Service Fee is required'
        }
        return newerror;
    }

    const handleservice = async(e) => {
        e.preventDefault();

        const validationform = validationForm();
        if(Object.keys(validationform).length > 0){
            seterror(validationform);
            return;
        }
        const formdata = new FormData();
        formdata.append("name" , name);
        formdata.append("typeofservice" , typeofservice);
        formdata.append("address" , address);
        formdata.append("phone" , phone);
        formdata.append("fee" , fee);

        try {
            await axios.post("https://locallink.onrender.com/api/v1/post/handyman/service" , formdata , { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }  )
            .then((res) => {
                toast.success(res.data.message);
                setname('')
                setaddress('')
                setfee('')
                setphone('') 
                settypeofservice('')
                navigate('/create/handyman/service')
            })
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }

    if(!isauthenticated){
        return navigate('/login')
    }

    

  return (
    <div className='mt-48 mb-10 px-4 sm:px-8 font-serif'>
    <div className='flex justify-center flex-col items-center mb-10 gap-5'>
      <h1 className='text-2xl md:text-4xl font-bold text-center'>Post Your Service</h1>
    </div>
  
    <div className='flex flex-col justify-center items-start md:items-start lg:items-center'>
      
  
      <div className='w-full md:w-2/3 lg:w-2/3 space-y-4'>
      <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full ${error.name ? 'border-red-500' : 'border-gray-300'}  p-2 border rounded-lg`}
          value={name}
          placeholder='Service Provider Name'
          onChange={(e) => setname(e.target.value)}
        />
        {error.name && <p className='text-red-500 mt-2 text-sm'>{error.name}</p>}
        </div>

        <div className='flex flex-col w-full'>
          <input
            type='text'
            className={`w-full ${error.typeofservice ? 'border-red-500' : 'border-gray-300'} p-2 border rounded-lg`}
            value={typeofservice}
            placeholder='Service type'
            onChange={(e) => settypeofservice(e.target.value)}
            
          />
          {error.typeofservice && <p className='text-red-500 mt-2 text-sm'>{error.typeofservice}</p>}
          </div>
           <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full ${error.fee ? 'border-red-500' : 'border-gray-300'} p-2 border rounded-lg`}
          value={fee}
          placeholder='Enter the Service Fee'
          onChange={(e) => setfee(e.target.value)}
        />
        {error.fee && <p className='text-red-500 mt-2 text-sm'>{error.fee}</p>}
        </div>
        <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full p-2 border rounded-lg ${error.address ? 'border-red-500' : 'border-gray-300'}`}
          value={address}
          placeholder='Enter the Address'
          onChange={(e) => setaddress(e.target.value)}
        />
        {error.address && <p className='text-red-500 mt-2 text-sm'>{error.address}</p>}
        </div>
        <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full p-2 border rounded-lg ${error.phone ? 'border-red-500' : 'border-gray-300'}`}
          value={phone}
          placeholder='Enter the Phone No'
          onChange={(e) => setphone(e.target.value)}
        />
        {error.phone && <p className='text-red-500 mt-2 text-sm'>{error.phone}</p>}
        </div>
       
      </div>
    </div>
  
    <div className='flex justify-center items-center'>
      <button
        onClick={handleservice}
        className='mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg w-full md:w-auto'>
        Submit
      </button>
    </div>
  </div>
  )
}

export default CreateHandyservice
