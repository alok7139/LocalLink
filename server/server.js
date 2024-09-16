import cloudinary from 'cloudinary'
import app from './app.js'
import cluster from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';


const numCPUs = availableParallelism();

console.log(numCPUs);



cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


// if(cluster.isPrimary){
//     console.log(`Primary ${process.pid} is running`);
//     for(let i=0;i<numCPUs;i++){
//         cluster.fork();
//     }
// }
// else{
    
//     app.get("/" , (req,res) => {
//         return res.json({
//             message: `server is running on process id ${process.pid}`
            
//         })
//         // console.log(process.pid);
//     })

//     app.listen((process.env.PORT) , () => {
//         console.log(`server is running on ${process.env.PORT}`)
//     })
// console.log(`Worker ${process.pid} started`);
// }

app.listen((process.env.PORT) , () => {
    console.log(`server is running on ${process.env.PORT}`)
})



