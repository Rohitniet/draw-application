"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@repo/common_backend/config");
const middleware_1 = require("./middleware");
const types_1 = require("@repo/common-all/types");
const client_1 = require("@repo/db/client");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", async (req, res) => {
    console.log("controlreachews");
    const data = types_1.CreateUserSchema.safeParse(req.body);
    console.log(data.data);
    if (!data.success) {
        res.json({
            "message": "incorrect inputs"
        });
        return;
    }
    const email = data.data.email;
    const password = data.data.password;
    const name = data.data.name;
    try {
        await client_1.prismaclient.user.create({
            //@ts-ignore
            data: { email,
                password,
                name
            }
        });
    }
    catch (e) {
        console.log("this is your error bitch " + e);
        res.status(411).json({
            message: "error while signing up"
        });
    }
    res.json({
        message: "you have signed up"
    });
});
app.post("/signin", async (req, res) => {
    const data = types_1.SigninSchema.safeParse(req.body);
    if (!data.success) {
        res.json({
            "message": "incorrect inputs"
        });
        return;
    }
    const email = data.data.email;
    const password = data.data.password;
    const response = await client_1.prismaclient.user.findFirst({
        where: {
            email,
            password
        }
    });
    if (!response) {
        res.json({
            message: " user not found "
        });
    }
    const userid = response?.id;
    const token = jsonwebtoken_1.default.sign({
        userid: userid
    }, config_1.jwtsecret);
    res.json({
        token: token
    });
});
app.post("/room", middleware_1.middleware, async (req, res) => {
    const data = types_1.CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
        res.json({
            "message": "incorrect inputs"
        });
        return;
    }
    //@ts-ignore
    const userid = req.userid;
    try {
        const response = await client_1.prismaclient.room.create({
            data: {
                slug: data.data.room,
                adminid: userid
            }
        });
        res.json({
            roomid: response.id
        });
    }
    catch (e) {
        res.json({
            messgae: e
        });
    }
});
app.get("/chat/:roomid", async (req, res) => {
    const roomid = Number(req.params.roomid);
    const message = await client_1.prismaclient.chat.findMany({
        where: {
            roomid
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    });
    res.json({
        message
    });
});
app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await client_1.prismaclient.room.findFirst({
        where: {
            slug
        },
    });
    res.json({
        room: room
    });
});
app.listen(3001);
