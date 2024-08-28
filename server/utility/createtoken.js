

export const sendtoken = (user,message,res,statuscode) => {
   const token = user.generatejsonwebtoken();

   const options= {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000),
    httpOnly:true,
    sameSite:"None",
    secure:true
   }

   res.status(statuscode).cookie("usertoken" , token , options).json({
    success:true,
    user,message,token
   })
}