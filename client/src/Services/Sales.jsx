import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../main';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Sales() {
  const { isauthenticated, setisauthenticated } = useContext(Context);
  const navigate = useNavigate();
  const [allsale, setallsale] = useState([])

  useEffect(() => {
    const fetchsale = async() => {
      try {
         await axios.get("http://localhost:3000/api/v1/get/allsale/post" , {withCredentials:true})
         .then((res) => {
          setallsale(res.data);
         })
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchsale();
  } , [])



  return (
    <div className='mt-48 mb-20 font-serif'>
    <div className='flex justify-center flex-col items-center mb-10 gap-5'>
      <h1 className='text-4xl font-bold font-serif text-center'>Sell Something</h1>
      <div className='flex flex-row justify-center items-center gap-4'>
        <div className='bg-gray-100'>
          {
            isauthenticated ? 
            <Link to={'/register/sale'}><button className='p-2 bg-white rounded-lg text-blue-500 cursor-pointer'><h1>Sell</h1></button></Link>
            : <button className='p-2 bg-white rounded-lg text-gray-500 cursor-not-allowed'>Sell</button>
          }
        </div>
         {isauthenticated ?
          <Link to={'/your/sale/service'}> <button className='p-2 text-blue-500 cursor-pointer'>Your sell item</button></Link>
          : <button className='p-2 text-gray-500 cursor-not-allowed'>Your sell item</button> 
        }
      </div>
    </div>
 
    <div className='flex lg:p-5 p-4 flex-wrap justify-center items-center gap-5'>
      {allsale.allsale && allsale.allsale.map((item) => (
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
          </div>
          
          {/* {
          isauthenticated ? 
          <Link to={`#`}>
          <button className='bg-red-500 text-white py-2 px-4 rounded-lg mt-4 w-full'>Book Service</button>
        </Link> :
         <button className='bg-gray-300 text-white py-2 hover:tex disabled:border-gray-300 px-4 rounded-lg mt-4 w-full cursor-not-allowed'>Book Service</button>
        } */}
           
        </div>
      ))}
    </div>
  </div>
  )
}

export default Sales
