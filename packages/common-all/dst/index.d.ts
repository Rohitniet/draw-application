import { z } from "zod";
export declare const CreateUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export declare const SigninSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const CreateRoomSchema: z.ZodObject<{
    room: z.ZodString;
}, "strip", z.ZodTypeAny, {
    room: string;
}, {
    room: string;
}>;
//# sourceMappingURL=index.d.ts.map