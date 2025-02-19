"use client";
import { useEffect, useRef, useState } from "react";

import { draw } from "../draw";
import {Ws_url} from "@/config"
import { FinalCanvas } from "./Canvas";

export function Canvas({ roomid }: { roomid: string }) {
  
  console.log(Ws_url)

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(Ws_url);

    ws.onopen = () => {
      setSocket(ws);
    };
  }, []);

 

  if(!socket){

    return <div>
        connecting to ws server...
    </div>
  }

  return <div>
    <FinalCanvas roomid={roomid}/>
  </div>

  
}
