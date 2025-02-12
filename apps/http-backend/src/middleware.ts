import { NextFunction, Request, Response } from "express";
import { jwtsecret } from "./config";
import jwt from "jsonwebtoken"



export function middleware(req:Request,res:Response,next:NextFunction){

    const token=req.headers["authorization"] ?? ""

    const decoded= jwt.verify(token,jwtsecret)

    if(decoded){
         
        //@ts-ignore
        req.userid= decoded.userid


    }
}