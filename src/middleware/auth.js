import jwt from 'jsonwebtoken'


export const auth = (req,res,next)=>{

    let token = req.header('token')
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
        if(err) res.json({message:"token invalid",err})
        req.userId = decoded.id;
        next()
    })
}