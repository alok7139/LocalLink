import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Yourevents() {
  const { isauthenticated, setisauthenticated } = useContext(Context);
  const navigate = useNavigate();
  

  const [allevent, setallevent] = useState([]);

  useEffect(() => {
    const fetchevent = async() => {
        await axios.get("http://localhost:3000/api/v1/getall/events" , {withCredentials:true})
        .then((res) => {
          setallevent(res.data);
        }).catch((error) => {
          toast.error(error.response.data.message);
        })
    }
    fetchevent();
  } , [])

  const deleteevent = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/delete/event/${id}`, { withCredentials: true });
      toast.success("Deleted Successfully");
      setallevent((prevData) => ({
        ...prevData,
        myevents: prevData.myevents.filter((event) => event._id !== id),
      }));
    } catch (error) {
      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);
    }
  };
  


  if(!isauthenticated){
    return <Navigate to={'/login'} />
  }

  return (
    <div className='mt-48 mb-20 font-serif'>
    <div className='flex justify-center flex-col items-center mb-10 gap-5'>
      <h1 className='text-4xl font-bold font-serif text-center'>Your Events</h1>
    </div>

    <div className='flex lg:p-5 p-4 flex-wrap justify-center items-center gap-5'>
      {allevent && allevent.myevents &&  allevent.myevents.length>0 ? allevent.myevents.map((item) => (
        <div 
          key={item._id} 
          className='bg-white rounded-xl border shadow-md p-3 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]'>
          <div>
            <img src={item.localeventsvg.url} alt={item.localeventname} className='w-full h-36 object-cover rounded-t-lg' />
          </div>
          <div className='p-3'>
              <p className='font-bold text-lg'><span className='font-thin'>Event Name : </span> {item.localeventname}</p>
              <p className='font-bold text-lg'><span className='font-thin'>Start Date : </span> {new Date(item.startdate).toLocaleDateString()}</p>
              <p className='font-bold text-lg'><span className='font-thin'>End Date : </span> {new Date(item.enddate).toLocaleDateString()}</p>
              <p className='font-bold text-lg'><span className='font-thin'>Address : </span>{item.address} {" , "} {item.city}</p>
            </div>
          <div className='flex flex-col lg:flex-row gap-2 justify-between items-center mt-1'>
  <Link to={`/update/event/${item._id}`} className='w-full lg:w-auto'>
    <button className='bg-blue-500 text-white py-2 px-4 rounded-lg w-full sm:w-auto'>Update</button>
  </Link>
 
  <button 
    className='bg-red-500 text-white py-2 px-4 rounded-lg w-full sm:w-auto' 
    onClick={() => deleteevent(item._id)}>
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

export default Yourevents
