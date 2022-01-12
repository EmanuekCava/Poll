import { Request, Response, NextFunction } from "express";

const validPoll = (req: Request, res: Response, next: NextFunction) => {

    const { question, optionOne, optionTwo } = req.body;

    try {

        if(!question) {
            return res.status(401).json({ message: "You have to write a question." })
        }

        if(question.length < 3) {
            return res.status(401).json({ message: "The question has to have more than two characters." })
        }

        if(question.length > 120) {
            return res.status(401).json({ message: "The question has to have less than one hundred twenty characters." })
        }

        if(!optionOne.option || !optionTwo.option) {
            return res.status(401).json({ message: "The are incomplet options." })
        }

        next();
        
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export default validPoll