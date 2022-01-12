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
const user_1 = __importDefault(require("../../../data/models/user"));
const validRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nick, email, password, confirm } = req.body;
    var symbols = ["<", ">", ":", "{", "[", "^", "}", "]", "`", "|", "°", "¬", "!", '"', "$", "(", ")", "%", "&", "/", "=", "?", "'", "¡", "¿", "*", "+", "~"];
    try {
        if (!nick || !email || !password || !confirm) {
            return res.status(401).json({ message: "There are incomplet credentials." });
        }
        if (nick.length < 3) {
            return res.status(401).json({ message: "The nick must be al least three characters." });
        }
        if (nick.length > 30) {
            return res.status(401).json({ message: "The nick cannot be more than thirty characters." });
        }
        const emailValid = validateEmail(email);
        if (!emailValid) {
            return res.status(401).json({ message: "The email has an incorrect format." });
        }
        if (password.length < 6) {
            return res.status(401).json({ message: "The password must be more than five characters." });
        }
        for (var i = 0; i < password.length; i++) {
            for (var j = 0; j < symbols.length; j++) {
                if (password[i] == symbols[j]) {
                    return res.status(401).json({ message: "If you want to use symbols, use , ; . # @." });
                }
            }
        }
        if (password !== confirm) {
            return res.status(401).json({ message: "The passwords do not match." });
        }
        const nickExists = yield user_1.default.findOne({ nick });
        if (nickExists) {
            return res.status(401).json({ message: "The nick already exists." });
        }
        const emailExists = yield user_1.default.findOne({ email });
        if (emailExists) {
            return res.status(401).json({ message: "The email already exists." });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
exports.default = validRegister;
