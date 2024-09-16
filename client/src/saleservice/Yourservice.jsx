import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Yoursaleservice() {

    const { isauthenticated, setisauthenticated } = useContext(Context);
  const navigate = useNavigate();

  const [allusersale, setallusersale] = useState([])

  useEffect(() => {
        const fetchsale = async() => {
             try {
                await axios.get("https://locallink.onrender.com/api/v1/get/user/sale" , {withCredentials:true})
                .then((res) => {
                    setallusersale(res.data);
                })
             } catch (error) {
                toast.error(error.response.data.message)
             }
        }
        fetchsale();
  } , [])

  const deletesellitem = async(id) => {
    console.log(id);
       try {
         await axios.delete(`https://locallink.onrender.com/api/v1/delete/sale/service/${id}` , {withCredentials:true})
         .then((res) => {
            setallusersale((prevdata) => ({
                ...prevdata ,
                allusersale : prevdata.allusersale.filter((allusersale) => allusersale._id !==id )
            }))
            toast.success(res.data.message);
         })
       } catch (error) {
        toast.error(error.response.data.message);
       }
  }

  if(!isauthenticated){
    return navigate('/login');
  }

  return (
    <div className='mt-48 mb-20 font-serif'>
    <div className='flex justify-center flex-col items-center mb-10 gap-5'>
      <h1 className='text-4xl font-bold font-serif text-center'>Your Sell Item</h1>
    </div>

    <div className='flex lg:p-5 p-4 flex-wrap justify-center items-center gap-5'>
      {allusersale && allusersale.allusersale &&  allusersale.allusersale.length>0 ? allusersale.allusersale.map((item) => (
        <div 
          key={item._id} 
          className='bg-white rounded-xl border shadow-md p-3 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]  hover:shadow-lg transition-all duration-500'>
          <div>
            <img src={item.salesvg.url} alt={item.name} className='w-full h-72 object-cover rounded-t-lg' />
          </div>
          <div className='p-3'>
          <p className='font-bold text-lg'><span className='font-thin'></span>₹ {item.salecost}</p>
            <p className=' text-lg'><span className='font-thin'></span> {item.name}</p>
            <p className=' text-lg'><span className='font-thin'></span> {item.address}</p>
            <p className=' text-lg'><span className='font-thin'>+91 </span> {item.phone}</p>
            <p className=' text-lg'><span className='font-thin'></span> {item.description}</p>
            <p className=' text-lg'><span className='font-thin'></span> {new Date(item.date).toLocaleDateString()}</p>
          </div>
          <div className='flex flex-col lg:flex-row gap-2 justify-between items-center mt-1'>
  <Link to={`/update/sale/${item._id}`} className='w-full lg:w-auto'>
    <button className='bg-blue-500 text-white py-2 px-4 rounded-lg w-full sm:w-auto'>Update</button>
  </Link>
 
  <button 
    className='bg-red-500 text-white py-2 px-4 rounded-lg w-full sm:w-auto' 
    onClick={() => deletesellitem(item._id)}>
    Delete
  </button>

</div>

        </div>
      ))  :
      <h1>You didn't post any event yet</h1> 
      }
    </div>
  </div>
  )
}

export default Yoursaleservice
