import mongoose from "mongoose";

export const dbconnection = () => {
    mongoose.connect((process.env.MONGO_URI) , {
      dbName: "LocalLink",
    }).then(() => {
        console.log(`database is connected`)
    }).catch((error) => {
        console.log(`database ${error} occured`)
    })
}