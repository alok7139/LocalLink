import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Navigate, useParams , useNavigate, Link } from 'react-router-dom';

function Yourtutor() {
  const { isauthenticated, setisauthenticated } = useContext(Context);
  const {id} = useParams();
  const navigate = useNavigate();
  
  const [allusertutor, setallusertutor] = useState([])

  useEffect(() => {
      const fetchtutor = async() => {
           try {
             await axios.get("http://localhost:3000/api/v1/get/alluser/tutor" , {withCredentials:true})
             .then((res) => {
              setallusertutor(res.data);
             })
           } catch (error) { 
             toast.error(error.response.data.message);
           }
      }
      fetchtutor();
  } , [])

  const deleteservice = async(id) => {
      try {
         await axios.delete(`http://localhost:3000/api/v1/get/delete/${id}` , {withCredentials:true})
         .then((res) => {
            
            setallusertutor((prevdata) => ({
              ...prevdata , 
              allusertutor : prevdata.allusertutor.filter((item) => id !== item._id)
            }) )
            toast.success(res.data.message);
         })
      } catch (error) {
         toast.error(error.response.data.message);
      }
  } 

  // if(!isauthenticated){
  //   return navigate('/login');
  // }


  return (
    <div className='mt-48 mb-20 font-serif'>
    <div className='flex justify-center flex-col items-center mb-10 gap-5'>
      <h1 className='text-4xl font-bold font-serif text-center'>Your Service</h1>
    </div>

    <div className='flex lg:p-5 p-4 flex-wrap justify-center items-center gap-5'>
      {allusertutor && allusertutor.allusertutor &&  allusertutor.allusertutor.length>0 ? allusertutor.allusertutor.map((item) => (
        <div 
          key={item._id} 
          className='bg-white rounded-xl border shadow-md p-3 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]  hover:shadow-lg transition-all duration-500'>
          {/* <div>
            <img src={item.localeventsvg.url} alt={item.localeventname} className='w-full h-72 object-cover rounded-t-lg' />
          </div> */}
          <div className='p-3'>
            <p className='font-bold text-lg'><span className='font-thin'>Tutor Provider Name : </span> {item.tutorname}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Tutor Type : </span> {item.typeoftutor}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Subject : </span> {item.subject}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Tutor Fee : </span>{item.tutorfee} {item.time}</p>
            <p className='font-bold text-lg'><span className='font-thin'>Phone Number : </span>{item.phone}</p>
          </div>
          <div className='flex flex-col lg:flex-row gap-2 justify-between items-center mt-1'>
  <Link to={`/update/tutor/${item._id}`} className='w-full lg:w-auto'>
    <button className='bg-blue-500 text-white py-2 px-4 rounded-lg w-full sm:w-auto'>Update</button>
  </Link>
 
  <button 
    className='bg-red-500 text-white py-2 px-4 rounded-lg w-full sm:w-auto' 
    onClick={() => deleteservice(item._id)}>
    Delete
  </button>

</div>

        </div>
      ))  :
      <h1>You didn't post any Service yet</h1> 
      }
    </div>
  </div>
  )
}

export default Yourtutor
