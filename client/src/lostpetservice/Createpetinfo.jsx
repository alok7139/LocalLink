import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Createpetinfo() {
    const { isauthenticated, setisauthenticated } = useContext(Context);
    const navigate = useNavigate();
    
    const [petname, setpetname] = useState('')
    const [petowner, setpetowner] = useState('')
    const [reward, setreward] = useState('')
    const [city, setcity] = useState('')
    const [address, setaddress] = useState('')
    const [message, setmessage] = useState('')
    const [phone, setphone] = useState('')
    const [petsvg, setpetsvg] = useState('')
    const [petsvgpreview, setpetsvgpreview] = useState('')
    const [error,seterror] = useState({petname: '' , petowner: '' , reward: '' , city :'' , address: '' , phone:'' , message:'' , petsvg:''});
    
    const validateForm = () => {
      const newerrors = {};
      if(!petname){
        newerrors.petname = 'Pet Name is required';
      }
      if(!petowner){
        newerrors.petowner = 'Pet owner Name is required';
      }
      if(!reward){
        newerrors.reward = 'Reward is required';
      }
      if(!message){
        newerrors.message = 'Message is required';
      }
      if(!address){
        newerrors.address = 'Address is required';
      }
      if(!phone){
        newerrors.phone = 'Phone Number is required';
      }
      if(!city){
        newerrors.city = 'City is required';
      }
      if(!petsvg){
        newerrors.petsvg = 'Pet Preview is required';
      }
      return newerrors;
    }

    const handlesvg = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setpetsvg(file)
            setpetsvgpreview(reader.result);
        }
    }

    const handleregister = async(e) => {
        e.preventDefault();

        const validateform = validateForm();
        if(Object.keys(validateform).length > 0){
          seterror(validateform);
          return;
        }

        const formdata = new FormData();
        formdata.append("petname" , petname);
        formdata.append("phone" , phone);
        formdata.append("petowner" , petowner);
        formdata.append("address" , address);
        formdata.append("city",city)
        formdata.append("message" , message)
        formdata.append("reward" , reward);
        formdata.append("petsvg" , petsvg);
        try {
          await axios.post("http://localhost:3000/api/v1/post/lost/pet" , formdata , { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } })
          .then((res) => {
              // console.log(res)
              toast.success(res.data.message);
              navigate('/lostpets');
          })
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }



    // if(!isauthenticated){
    //     return navigate('/login');
    // }



  return (
    <div className='mt-48 mb-10 px-4 sm:px-8 font-serif'>
    <div className='flex justify-center flex-col items-center mb-10 gap-5'>
      <h1 className='text-2xl md:text-4xl font-bold text-center'>Missing Pet Information</h1>
    </div>
  
    <div className='flex flex-col md:flex-row gap-10 justify-center items-start md:items-start lg:items-center'>
      <div className='w-full md:w-1/2 lg:w-1/3'>
        <h2 className='mb-4 text-xl font-semibold text-blue-300 underline'>Pet Preview</h2>
        <img
          src={
            petsvgpreview
              ? petsvgpreview
              : 'https://images.vexels.com/media/users/3/131734/isolated/preview/05d86a9b63d1930d6298b27081ddc345-photo-preview-frame-icon.png'
          }
          alt="pet"
          className={`w-full h-auto max-w-xl object-cover rounded-sm`}
        />
        <input type='file' className={`mt-4 w-full ${error.petsvg ? 'border-red-500' : 'border-gray-300'} p-2 border rounded-lg`} onChange={handlesvg} />
        {error.petsvg && <p className='text-red-500 mt-2 text-sm'>{error.petsvg}</p>}
      </div>
  
      <div className='w-full md:w-2/3 lg:w-2/3 space-y-4'>
      <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full ${error.petowner ? 'border-red-500' : 'border-gray-300'}  p-2 border rounded-lg`}
          value={petowner}
          placeholder='Pet Owner Name'
          onChange={(e) => setpetowner(e.target.value)}
        />
        {error.petowner && <p className='text-red-500 mt-2 text-sm'>{error.petowner}</p>}
        </div>

        <div className='flex flex-col w-full'>
          <input
            type='text'
            className={`w-full ${error.petname ? 'border-red-500' : 'border-gray-300'} p-2 border rounded-lg`}
            value={petname}
            placeholder='Pet Name'
            onChange={(e) => setpetname(e.target.value)}
            
          />
          {error.petname && <p className='text-red-500 mt-2 text-sm'>{error.petname}</p>}
          </div>
           <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full ${error.phone ? 'border-red-500' : 'border-gray-300'} p-2 border rounded-lg`}
          value={phone}
          placeholder='Enter the Phone No'
          onChange={(e) => setphone(e.target.value)}
        />
        {error.phone && <p className='text-red-500 mt-2 text-sm'>{error.phone}</p>}
        </div>
        <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full p-2 border rounded-lg ${error.reward ? 'border-red-500' : 'border-gray-300'}`}
          value={reward}
          placeholder='Expected Reward'
          onChange={(e) => setreward(e.target.value)}
        />
        {error.reward && <p className='text-red-500 mt-2 text-sm'>{error.reward}</p>}
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
          className={`w-full p-2 border rounded-lg ${error.city ? 'border-red-500' : 'border-gray-300'}`}
          value={city}
          placeholder='Enter the City'
          onChange={(e) => setcity(e.target.value)}
        />
        {error.city && <p className='text-red-500 mt-2 text-sm'>{error.city}</p>}
        </div>
        <div className='flex flex-col w-full'>
        <textarea
          rows="2"
          value={message}
          placeholder="Message"
          className={`text-black ${error.message ? 'border-red-500' : 'border-gray-300'}  w-full p-2 border rounded-lg`}
          onChange={(e) => setmessage(e.target.value)}
        />
        {error.message && <p className='text-red-500 mt-2 text-sm'>{error.message}</p>}
         </div>
      </div>
    </div>
  
    <div className='flex justify-center items-center'>
      <button
        onClick={handleregister}
        className='mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg w-full md:w-auto'>
        Submit
      </button>
    </div>
  </div>
  )
}

export default Createpetinfo
