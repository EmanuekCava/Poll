"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseOptionTwo = exports.chooseOptionOne = exports.removePoll = exports.createPoll = exports.getPoll = exports.polls = exports.allPolls = void 0;
const poll_1 = __importDefault(require("../data/models/poll"));
const allPolls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showAllPolls = yield poll_1.default.find();
        return res.status(200).json(showAllPolls);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.allPolls = allPolls;
const polls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showPolls = yield poll_1.default.find({ nickId: req.user });
        return res.status(200).json(showPolls);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.polls = polls;
const getPoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const showPoll = yield poll_1.default.findById(id).populate('nickId', 'nick');
        return res.status(200).json(showPoll);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getPoll = getPoll;
const createPoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, optionOne, optionTwo } = req.body;
    try {
        const newPoll = new poll_1.default({
            question,
            optionOne,
            optionTwo,
            nickId: req.user
        });
        const savePoll = yield newPoll.save();
        return res.status(200).json({
            poll: savePoll,
            message: "The poll was uploaded successfully."
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.createPoll = createPoll;
const removePoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pollUser = yield poll_1.default.findOne({ _id: id, user: req.user });
        if (!pollUser) {
            return res.status(401).json({ message: "You cannot delete this poll." });
        }
        yield poll_1.default.findByIdAndDelete(id);
        return res.status(200).json({ message: "The poll was removed successfully." });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.removePoll = removePoll;
const chooseOptionOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pollUpdate = yield poll_1.default.findByIdAndUpdate(id, {
            $push: {
                "optionOne.votes": req.user
            }
        }, {
            new: true
        });
        return res.status(200).json(pollUpdate);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.chooseOptionOne = chooseOptionOne;
const chooseOptionTwo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pollUpdate = yield poll_1.default.findByIdAndUpdate(id, {
            $push: {
                "optionTwo.votes": req.user
            }
        }, {
            new: true
        });
        return res.status(200).json(pollUpdate);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.chooseOptionTwo = chooseOptionTwo;
