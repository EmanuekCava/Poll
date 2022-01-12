import { Request, Response, NextFunction } from "express";

const validLogin = (req: Request, res: Response, next: NextFunction) => {

    const { nick, password } = req.body;

    try {

        if(!nick || !password) {
            return res.status(500).json({ message: "There are incomplet credentials." })
        }

        next();
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export default validLogin

