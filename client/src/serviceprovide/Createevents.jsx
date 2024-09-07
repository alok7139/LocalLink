import React , { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import {  useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


function Createevents() {
  const { isauthenticated } = useContext(Context);
  const navigate = useNavigate();

  const [localeventname, setlocaleventname] = useState('');
  const [startdate, setstartdate] = useState('');
  const [enddate, setenddate] = useState('');
  const [owner, setowner] = useState('');
  const [address, setaddress] = useState('');
  const [phone, setphone] = useState('');
  const [city, setcity] = useState('');
  const [localeventsvg, setlocaleventsvg] = useState('');
  const [localeventsvgpreview, setlocaleventsvgpreview] = useState('');

  const handlesvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setlocaleventsvg(file);
      setlocaleventsvgpreview(reader.result);
    }

  }


  const handleregister = async(e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append('localeventname', localeventname);
    formdata.append('startdate', startdate);
    formdata.append('enddate', enddate);
    formdata.append('owner', owner);
    formdata.append('address', address);
    formdata.append('phone', phone);
    formdata.append('city', city);
    formdata.append('localeventsvg', localeventsvg);
    try {
      await axios.post("http://localhost:3000/api/v1/register/events" , formdata , { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } } )
      .then((res) => {
        toast.success(res.data.message);
        navigate('/');
      })
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if(!isauthenticated){
    navigate('/login');
  }
  
  return (
    <div className='mt-48 mb-10 px-4 sm:px-8 font-serif'>
  <div className='flex justify-center flex-col items-center mb-10 gap-5'>
    <h1 className='text-2xl md:text-4xl font-bold text-center'>Post Event</h1>
  </div>

  <div className='flex flex-col md:flex-row gap-10 justify-center items-start md:items-start lg:items-center'>
    <div className='w-full md:w-1/2 lg:w-1/3'>
      <h2 className='mb-4 text-xl font-semibold text-blue-200 underline'>Event Preview</h2>
      <img
        src={
          localeventsvgpreview
            ? localeventsvgpreview
            : 'https://www.day2trust.com/wp-content/uploads/2016/06/events.jpg'
        }
        alt={localeventname}
        className='w-full h-64 object-cover rounded-sm'
      />
      <input type='file' className='mt-4 w-full p-2 border rounded-lg' onChange={handlesvg} />
    </div>

    <div className='w-full md:w-2/3 lg:w-2/3 space-y-4'>
      <input
        type='text'
        className='w-full p-2 border rounded-lg'
        value={localeventname}
        placeholder='Enter the Event Name'
        onChange={(e) => setlocaleventname(e.target.value)}
      />
      <div className='flex flex-col sm:flex-row gap-4'>
        <input
          type='date'
          className='w-full sm:w-1/2 p-2 border rounded-lg'
          value={startdate}
          placeholder='Start Date'
          onChange={(e) => setstartdate(e.target.value)}
        />
        <input
          type='date'
          className='w-full sm:w-1/2 p-2 border rounded-lg'
          value={enddate}
          placeholder='End Date'
          onChange={(e) => setenddate(e.target.value)}
        />
      </div>
      <input
        type='text'
        className='w-full p-2 border rounded-lg'
        value={owner}
        placeholder='Enter the Event Holder Name'
        onChange={(e) => setowner(e.target.value)}
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
        value={phone}
        placeholder='Enter the Phone Number'
        onChange={(e) => setphone(e.target.value)}
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
      Update Event
    </button>
  </div>
</div>
  )
}

export default Createevents
