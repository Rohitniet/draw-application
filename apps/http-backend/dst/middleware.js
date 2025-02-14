"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = middleware;
const config_1 = require("@repo/common_backend/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function middleware(req, res, next) {
    const token = req.headers["authorization"] ?? "";
    const decoded = jsonwebtoken_1.default.verify(token, config_1.jwtsecret);
    if (decoded) {
        //@ts-ignore
        req.userid = decoded.userid;
    }
}
