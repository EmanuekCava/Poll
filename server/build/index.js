"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
require("./data/database/database");
app.set('port', process.env.PORT || 6000);
const poll_routes_1 = __importDefault(require("./router/poll.routes"));
const user_routes_1 = __importDefault(require("./router/user.routes"));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(poll_routes_1.default);
app.use(user_routes_1.default);
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});
