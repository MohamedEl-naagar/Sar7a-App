import { Schema, Types, model } from "mongoose";

const messageSchema = new Schema({
    messageText: {
        type: String,
        minLength: [3,"name is too short"],
        required: true
    },
    recievedId: {
        type:Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

 const messageModel = model("Message",messageSchema)

 export default messageModel