import mongoose from "mongoose";

let cached=global.mongoose || {conn:null,promise:null};
global.mongoose = cached;//added

export default async function connectDB() {
    if(cached.conn) return cached.conn;

    if(!cached.promise){
        cached.promise=mongoose.connect(process.env.MONGODB_URI).then((mongoose)=>mongoose);

        try{
            cached.conn= await cached.promise;
        }catch(error){
            console.error("Error to connect MongoDB : ",error);
            cached.promise = null;//added
        }
    }
    return cached.conn;
}