"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pollController = __importStar(require("../controller/poll.controler"));
const validpoll_1 = __importDefault(require("../middleware/validation/poll/validpoll"));
const auth_1 = __importDefault(require("../middleware/token/auth"));
const router = (0, express_1.Router)();
router.get('/allpolls', pollController.allPolls);
router.get('/polls', auth_1.default, pollController.polls);
router.get('/polls/:id', auth_1.default, pollController.getPoll);
router.post('/createpoll', auth_1.default, validpoll_1.default, pollController.createPoll);
router.delete('/removepoll/:id', auth_1.default, pollController.removePoll);
router.patch('/chooseoptionone/:id', auth_1.default, pollController.chooseOptionOne);
router.patch('/chooseoptiontwo/:id', auth_1.default, pollController.chooseOptionTwo);
exports.default = router;
