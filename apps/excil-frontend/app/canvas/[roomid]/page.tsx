

import { Canvas } from "@/app/component/RoomCanvas";
import { draw } from "@/app/draw";
import { CarTaxiFront } from "lucide-react";
import { useEffect, useRef } from "react"
export default async function mainCanvas({params}:{
    params:{
        roomid:string
    }
}){


    const roomid= (await params).roomid

    console.log(roomid)


    return <Canvas roomid={roomid}/>

}