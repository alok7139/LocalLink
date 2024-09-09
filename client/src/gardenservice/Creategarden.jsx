import React , { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import {  useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Creategarden() {
    const { isauthenticated } = useContext(Context);
  const navigate = useNavigate();
   
  const [houseowner, sethouseowner] = useState('')
  const [phone, setphone] = useState('')
  const [salary, setsalary] = useState('')
  const [address, setaddress] = useState('')
  const [city, setcity] = useState('')
  const [posteddate, setposteddate] = useState('')
  const [gardensvg, setgardensvg] = useState('')
  const [gardensvgpreview, setgardensvgpreview] = useState('')
  const [error,seterror] = useState({houseowner: '' , gardensvg: '' , salary: '' , posteddate :'' , address: '' , phone:'' , city:''});

  const validateForm = () => {
    const newerrors = {};
    if(!houseowner){
      newerrors.petname = 'Service Provider Name is required';
    }
    if(!posteddate){
      newerrors.petowner = 'Start Date is required';
    }
    if(!salary){
      newerrors.reward = 'Salary is required';
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
    if(!gardensvg){
      newerrors.petsvg = 'Garden Preview is required';
    }
    return newerrors;
  }


const handlesvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setgardensvg(file);
        setgardensvgpreview(reader.result);
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
      formdata.append("houseowner" , houseowner);
      formdata.append("phone" , phone);
      formdata.append("salary" , salary);
      formdata.append("address" , address);
      formdata.append("city",city)
      formdata.append("posteddate" , posteddate)
      formdata.append("gardensvg" , gardensvg);
      try {
        await axios.post("http://localhost:3000/api/v1/post/garden/service" , formdata , { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => {
            console.log(res)
            toast.success(res.data.message);
            navigate('/gardening');
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
    <h1 className='text-2xl md:text-4xl font-bold text-center'>Post Gardening Service</h1>
  </div>

  <div className='flex flex-col md:flex-row gap-10 justify-center items-start md:items-start lg:items-center'>
    <div className='w-full md:w-1/2 lg:w-1/3'>
      <h2 className='mb-4 text-xl font-semibold text-blue-200 underline'>Garden Image</h2>
      <img
        src={
            gardensvgpreview
            ? gardensvgpreview
            : 'https://images.vexels.com/media/users/3/131734/isolated/preview/05d86a9b63d1930d6298b27081ddc345-photo-preview-frame-icon.png'
        }
        alt="garden"
        className='w-full h-auto object-cover rounded-sm'
      />
      <input type='file' className={`mt-4 w-full p-2 border rounded-lg  ${error.gardensvg ? 'border-red-500' : 'border-gray-300'}`} onChange={handlesvg} />
      {error.gardensvg && <p className='text-red-500 mt-2 text-sm'>{error.gardensvg}</p>}
    </div>

    <div className='w-full md:w-2/3 lg:w-2/3 space-y-4'>
      <input
        type='text'
        className='w-full p-2 border rounded-lg'
        value={houseowner}
        placeholder='Service Provider Name'
        onChange={(e) => sethouseowner(e.target.value)}
      />
      
        <input
          type='date'
          className='w-full p-2 border rounded-lg'
          value={posteddate}
          placeholder='Start Date'
          onChange={(e) => setposteddate(e.target.value)}
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
        value={salary}
        placeholder='Expected Salary'
        onChange={(e) => setsalary(e.target.value)}
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

export default Creategarden
