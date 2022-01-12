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
exports.updatePoll = exports.removePoll = exports.createPoll = exports.getPoll = exports.polls = exports.allPolls = void 0;
const poll_1 = __importDefault(require("../data/models/poll"));
// import { UserRequest } from '../interface/request'
const allPolls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showAllPolls = yield poll_1.default.find();
        res.json(showAllPolls);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.allPolls = allPolls;
const polls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showAllPolls = yield poll_1.default.find({ nickId: req.user });
        res.json(showAllPolls);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.polls = polls;
const getPoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const showPoll = yield poll_1.default.findById(id);
        res.json(showPoll);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getPoll = getPoll;
const createPoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, options } = req.body;
    try {
        const newPoll = new poll_1.default({
            question,
            options,
            nickId: req.user
        });
        const savePoll = yield newPoll.save();
        res.json({
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
        yield poll_1.default.findByIdAndDelete(id);
        res.json({ message: "The poll was removed successfully." });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.removePoll = removePoll;
const updatePoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, options } = req.body;
    const { id } = req.params;
    try {
        const pollUpdated = {
            question,
            options
        };
        const savePollUpdated = yield poll_1.default.findByIdAndUpdate(id, pollUpdated, {
            new: true
        });
        res.json({
            poll: savePollUpdated,
            message: "The poll was updated successfully."
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updatePoll = updatePoll;
