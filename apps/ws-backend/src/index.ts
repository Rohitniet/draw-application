import { WebSocketServer } from 'ws';
import jwt from "jsonwebtoken"
import { jwtsecret } from './config';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,request ) {

    const url= request.url

    if(!url){
        return 
    }
    

    // here the urlsearchparams is a function that help us to from thr url object on the basis of the string provided 
    const queryparams=new URLSearchParams(url.split('?')[1])

    const token =queryparams.get('token')
    
    const decoded=jwt.verify(token,jwtsecret)

  


  ws.on('message', function message(data) {
   ws.send("pong")
  });

  
});