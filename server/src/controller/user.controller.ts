import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User, { IUser } from '../data/models/user'

const { JWT } = process.env;

export const register = async (req: Request, res: Response): Promise<Response> => {

    const { nick, email, password } = req.body;
    
    try {

        const newUser: IUser = new User({
            nick,
            email,
            password
        })

        newUser.password = await newUser.hidePassword(newUser.password)

        const saveUser = await newUser.save()

        const token = jwt.sign({ id: saveUser._id }, `${JWT}`, {
            expiresIn: "72h"
        })

        return res.status(200).json({
            user: saveUser,
            message: "Welcome!",
            token
        })
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}
export const login = async (req: Request, res: Response): Promise<Response> => {

    const { nick, password } = req.body

    try {
        
        const user = await User.findOne({nick})

        if(!user) {
            return res.status(401).json({ message: "User does not exists." })
        }

        const validation = await bcrypt.compare(password, user.password)

        if(!validation) {
            return res.status(401).json({ message: "The credentials do not match." })
        }

        const token = jwt.sign({ id: user._id }, `${JWT}`, {
            expiresIn: "7d"
        })

        return res.status(200).json({
            user,
            message: "Welcome again!",
            token
        })
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const allUsers = async (req: Request, res: Response): Promise<Response> => {
    
    try {

        const showAllUsers = await User.find()

        return res.status(200).json(showAllUsers)
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}
export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    
    try {

        const showUser = await User.findById(id)

        return res.status(200).json(showUser)
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}
export const removeUser = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {

        await User.findByIdAndDelete(id)

        return res.status(200).json({
            message: "User removed successfully."
        })
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}