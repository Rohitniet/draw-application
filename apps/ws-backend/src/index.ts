import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { jwtsecret } from '@repo/common_backend/config';

const wss = new WebSocketServer({ port: 8080 });


// this function basically convert token into userid and also check th coming token is string and the decoded value of token is not string as it should be object and return userid 
function checkuser(token:string):string | null {

    const decoded= jwt.verify(token,jwtsecret);

    if(typeof decoded =="string"){
        return null
    }

    if(!decoded || !decoded.userid){
        return null
    }

    return decoded.userid
}


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