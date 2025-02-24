"use client";
import { useEffect, useRef, useState } from "react";

import { draw } from "../draw";
import {Ws_url} from "@/config"
import { FinalCanvas } from "./Canvas";

export function Canvas({ roomid }: { roomid: string }) {
  
  

  const [socket, setSocket] = useState<WebSocket | null>(null);


  // here is the ws logicof client to create a socket connection 
  useEffect(() => {
   
    const ws = new WebSocket(`${Ws_url}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJkYzIxNzIyYi0xNzZlLTRiMGEtYjI3Ny02NWVjZGY3Yjk0OTAiLCJpYXQiOjE3NDAzMDE5NDR9.i7hmNRf6TMLIX9eYv97R76NaL5QhOZw6PN2RZZVscb4`);
console.log("at ROMMCANVANS")
    ws.onopen = () => {
      setSocket(ws);

      ws.send(JSON.stringify({
        type:"join_room",
        roomid

      }))
    };
  }, []);

 

  if(!socket){

    return <div>
        connecting to ws server...
    </div>
  }

  return <div>
    <FinalCanvas socket={socket}  roomid={roomid}/>
  </div>

  
}
