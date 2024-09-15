import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../main';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Updatesale() {
    const { isauthenticated } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
  
    const [name, setname] = useState('')
    const [salecost, setsalecost] = useState('')
    const [address, setaddress] = useState('')
    const [phone, setphone] = useState('')
    const [description, setdescription] = useState('')
    const [salesvg, setsalesvg] = useState('')
    const [salesvgpreview, setsalesvgpreview] = useState('')

    useEffect(() => {
        const fetchdetails = async() => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/fetch/sale/${id}` , {withCredentials:true})
                    console.log(response)
                    const detail = response.data.saleservice;
                    console.log(detail)
                    setname(detail.name)
                    setphone(detail.phone)
                    setsalecost(detail.salecost)
                    setaddress(detail.address);
                    setdescription(detail.description)
                    setsalesvgpreview(detail.salesvg.url)
                    setsalesvg(detail.salesvg.url)
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetchdetails();
    } , [id])


    const handlesvg = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            setsalesvg(file)
            setsalesvgpreview(reader.result);
        }
    }

    const updatesale = async() => {
        const formdata = new FormData();
        formdata.append("name" , name)
        formdata.append("salecost" , salecost)
        formdata.append("address" ,  address)
        formdata.append("description" , description)
        formdata.append("phone" , phone)
        formdata.append("salesvg" , salesvg)

        try {
            await axios.put(`http://localhost:3000/api/v1/updated/sale/${id}` , formdata , { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } } )
            .then((res) => {
                toast.success(res.data.message)
                navigate('/sales')
            })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    if(!isauthenticated){
        return navigate('/login');
    }



  return (
    <div className='mt-48 mb-10 px-4 sm:px-8 font-serif'>
    <div className='flex justify-center flex-col items-center mb-10 gap-5'>
      <h1 className='text-2xl md:text-4xl font-bold text-center'>Update Service</h1>
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
          className='w-full h-full object-cover rounded-sm'
        />
        <input type='file' className='mt-4 w-full p-2 border rounded-lg' onChange={handlesvg} />
      </div>
  
      <div className='w-full md:w-2/3 lg:w-2/3 space-y-4'>
      <input
          type='text'
          className={`w-full p-2  border rounded-lg`}
          value={name}
          placeholder='Sell Object Name is required'
          onChange={(e) => setname(e.target.value)}
        />
        
        <input
          type='text'
          className={`w-full p-2 border rounded-lg`}
          value={salecost}
          placeholder='Estimated Sell Price'
          onChange={(e) => setsalecost(e.target.value)}
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
          className={`w-full p-2  border rounded-lg`}
          value={description}
          placeholder='Enter the Description'
          onChange={(e) => setdescription(e.target.value)}
        />
      </div>
    </div>
  
    <div className='flex justify-center items-center'>
      <button
        onClick={updatesale}
        className='mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg w-full md:w-auto'>
        Update Event
      </button>
    </div>
  </div>
  )
}

export default Updatesale
