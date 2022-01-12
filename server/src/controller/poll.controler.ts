import { Request, Response } from 'express'

import Poll, { IPoll } from '../data/models/poll'

// import { UserRequest } from '../interface/request'

export const allPolls = async (req: any, res: Response) => {

    try {

        const showAllPolls = await Poll.find()

        res.json(showAllPolls)

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const polls = async (req: any, res: Response) => {

    try {

        const showPolls = await Poll.find({ nickId: req.user })

        res.json(showPolls)

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const getPoll = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const showPoll = await Poll.findById(id).populate('nickId', 'nick')

        res.json(showPoll)

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const createPoll = async (req: any, res: Response) => {

    const { question, optionOne, optionTwo } = req.body;

    try {

        const newPoll: IPoll = new Poll({
            question,
            optionOne,
            optionTwo,
            nickId: req.user
        })

        const savePoll = await newPoll.save()

        res.json({
            poll: savePoll,
            message: "The poll was uploaded successfully."
        })

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const removePoll = async (req: any, res: Response) => {

    const { id } = req.params;

    try {

        const pollUser = await Poll.findOne({ _id: id, user: req.user })

        if (!pollUser) {
            return res.status(401).json({ message: "You cannot delete this poll." })
        }

        await Poll.findByIdAndDelete(id)

        res.json({ message: "The poll was removed successfully." })

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const updatePoll = async (req: Request, res: Response) => {

    const { question, options } = req.body;
    const { id } = req.params;

    try {

        const pollUpdated = {
            question,
            options
        }

        const savePollUpdated = await Poll.findByIdAndUpdate(id, pollUpdated, {
            new: true
        })

        res.json({
            poll: savePollUpdated,
            message: "The poll was updated successfully."
        })

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const chooseOptionOne = async (req: any, res: Response) => {

    const { id } = req.params;

    try {

        // const pollLiked = await Poll.find({ _id: id, nickId: req.user })

        // if(pollLiked?.optionOne.votes.length > 0) {
        //     return res.status(401).json({ message: "You have already liked this poll." })
        // }

        const poll = await Poll.findById(id)

        const pollVote = poll?.optionOne.votes.push(req.user)

        const data = await Poll.findByIdAndUpdate(id, {
            pollVote
        }, {
            new: true
        })

        console.log(data)
        res.json("Like")

    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}