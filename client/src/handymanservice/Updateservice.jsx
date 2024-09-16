import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Updateservice() {

  const { isauthenticated } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setname] = useState('')
  const [address, setaddress] = useState('')
  const [fee, setfee] = useState('')
  const [phone, setphone] = useState('')
  const [typeofservice, settypeofservice] = useState('')

  useEffect(() => {
    const fetchdetails = async() => {
      try {
        await axios.get(`https://locallink.onrender.com/api/v1/get/handyman/details/${id}` , {withCredentials:true})
        .then((res) => {
          const fetchdetails = res.data.fetchhandyman;
          console.log(fetchdetails);
          setname(fetchdetails.name)
          setaddress(fetchdetails.address)
          setfee(fetchdetails.fee)
          setphone(fetchdetails.phone)
          settypeofservice(fetchdetails.typeofservice);
        })
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchdetails();
  },[id])

  const updateservice = async() => {
      const formdata = new FormData();
      formdata.append("name" , name)
      formdata.append("fee" , fee)
      formdata.append("phone" , phone)
      formdata.append("typeofservice" , typeofservice)
      formdata.append("address" , address);
      try {
        await axios.put(`https://locallink.onrender.com/api/v1/update/service/${id}` , formdata , {withCredentials:true , headers:{"Content-Type" : "application/json"}}  )
        .then((res) => {
          toast.success(res.data.message);
          navigate('/your/handyman/service')
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
      <h1 className='text-2xl md:text-4xl font-bold text-center'>Update Service</h1>
    </div>
  
    <div className='flex flex-col  justify-center items-start md:items-start lg:items-center'>
      
  
      <div className='w-full md:w-2/3 lg:w-2/3 space-y-4'>
      {/* <select value={typeoftutor} onChange={(e) => settypeoftutor(e.target.value)} className={`w-full p-2 border rounded-lg`} >
              <option value="" className='text-slate-300' >Tutor Type</option>
              <option value="Online Tutor">Online Tutor</option>
              <option value="Homework Helper">Homework Helper</option>
              <option value="Test Prep Tutor">Test Prep Tutor</option>
              <option value="Academics Tutor">Academics Tutor</option>
          </select> */}
        
        <input
          type='text'
          className='w-full p-2 border rounded-lg'
          value={name}
          placeholder='Service Provider Name'
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type='text'
          className='w-full p-2 border rounded-lg'
          value={typeofservice}
          placeholder='Service type'
          onChange={(e) => settypeofservice(e.target.value)}
        />
        <input
          type='text'
          className='w-full p-2 border rounded-lg'
          value={fee}
          placeholder='Enter the Service Fee'
          onChange={(e) => setfee(e.target.value)}
        />
        <input
          type='text'
          className='w-full p-2 border rounded-lg'
          value={address}
          placeholder='Enter the Address '
          onChange={(e) => setaddress(e.target.value)}
        />
        <input
          type='text'
          className='w-full p-2 border rounded-lg'
          value={phone}
          placeholder='Enter the Phone'
          onChange={(e) => setphone(e.target.value)}
        />
        
      </div>
    </div>
  
    <div className='flex justify-center items-center'>
      <button
        onClick={updateservice}
        className='mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg w-full md:w-auto'>
        Update Service
      </button>
    </div>
  </div>
  )
}

export default Updateservice
