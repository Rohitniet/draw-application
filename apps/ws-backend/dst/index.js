"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@repo/common_backend/config");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if (!url) {
        return;
    }
    // here the urlsearchparams is a function that help us to from thr url object on the basis of the string provided 
    const queryparams = new URLSearchParams(url.split('?')[1]);
    const token = queryparams.get('token') ?? "";
    const decoded = jsonwebtoken_1.default.verify(token, config_1.jwtsecret);
    if (!decoded || !decoded.userid) {
        ws.close();
        return;
    }
    ws.on('message', function message(data) {
        ws.send("pong");
    });
});
