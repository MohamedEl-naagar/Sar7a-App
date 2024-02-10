import express from 'express'
import { signIn, signUp ,verifyEmail,deletUser } from './user.controller.js'

const userRoutes = express.Router()

userRoutes.post('/signUp',signUp)
userRoutes.post('/signIn',signIn)
userRoutes.get('/verify/:token',verifyEmail)
userRoutes.delete('/delete',deletUser)

export default userRoutes