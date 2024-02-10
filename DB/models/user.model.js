import {Schema, model} from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        minLength:[3,"name is too short"],
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: [4,"Password is too Short"],
        maxLength: [100,"Password is too large"]
    },
    verified: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})
 const userModel =model ("User",userSchema)

 export default userModel;
