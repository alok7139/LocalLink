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
              console.log(res)
              toast.success(res.data.message);
            //   navigate('/lostpets');
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
        <h2 className='mb-4 text-xl font-semibold text-blue-200 underline'>Pet Image</h2>
        <img
          src={
            petsvgpreview
              ? petsvgpreview
              : '/petpreview.png'
          }
          alt="pet"
          className='w-full h-64 object-cover rounded-sm'
        />
        <input type='file' className='mt-4 w-full p-2 border rounded-lg' onChange={handlesvg} />
      </div>
  
      <div className='w-full md:w-2/3 lg:w-2/3 space-y-4'>
        <input
          type='text'
          className='w-full p-2 border rounded-lg'
          value={petowner}
          placeholder='Pet Owner Name'
          onChange={(e) => setpetowner(e.target.value)}
        />
        
          <input
            type='text'
            className='w-full p-2 border rounded-lg'
            value={petname}
            placeholder='Pet Name'
            onChange={(e) => setpetname(e.target.value)}
          />
          
        <input
          type='text'
          className='w-full p-2 border rounded-lg'
          value={phone}
          placeholder='Enter the Phone No'
          onChange={(e) => setphone(e.target.value)}
        />
        <input
          type='text'
          className='w-full p-2 border rounded-lg'
          value={reward}
          placeholder='Expected Reward'
          onChange={(e) => setreward(e.target.value)}
        />
        <input
          type='text'
          className='w-full p-2 border rounded-lg'
          value={address}
          placeholder='Enter the Address'
          onChange={(e) => setaddress(e.target.value)}
        />
        <input
          type='text'
          className='w-full p-2 border rounded-lg'
          value={city}
          placeholder='Enter the City'
          onChange={(e) => setcity(e.target.value)}
        />
        
        <textarea
          rows="2"
          value={message}
          placeholder="Message"
          className={`text-black  w-full p-2 border rounded-lg`}
          onChange={(e) => setmessage(e.target.value)}
        />

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
