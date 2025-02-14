import { WebSocketServer, WebSocket } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { jwtsecret } from '@repo/common_backend/config';

const wss = new WebSocketServer({ port: 8080 });

interface User{
    ws:WebSocket,
    room:string[],
    userid:string
}

const users:User[]=[]

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
    
    const userid=checkuser(token)

    if(!userid){

        ws.close();
        return
    }

    users.push({
        
        ws,
        room:  [],
        userid
    })




  ws.on('message', function message(data) {

    const parsedata=JSON.parse(data as unknown as string)

    if(parsedata.type=="join_room"){
        const user=users.find(x => x.ws==ws)

        user?.room.push(parsedata.roomid)
        console.log(users)
    }

    if(parsedata.type=="leave_room"){
        const user=users.find(x => x.ws==ws)
        if(!user){
            return null;
        }

       user.room= user?.room.filter(x => x!= parsedata.roomid)

       console.log(users)
    }


    if(parsedata.type==="chat"){
        const message=parsedata.message
        const roomid=parsedata.roomid

        users.forEach(user => {

            if(user.room.includes(roomid)){

                user.ws.send(JSON.stringify({
                    type:"chat",
                    message,
                    roomid


                }))
            }
        })


    }
    
  
  });

  
});