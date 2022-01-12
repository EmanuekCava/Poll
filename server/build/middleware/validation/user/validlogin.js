"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validLogin = (req, res, next) => {
    const { nick, password } = req.body;
    try {
        if (!nick || !password) {
            return res.status(500).json({ message: "There are incomplet credentials." });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.default = validLogin;
