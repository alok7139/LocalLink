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
            toast.success(res.data);
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
      <h2 className='mb-4 text-xl font-semibold text-blue-200 underline'>Garden Preview</h2>
      <img
        src={
            gardensvgpreview
            ? gardensvgpreview
            : 'https://www.midwestliving.com/thmb/8ymIsj_GY_8hBhuWCdDydjVDKEw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/100846895_preview-2000-f954404babaa44138a0159a6ba9ab399.jpg'
        }
        alt="garden"
        className='w-full h-64 object-cover rounded-sm'
      />
      <input type='file' className='mt-4 w-full p-2 border rounded-lg' onChange={handlesvg} />
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
