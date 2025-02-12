import express from "express"
import jwt from "jsonwebtoken"
import { jwtsecret } from "./config"
import { middleware } from "./middleware"

const app= express()

app.use(express.json())


app.post("/signup",(req,res)=> {

    const email = req.body.email
    const password = req.body.password



    res.json({
        message:"you have signwd up"
    })
})


app.post("/signin",(req,res)=> {

    const userid=1

    const token= jwt.sign({
        userid:userid
    },jwtsecret)

    res.json({
        token:token
    })

})


app.post("/room",middleware ,(req,res)=>{

 //@ts-ignore
    const userid=req.userid

    res.json({
        roomid: 123
    })
})
app.listen(3001)