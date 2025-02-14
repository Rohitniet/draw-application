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
app.post("/room", middleware_1.middleware, (req, res) => {
    const data = types_1.CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
        res.json({
            "message": "incorrect inputs"
        });
        return;
    }
    //@ts-ignore
    const userid = req.userid;
    res.json({
        roomid: 123
    });
});
app.listen(3001);
