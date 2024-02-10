import dotenv from 'dotenv'
import express from 'express'
import {connection} from './DB/connection.js'
import userRoutes from './src/modules/user/user.routes.js'
import messageRoutes from './src/modules/message/message.routes.js'
import { AppError } from './src/utils/appError.js'
import { globalError } from './src/utils/globalErrorHandle.js'
const app = express()
app.use(express.json())
dotenv.config({})

connection()

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/message',messageRoutes)

app.use('*',(req,res,next)=>{
    next(AppError(`invalid url ${req.originalUrl}`,404))
})

//Glogbal Error Handling
app.use(globalError)

app.listen(3000,()=>{
    console.log('server is start....')
})