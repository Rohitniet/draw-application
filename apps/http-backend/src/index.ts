import express from "express"
import jwt from "jsonwebtoken"
import { jwtsecret } from "@repo/common_backend/config"
import { middleware } from "./middleware"
import {CreateUserSchema ,SigninSchema ,CreateRoomSchema} from "@repo/common-all/types"
import{prismaclient } from "@repo/db/client"
const app= express()

app.use(express.json())


app.post("/signup", async(req,res)=> {
    console.log("controlreachews")

    const data= CreateUserSchema.safeParse(req.body)
    console.log(data.data)
    
   
    if(!data.success){
         res.json({
            "message":"incorrect inputs"
        })
        return 
    }
    const email = data.data.email
    const password = data.data.password
    const name =data.data.name
    try{

    await prismaclient.user.create({
        //@ts-ignore
     data:{   email,
        password,
        name
     }
    })
    } catch(e){
        console.log("this is your error bitch "+e)
        res.status(411).json({
            message:"error while signing up"
        })
    }




    res.json({
        message:"you have signed up"
    })
})


app.post("/signin", async (req,res)=> {

    const data= SigninSchema.safeParse(req.body)
   
    if(!data.success){
         res.json({
            "message":"incorrect inputs"
        })
        return 
    }


    const email = data.data.email
    const password = data.data.password

    const response = await prismaclient.user.findFirst({

        where:{
            email,
            password

        }
    })
    if(!response){
        res.json({
            message:" user not found "
        })

    }

    const userid=response?.id

    const token= jwt.sign({
        userid:userid
    },jwtsecret)

    res.json({
        token:token
    })

})


app.post("/room",middleware ,(req,res)=>{

    const data= CreateRoomSchema.safeParse(req.body)
   
    if(!data.success){
         res.json({
            "message":"incorrect inputs"
        })
        return 
    }

 //@ts-ignore
    const userid=req.userid

    res.json({
        roomid: 123
    })
})
app.listen(3001)