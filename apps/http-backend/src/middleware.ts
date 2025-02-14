import { NextFunction, Request, Response } from "express";
import { jwtsecret } from "@repo/common_backend/config";
import jwt from "jsonwebtoken"



export function middleware(req:Request,res:Response,next:NextFunction){

    const token=req.headers["authorization"] ?? ""

    const decoded= jwt.verify(token,jwtsecret)

    if(decoded){
         
        //@ts-ignore
        req.userid= decoded.userid

        next()


    }
}