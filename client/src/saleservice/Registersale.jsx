import React , { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import {  useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Registersale() {
    const { isauthenticated } = useContext(Context);
    const navigate = useNavigate();

    const [name, setname] = useState('')
    const [salecost, setsalecost] = useState('')
    const [address, setaddress] = useState('')
    const [phone, setphone] = useState('')
    const [description, setdescription] = useState('')
    const [salesvg, setsalesvg] = useState('')
    const [salesvgpreview, setsalesvgpreview] = useState('')
    const [error, seterror] = useState({name:'' , salecost:'' , address:'' , phone: '' , description: '' , salesvg:''})


    const handlesvg = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            setsalesvg(file);
            setsalesvgpreview(reader.result);
        }
        console.log(file);
    }

    const validationForm = () => {
        const newerror= {};
        if(!name) newerror.name = 'Sell Object Name is required'
        if(!phone) newerror.phone = 'Phone Number is required'
        if(!description) newerror.description = 'Description is required'
        if(!salecost) newerror.salecost = 'Estimated Sell Price'
        if(!address) newerror.address = 'Address is required'
        if(!salesvg) newerror.salesvg = 'Image of Sell Item required'

        return newerror;
    } 

    const handlesale = async(e) => {
        e.preventDefault();

        const validateform = validationForm();
        if(Object.keys(validateform).length > 0){
            seterror(validateform);
            return;
        }

        const formdata = new FormData();
        formdata.append("name" , name)
        formdata.append("salecost" , salecost)
        formdata.append("address" ,  address)
        formdata.append("description" , description)
        formdata.append("phone" , phone)
        formdata.append("salesvg" , salesvg)

        try {
            await axios.post("https://locallink.onrender.com/api/v1/post/sale/service" , formdata , { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } } )
            .then((res) => {
                console.log(res.data.message);
                toast.success(res.data.message);
                navigate('/sales')
                // setname('')
                // setaddress('')
                // setsalecost('')
                // setdescription('')
                // setphone('')
                // setsalesvg('');
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
    <h1 className='text-2xl md:text-4xl font-bold text-center'>Sell</h1>
  </div>

  <div className='flex flex-col md:flex-row gap-10 justify-center items-start md:items-start lg:items-center'>
    <div className='w-full md:w-1/2 lg:w-1/3'>
      <h2 className='mb-4 text-xl font-semibold text-blue-200 underline'>Sell Item</h2>
      <img
        src={
          salesvgpreview
            ? salesvgpreview
            : 'https://images.vexels.com/media/users/3/131734/isolated/preview/05d86a9b63d1930d6298b27081ddc345-photo-preview-frame-icon.png'
        }
        alt={name}
        className='w-full h-auto max-w-xl object-cover rounded-sm'
      />
      <input type='file' className={`mt-4 ${error.salesvg ? 'border-red-500' : 'border-gray-300'} w-full p-2 border rounded-lg`} onChange={handlesvg} />
      {error.salesvg && <p className='text-red-500 mt-2 text-sm'>{error.salesvg}</p>}
    </div>

    <div className='w-full md:w-2/3 lg:w-2/3 space-y-4'>
      <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full p-2 ${error.name ? 'border-red-500' : 'border-gray-300'} border rounded-lg`}
          value={name}
          placeholder='Sell Object Name is required'
          onChange={(e) => setname(e.target.value)}
        />
        {error.name && <p className='text-red-500 mt-2 text-sm'>{error.name}</p>}
      </div>

      <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full p-2 ${error.salecost ? 'border-red-500' : 'border-gray-300'} border rounded-lg`}
          value={salecost}
          placeholder='Estimated Sell Price'
          onChange={(e) => setsalecost(e.target.value)}
        />
        {error.salecost && <p className='text-red-500 mt-2 text-sm'>{error.salecost}</p>}
      </div>

      <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full p-2 ${error.phone ? 'border-red-500' : 'border-gray-300'} border rounded-lg`}
          value={phone}
          placeholder='Enter the Phone Number'
          onChange={(e) => setphone(e.target.value)}
        />
        {error.phone && <p className='text-red-500 mt-2 text-sm'>{error.phone}</p>}
      </div>

      <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full p-2 ${error.address ? 'border-red-500' : 'border-gray-300'} border rounded-lg`}
          value={address}
          placeholder='Enter the Address'
          onChange={(e) => setaddress(e.target.value)}
        />
        {error.address && <p className='text-red-500 mt-2 text-sm'>{error.address}</p>}
      </div>
      
      <div className='flex flex-col w-full'>
        <input
          type='text'
          className={`w-full p-2 ${error.description ? 'border-red-500' : 'border-gray-300'} border rounded-lg`}
          value={description}
          placeholder='Enter the Description'
          onChange={(e) => setdescription(e.target.value)}
        />
        {error.description && <p className='text-red-500 mt-2 text-sm'>{error.description}</p>}
      </div>
    </div>
  </div>

  <div className='flex justify-center items-center'>
    <button
      onClick={handlesale}
      className='mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg w-full md:w-auto'>
      Submit
    </button>
  </div>
</div>

  )
}

export default Registersale
