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
        await axios.get(`http://localhost:3000/api/v1/get/handyman/details/${id}` , {withCredentials:true})
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
  })

  const updateservice = async() => {
      const formdata = new FormData();
      formdata.append("name" , name)
      formdata.append("fee" , fee)
      formdata.append("phone" , phone)
      formdata.append("typeofservice" , typeofservice)
      formdata.append("address" , address);
      try {
        await axios.put(`http://localhost:3000/api/v1/update/service/${id}` , formdata , {withCredentials:true , headers:{"Content-Type" : "application/json"}}  )
        .then((res) => {
          toast.success(res.data.message);
          navigate('/your/handyman/service')
        })
      } catch (error) {
        toast.error(error.response.data.message);
      }
  }

  return (
    <div>
      Updateservice
    </div>
  )
}

export default Updateservice
