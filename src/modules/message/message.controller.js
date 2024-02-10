import userModel from "../../../DB/models/user.model.js"
import messageModel from "../../../DB/models/message.model.js"
import { sendEmail } from "../../email/sendEmail.js"
import { handleError } from "../../middleware/handleAsyncError.js"


// Add Message 
const addMessage =handleError( async (req,res)=>{
    let {messageText,recievedId} = req.body
    let checkexist = await userModel.findById({_id:recievedId})
    if(checkexist){
        let mess = await messageModel.insertMany({messageText,recievedId})
        res.json({message:"send",mess})
    }else{
        res.json({message:"not exist"})
    }
})


// GET All Message
const getMessage = async(req,res)=>{
          let messages =await messageModel.find({recievedId:req.userId})
            res.json({message:messages})
        }
 

export{
    addMessage,
    getMessage
}