"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@repo/common_backend/config");
const client_1 = require("@repo/db/client");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const users = [];
// this function basically convert token into userid and also check th coming token is string and the decoded value of token is not string as it should be object and return userid 
function checkuser(token) {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.jwtsecret);
    if (typeof decoded == "string") {
        return null;
    }
    if (!decoded || !decoded.userid) {
        return null;
    }
    return decoded.userid;
}
wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if (!url) {
        return;
    }
    // here the urlsearchparams is a function that help us to from thr url object on the basis of the string provided 
    const queryparams = new URLSearchParams(url.split('?')[1]);
    const token = queryparams.get('token') ?? "";
    const userid = checkuser(token);
    if (!userid) {
        ws.close();
        return;
    }
    users.push({
        ws,
        room: [],
        userid
    });
    ws.on('message', async function message(data) {
        const parsedata = JSON.parse(data);
        if (parsedata.type == "join_room") {
            const user = users.find(x => x.ws == ws);
            user?.room.push(parsedata.roomid);
            console.log(users);
        }
        if (parsedata.type == "leave_room") {
            const user = users.find(x => x.ws == ws);
            if (!user) {
                return null;
            }
            user.room = user?.room.filter(x => x != parsedata.roomid);
            console.log(users);
        }
        if (parsedata.type === "chat") {
            const message = parsedata.message;
            const roomid = parsedata.roomid;
            // this is the dumb way and ideal  approch would be using queue  and throw apipleine to db
            await client_1.prismaclient.chat.create({
                data: {
                    message,
                    roomid,
                    userid
                }
            });
            console.log("controls reaches here");
            console.log(users);
            users.forEach(user => {
                if (user.room.includes(roomid)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message,
                        roomid
                    }));
                }
            });
        }
    });
});
