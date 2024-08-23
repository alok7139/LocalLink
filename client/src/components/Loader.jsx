import React from 'react'
import { Audio , FidgetSpinner  , BallTriangle } from 'react-loader-spinner'


function LOader() {
  return (
    
    <>
    <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
  <BallTriangle
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
</div>
    </>
  )
}

export default LOader
