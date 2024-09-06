import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Updateevent() {
    const {user, isauthenticated, setisauthenticated } = useContext(Context);
    const {id} = useParams();
    const [localeventname, setlocaleventname] = useState(user && user.localeventname)
    const [startdate, setstartdate] = useState(user && user.startdate)
    const [enddate, setenddate] = useState(user && user.enddate)
    const [owner, setowner] = useState(user && user.owner)
    const [address, setaddress] = useState(user && user.address)
    const [phone, setphone] = useState(user && user.phone)
    const [city, setcity] = useState(user && user.city)
    const [localeventsvg, setlocaleventsvg] = useState(user && user.localeventsvg && user.localeventsvg.url)
    const [localeventsvgpreview, setlocaleventsvgpreview] = useState(user && user.localeventsvg && user.localeventsvg.url)

    const handlesvg = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setlocaleventsvg(file)
            setlocaleventsvgpreview(reader.result)
        }
    }




 
    const handleupdate = async(id) => {
        const formdata = new FormData();
        formdata.append("localeventname" , localeventname)
        formdata.append("startdate" , startdate)
        formdata.append("enddate" , enddate);
        formdata.append("owner" , owner)
        formdata.append("address" , address)
        formdata.append("phone" , phone);
        formdata.append("city" , city)
        formdata.append("localeventsvg" , localeventsvg)
        try {
            const res = await axios.put(`http://localhost:3000/api/v1/update/event/${id}` , formdata ,{withCredentials:true , headers:{"Content-Type" : "multipart/form-data"}})
            toast.success(res.data.message);

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    if(!isauthenticated){
        return <Navigate to={'/login'} />
    }
  return (
    <div>
      Updateevent
    </div>
  )
}

export default Updateevent
