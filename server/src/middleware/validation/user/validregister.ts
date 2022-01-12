import { Request, Response, NextFunction } from "express";

import User from '../../../data/models/user'

const validRegister = async (req: Request, res: Response, next: NextFunction) => {

    const { nick, email, password, confirm } = req.body;

    var symbols = ["<", ">", ":", "{", "[", "^", "}", "]", "`", "|", "°", "¬", "!", '"', "$", "(", ")", "%", "&", "/", "=", "?", "'", "¡", "¿", "*", "+", "~"]

    try {

        if (!nick || !email || !password || !confirm) {
            return res.status(401).json({ message: "There are incomplet credentials." })
        }

        if (nick.length < 3) {
            return res.status(401).json({ message: "The nick must be al least three characters." })
        }
        if (nick.length > 30) {
            return res.status(401).json({ message: "The nick cannot be more than thirty characters." })
        }

        const emailValid = validateEmail(email)
        if (!emailValid) {
            return res.status(401).json({ message: "The email has an incorrect format." })
        }

        if (password.length < 6) {
            return res.status(401).json({ message: "The password must be more than five characters." })
        }

        for (var i = 0; i < password.length; i++) {
            for (var j = 0; j < symbols.length; j++) {
                if (password[i] == symbols[j]) {
                    return res.status(401).json({ message: "If you want to use symbols, use , ; . # @." })
                }
            }
        }

        if (password !== confirm) {
            return res.status(401).json({ message: "The passwords do not match." })
        }

        const nickExists = await User.findOne({ nick })
        if (nickExists) {
            return res.status(401).json({ message: "The nick already exists." })
        }
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.status(401).json({ message: "The email already exists." })
        }

        next();

} catch (error: any) {
    return res.status(500).json({ message: error.message })
}

}

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export default validRegister