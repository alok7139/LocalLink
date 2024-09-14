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
        reader.onload(() => {
            setsalesvg(file);
            setsalesvgpreview(reader.result);
        })
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
            await axios.post("http://localhost:3000/api/v1/post/sale/service" , formdata , { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } } )
            .then((res) => {
                toast.success(res.data.message);
                setname('')
                setaddress('')
                setsalecost('')
                setdescription('')
                setphone('')
                setsalesvgpreview('');
            })
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }




  if(!isauthenticated){
    return navigate('/login')
  }
  return (
    <div>
      Register
    </div>
  )
}

export default Registersale
