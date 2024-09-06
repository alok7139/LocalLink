import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';

function Bookevent() {
    
    const { isauthenticated, setisauthenticated } = useContext(Context);
    const navigate = useNavigate();
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [alreadybooked, setalreadybooked] = useState(false)
    const [errors, seterrors] = useState({name: '' , email: '' , phone:''})

   const validateform = () => {
    const newerror = {};
    if(!name){
        newerror.name = 'Name is required'
    }
    if(!email){
        newerror.email = 'Email is required'
    }
    if(!phone){
        newerror.phone = 'Phone Number is required'
    }

    return newerror;
   }

   const handleform = (e) => {
    e.preventDefault();

    const validate=  validateform();
    if(Object.keys(validate).length > 0){
        seterrors(validate);
        return;
    }
   }



    if(!isauthenticated){
        return navigate('/login');
    }

  return (
    <div className='mt-48'>
      Bookevent
    </div>
  )
}

export default Bookevent
