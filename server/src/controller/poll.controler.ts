import { Request, Response } from 'express'

import Poll, { IPoll } from '../data/models/poll'

export const allPolls = async (req: any, res: Response): Promise<Response> => {

    try {

        const showAllPolls = await Poll.find()

        return res.status(200).json(showAllPolls)

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const polls = async (req: any, res: Response): Promise<Response> => {

    try {

        const showPolls = await Poll.find({ nickId: req.user })

        return res.status(200).json(showPolls)

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const getPoll = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {

        const showPoll = await Poll.findById(id).populate('nickId', 'nick')

        return res.status(200).json(showPoll)

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const createPoll = async (req: any, res: Response): Promise<Response> => {

    const { question, optionOne, optionTwo } = req.body;

    try {

        const newPoll: IPoll = new Poll({
            question,
            optionOne,
            optionTwo,
            nickId: req.user
        })

        const savePoll = await newPoll.save()

        return res.status(200).json({
            poll: savePoll,
            message: "The poll was uploaded successfully."
        })

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const removePoll = async (req: any, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {

        const pollUser = await Poll.findOne({ _id: id, user: req.user })

        if (!pollUser) {
            return res.status(401).json({ message: "You cannot delete this poll." })
        }

        await Poll.findByIdAndDelete(id)

        return res.status(200).json({ message: "The poll was removed successfully." })

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const chooseOptionOne = async (req: any, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {

        const pollUpdate = await Poll.findByIdAndUpdate(id, {
            $push: {
                "optionOne.votes": req.user
            }
        }, {
            new: true
        })

        return res.status(200).json(pollUpdate)

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const chooseOptionTwo = async (req: any, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {

        const pollUpdate = await Poll.findByIdAndUpdate(id, {
            $push: {
                "optionTwo.votes": req.user
            }
        }, {
            new: true
        })

        return res.status(200).json(pollUpdate)

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}