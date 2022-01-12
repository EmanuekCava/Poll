"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validPoll = (req, res, next) => {
    const { question, options } = req.body;
    try {
        if (!question) {
            return res.status(401).json({ message: "You have to write a question." });
        }
        if (question.length < 3) {
            return res.status(401).json({ message: "The question has to have more than two characters." });
        }
        if (question.length > 120) {
            return res.status(401).json({ message: "The question has to have less than one hundred twenty characters." });
        }
        if (options.length < 2) {
            return res.status(401).json({ message: "You have to write at least two options." });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.default = validPoll;
