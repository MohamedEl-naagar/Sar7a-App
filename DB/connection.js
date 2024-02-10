import mongoose from "mongoose";

export function connection(){

    mongoose.connect('mongodb://127.0.0.1:27017/saraha')
    .then(()=>{
        console.log('Data Base connected')
    }).catch((err)=>{
        console.log(err)
    })


}