// import mongoose from "mongoose";



// const UserSchema = new mongoose.Schema(
//     {
//         _id:{type:String,required:true},
//         name:{type:String,required:true},
//         email:{type:String,required:true},
//         image:{type:String,required:false}
//     },
//     {timestamps:true}
// );

// const User = mongoose.models.User || mongoose.model("User",UserSchema)

// export default User;

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Clerk ID
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"] 
    },
    image: { type: String }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
