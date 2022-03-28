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
exports.removeUser = exports.getUser = exports.allUsers = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../data/models/user"));
const { JWT } = process.env;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nick, email, password } = req.body;
    try {
        const newUser = new user_1.default({
            nick,
            email,
            password
        });
        newUser.password = yield newUser.hidePassword(newUser.password);
        const saveUser = yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: saveUser._id }, `${JWT}`, {
            expiresIn: "72h"
        });
        return res.status(200).json({
            user: saveUser,
            message: "Welcome!",
            token
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nick, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ nick });
        if (!user) {
            return res.status(401).json({ message: "User does not exists." });
        }
        const validation = yield bcryptjs_1.default.compare(password, user.password);
        if (!validation) {
            return res.status(401).json({ message: "The credentials do not match." });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, `${JWT}`, {
            expiresIn: "7d"
        });
        return res.status(200).json({
            user,
            message: "Welcome again!",
            token
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.login = login;
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showAllUsers = yield user_1.default.find();
        return res.status(200).json(showAllUsers);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.allUsers = allUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const showUser = yield user_1.default.findById(id);
        return res.status(200).json(showUser);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getUser = getUser;
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield user_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            message: "User removed successfully."
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.removeUser = removeUser;
