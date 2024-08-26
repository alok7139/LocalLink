class ErrorHandler extends Error{
    constructor(message , statuscode){
        super(message);
        this.statuscode = statuscode;
    }
}

export const errormiddleware = (err,req,res,next) => {
    err.message = err.message || "Internal Server Error",
    err.statuscode = err.statuscode || 500;

    if(err.name === "CastError"){
        const message = `Invalid ${err.path}`
        err = new ErrorHandler(message,400)
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} enter`
        err = new ErrorHandler(message , 400)
    }

    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is Invalid , try again`
        err = new ErrorHandler(message , 400)
    }
    
    if(err.name === "JsonWebExpiredError"){
        const message = "Json web Token is Expired, Try again!";
        err = new ErrorHandler(message,400);
    }

    return res.status(err.statuscode).json({
        success:false,
        message:err.message,
    })

}

export default ErrorHandler;