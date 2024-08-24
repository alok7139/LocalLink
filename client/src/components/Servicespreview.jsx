import React from 'react'
import data from './preview'
import ImageSlider from './Imageslider'
 

function Servicespreview() {
  return (
    <>
     <div className='mt-12'>
        <div className='flex flex-col justify-center items-center m-5 p-5'>
        <div >
          <div className='flex justify-center items-center'>
             <h1 className='font-serif md:text-5xl  text-3xl font-bold flex flex-col'>
             <span className=''>Get the most out of</span>
              <span>your neighborhood</span>
               <span>with LocalLink</span>
             </h1>

             
          </div>
          
        </div>

         <div className='flex flex-col justify-center items-center mt-10'>
             <div className='flex flex-row items-center justify-center gap-5'>
             <h1 className='  font-bold text-3xl'>Local Events :</h1>
             <p className='mt-1'>Users can create and participate in discussions about local events happening in their neighborhood, such as block parties, community meetings, or festivals.</p>
             </div>
             <div className='flex flex-row items-center justify-center gap-5 mt-8'>
             <h1 className='  font-bold text-3xl'>Gardening Services :</h1>
             <p className='mt-1'> A dedicated section where neighbors can offer or inquire about gardening services, share tips, and discuss community gardening projects.</p>
             </div>
             <div className='flex flex-row items-center justify-center gap-5 mt-8'>
             <h1 className='  font-bold text-3xl'>Lost Pets :</h1>
             <p className='mt-1'>A place to post and find information about lost or found pets in the neighborhood, helping reunite pets with their owners.</p>
             </div>
             <div className='flex flex-row items-center justify-center gap-5 mt-8'>
             <h1 className='  font-bold text-3xl'>Tutoring :</h1>
             <p className='mt-1'>A space where neighbors can offer or seek tutoring services, whether it's for school subjects, languages, music lessons, or other educational needs.</p>
             </div>
             <div className='flex flex-row items-center justify-center gap-5 mt-8'>
             <h1 className='  font-bold text-3xl'>Handyman :</h1>
             <p className='mt-1'>Users can ask for recommendations or offer handyman services, such as home repairs, electrical work, or plumbing, within the neighborhood.</p>
             </div>
             <div className='flex flex-row items-center justify-center gap-5 mt-8'>
             <h1 className='  font-bold text-3xl'>Sales :</h1>
             <p className='mt-1'>Neighbors can list items they are selling or announce garage sales, making it easy to buy and sell within the community.</p>
             </div>
         </div>

         <div className='mt-10'> 
          <button className='rounded-lg bg-purple-800 m-4 text-white p-4 text-center'>
            SIgn up
          </button>
         </div>
        </div>
     </div>
    </> 

  )
}

export default Servicespreview
