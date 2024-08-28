import { lazy, Suspense, useState } from 'react'
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
export const Localevents = lazy(() => import("./Services/Localevents"))
export const Lostpets = lazy(() => import("./Services/Lostpets"))
export const Tutoring  = lazy(() => import("./Services/Tutoring"))
export const Handyman = lazy(() => import("./Services/Handyman"))
export const Sales = lazy(() => import("./Services/Sales")) 
export const Gardening = lazy(() => import("./Services/Gardening"))
export const Register = lazy(() => import("./components/Register"))

function App() {

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
       </Routes>
       <Footer/>
       <ToastContainer position='bottom-left' transition={Bounce} autoClose={5000}/>
       </Suspense>
    </>
  )
}

export default App
