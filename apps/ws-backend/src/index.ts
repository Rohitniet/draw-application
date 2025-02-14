import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { jwtsecret } from '@repo/common_backend/config';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,request ) {

    const url= request.url

    if(!url){
        return 
    }
    

    // here the urlsearchparams is a function that help us to from thr url object on the basis of the string provided 
    const queryparams=new URLSearchParams(url.split('?')[1])

    const token =queryparams.get('token') ?? ""
    
    const decoded=jwt.verify(token,jwtsecret)

    if(!decoded || !(decoded as JwtPayload).userid){

        ws.close();
        return
    }




  ws.on('message', function message(data) {
   ws.send("pong")
  });

  
});