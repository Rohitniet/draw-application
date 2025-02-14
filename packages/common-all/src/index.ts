import{string, z} from "zod"

export const CreateUserSchema =z.object( {

    email :z.string().min(3).max(20).email(),
    password:z.string().min(4),
    name:z.string()

})

export const SigninSchema = z.object({

    email:z.string().min(3).max(20),
    password:z.string().min(4)
})

export const CreateRoomSchema= z.object({
    room:z.string()
})