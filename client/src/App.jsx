import { lazy, Suspense, useContext, useEffect, useState } from 'react'
import './App.css'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes , Route } from 'react-router-dom';
export const Home = lazy(() => import('./components/Home'));
export const Contact = lazy(() => import('./components/Contact'));
export const About = lazy(() => import('./components/About'));
export const Navbar = lazy(() => import('./components/Navbar'));
export const Footer = lazy(() => import('./components/Footer'));
import LOader from './components/Loader';
import { Context } from './main';
import axios from 'axios';
export const Yoursaleservice = lazy(() => import('./saleservice/Yourservice'))
export const Registersale = lazy(() => import('./saleservice/Registersale'))
export const Updatesale = lazy(() => import('./saleservice/Updatesale'))
export const Updateservice = lazy(() => import('./handymanservice/Updateservice'))
export const YourHandymanservice= lazy(() => import('./handymanservice/yourservice'))
export const CreateHandyservice = lazy(()=> import('./handymanservice/createservice'))
export const Createservice = lazy(() => import('./tutorservice/createservice'))
export const Yourtutor = lazy(() => import('./tutorservice/yourtutor'))
export const Updatetutor = lazy(() => import('./tutorservice/updatetutor'))
export const Booktutor = lazy(() => import('./tutorservice/booktutor'))
export const Createpetinfo = lazy(() => import('./lostpetservice/createpetinfo'))
export const Yourpetinfo = lazy(() => import('./lostpetservice/yourpetinfo'))
export const Creategarden = lazy(() => import('./gardenservice/Creategarden'))
export const Yourservice = lazy(() => import('./gardenservice/yourservice'))
export const Bookegarden = lazy(() => import('./gardenservice/Bookegarden'))
export const Updateevent = lazy(() => import('./serviceprovide/Updateevent'))
export const Bookevent =  lazy(() => import('./serviceprovide/Bookevent'))
export const Createevents = lazy(() => import('./serviceprovide/Createevents'))
export const Yourevents  = lazy(() => import('./serviceprovide/Yourevents'))
export const Login = lazy(() => import('./components/Login'))
export const Localevents = lazy(() => import("./Services/Localevents"))
export const Lostpets = lazy(() => import("./Services/Lostpets"))
export const Tutoring  = lazy(() => import("./Services/Tutoring"))
export const Handyman = lazy(() => import("./Services/Handyman"))
export const Sales = lazy(() => import("./Services/Sales")) 
export const Gardening = lazy(() => import("./Services/Gardening"))
export const Register = lazy(() => import("./components/Register"))

const customId = "custom-id-yes";

function App() {
  const {isauthenticated , setisauthenticated ,user, setuser} = useContext(Context)

  const notify = () => {
    toast("I cannot be duplicated!", {
      toastId: customId
    });
  }

  useEffect(() => {
    const fetchuser = async() => {
       try {
         const response = await axios.get("https://locallink.onrender.com/api/v1/user/getuser" , {withCredentials:true})
         setisauthenticated(true);
         setuser(response.data.user);
       } catch (error) {
          setisauthenticated(false)
          setuser({});
       }
    }
    fetchuser();
  } , [])

  return (
    <>
       <Suspense fallback={<LOader/>}>
       <Navbar/>
       <Routes>
         <Route path="/"  element = {<Home/>}/>
         <Route path='/contact' element={<Contact/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/localevents' element={<Localevents/>}/>
         <Route path='/lostpets' element={<Lostpets/>} />
         <Route path='/tutoring' element={<Tutoring/>} />
         <Route path='/handyman' element={<Handyman/>} />
         <Route path='/sales' element={<Sales/>} />
         <Route path='/gardening' element={<Gardening/>} />
         <Route path='/register'  element={<Register/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/create/event' element={<Createevents/>} />
         <Route path='/your/event' element={<Yourevents/>} />
         <Route path='/book/event/:id' element={<Bookevent/>} />
         <Route path='/update/event/:id' element={<Updateevent/>}/>
         <Route path='/garden/service/:id' element={<Bookegarden/>} />
         <Route path='/post/garden/service' element={<Creategarden/>} />
         <Route path='/your/service' element={<Yourservice/>} />
         <Route path='/missing/pet/info' element={<Createpetinfo/>}/>
         <Route path='/missing/your/pet' element={<Yourpetinfo/>} />
         <Route path='/create/service/tutor' element={<Createservice/>}/>
         <Route path='/your/tutor/service' element={<Yourtutor/>}/>
         <Route path='/update/tutor/:id' element={<Updatetutor/>}/>
         <Route path='/book/tutor/service/:id' element={<Booktutor/>}/>
         <Route path='/create/handyman/service' element={<CreateHandyservice/>}/>
         <Route path='/Update/handyman/:id' element={<Updateservice/>}/>
         <Route path='/your/handyman/service' element={<YourHandymanservice/>}/>
         <Route path='/your/sale/service' element={<Yoursaleservice/>} />
         <Route path='/register/sale' element={<Registersale/>}/>
         <Route path='/update/sale/:id' element={<Updatesale/>}/>
       </Routes>
       <Footer/>
       
       </Suspense>
       <ToastContainer position='bottom-left' transition={Bounce} autoClose={5000}
      //  position="top-right"
      //  autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       limit={1}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       />
    </>
  )
}

export default App
