import express from "express"
import jwt from "jsonwebtoken"
import { jwtsecret } from "@repo/common_backend/config"
import { middleware } from "./middleware"
import {CreateUserSchema ,SigninSchema ,CreateRoomSchema} from "@repo/common-all/types"
import{prismaclient } from "@repo/db/client"
import cors from"cors"
const app= express()

app.use(express.json())

app.use(cors())


app.post("/signup", async(req,res)=> {
    

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


app.post("/room",middleware , async(req,res)=>{

    const data= CreateRoomSchema.safeParse(req.body)


   
    if(!data.success){
         res.json({
            "message":"incorrect inputs"
        })
        return 
    }

 //@ts-ignore
    const userid=req.userid

    try{

    const response= await prismaclient.room.create({
        data:{
            slug:data.data.room,
            adminid:userid

        }
    })

    res.json({
        roomid: response.id
    })
}catch(e){

    res.json({
        messgae :e
    })
}

   
})



app.get("/chat/:roomid",async (req,res)=>{

    const roomid=Number(req.params.roomid);

    const message=await prismaclient.chat.findMany({

        where:{
            roomid
        },
        orderBy:{
            id:"desc"
        },
        take:50
    })
    res.json({
        message
    })
})




app.get("/room/:slug",async (req,res)=>{

    const slug= req.params.slug

    const room=await prismaclient.room.findFirst({

        where:{
            slug
        },
       
    })
    res.json({
        room :room
    })
})
app.listen(3001)