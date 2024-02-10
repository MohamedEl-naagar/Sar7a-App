import express from 'express'
import { addMessage,getMessage } from './message.controller.js'
import { auth } from '../../middleware/auth.js'
const messageRoutes = express.Router()



messageRoutes.post('/',addMessage)
messageRoutes.get('/getMessages',auth,getMessage)


export default messageRoutes