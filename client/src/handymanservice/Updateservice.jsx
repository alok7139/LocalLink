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

  

  return (
    <div>
      Updateservice
    </div>
  )
}

export default Updateservice
