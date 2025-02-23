import { useEffect, useRef } from "react";
import { draw } from "../draw";



export function  FinalCanvas({roomid}:{roomid:string}){

const canvasref = useRef<HTMLCanvasElement>(null);

useEffect(() => {
    if (canvasref.current) {
      const canvas = canvasref.current;

      draw(canvas, roomid,socket);
    }
  }, [canvasref]);


    return (
        <div>
          <canvas ref={canvasref} width={1400} height={655}></canvas>
          <div className="flex flex-col fixed bottom-0 right-0">
            <div className="bg-white p-2 m-2 border-red-400 border  rounded">
              <button>rectangle</button>
            </div>
            <div className="bg-white p-2 m-2   border-red-400 border  rounded">
              <button>circle</button>
            </div>
          </div>
        </div>
      );
}