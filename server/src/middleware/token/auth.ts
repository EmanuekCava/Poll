import { /*Request,*/Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

import User from '../../data/models/user'

// import { UserRequest } from '../../interface/request'
import { IValidation } from '../../interface/validation'

const { JWT } = process.env;

const auth = async (req: any, res: Response, next: NextFunction) => {

    try {

        const token = req.headers.authorization?.split(" ")[1]
        if(!token) {
            return res.status(500).json({ message: "The token does not exists." })
        }

        const validation = jwt.verify(token, `${JWT}`) as IValidation
        if(!validation) {
            return res.status(500).json({ message: "The token does not match." })
        }

        req.user = validation.id;

        const user = await User.findById(req.user)
        if(!user) {
            return res.status(500).json({ message: "User does not exists." })
        }

        next();
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export default auth