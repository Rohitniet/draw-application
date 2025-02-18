"use client"

import { draw } from "@/app/draw";
import { CarTaxiFront } from "lucide-react";
import { useEffect, useRef } from "react"
export default function Canvas(){

const canvasref=useRef<HTMLCanvasElement>(null)

useEffect(()=>{

    if(canvasref.current){

        const canvas= canvasref.current
        
        draw(canvas)
    }
 
},[canvasref])


    return <div>

        <canvas ref={canvasref}  width={1400} height={655}>
        
        </canvas>
        <div className="flex flex-col fixed bottom-0 right-0">
        <div className="bg-white p-2 m-2 border-red-400 border  rounded"><button>rectangle</button></div>
        <div className="bg-white p-2 m-2   border-red-400 border  rounded"><button>circle</button></div>
    </div>
    </div>
}