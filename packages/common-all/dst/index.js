"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomSchema = exports.SigninSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    email: zod_1.z.string().min(3).max(20).email(),
    password: zod_1.z.string().min(4),
    name: zod_1.z.string()
});
exports.SigninSchema = zod_1.z.object({
    email: zod_1.z.string().min(3).max(20),
    password: zod_1.z.string().min(4)
});
exports.CreateRoomSchema = zod_1.z.object({
    room: zod_1.z.string()
});
