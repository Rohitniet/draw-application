import { Backend_url } from "@/config";
import axios from "axios";
import { Shapes } from "lucide-react";

type shapes={
        
    type:"rec";
    x:number
    y:number
    width:number
    hieght:number

} |{
type:"circle";
centerx:number
centery:number
radius :number
}


export async function draw(canvas:HTMLCanvasElement,roomid:string,socket:WebSocket ){

    const ctx= canvas.getContext("2d")


    
    const existingshapes:shapes[]= await getshape(roomid)
    
    
       
    
    
      if(!ctx){
        return ;
         }
         socket.onmessage=(event)=>{
            const parsedata=JSON.parse(event.data)


            if(parsedata.type==="chat"){
const parseshape= JSON.parse(parsedata.message)
                existingshapes.push(parseshape)
                clearCanvas(existingshapes,ctx,canvas)
            }
        }
       
    
    
         ctx.fillStyle="rgba(0,0,0)"
         ctx.fillRect(0,0,canvas.width,canvas.height)

         clearCanvas(existingshapes,ctx,canvas)

         let startX=0;
         let startY=0;
         let click=false



        canvas.addEventListener("mousedown",(e)=>{
        click=true
        startX=e.clientX;
         startY=e.clientY;
        })
    
    
        canvas.addEventListener("mouseup",(e)=>{
            click=false
               const width=e.clientX-startX
                const hieght=e.clientY-startY

                const shape:shapes={
                    type:"rec",
                    x:startX,
                    y:startY,
                    width,
                    hieght
                }
            existingshapes.push(shape)

            socket.send(JSON.stringify({
                type:"chat",
                roomid:roomid,
                message:JSON.stringify(shape)
            }))
            

        })
    
    
            canvas.addEventListener("mousemove",(e)=>{
                    
                if(click){

                  const width=e.clientX-startX
                  const hieght=e.clientY-startY
                  clearCanvas(existingshapes,ctx,canvas)
                  
               
                     ctx.strokeStyle="rgba(255,255,255)"
            
                     
                     

                   

                ctx.strokeRect(startX,startY,width,hieght);
                 
                   
    
                    
                }
                })
    
    
    
    
     }

     
     function clearCanvas(existingshapes:shapes[],ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){


        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="rgba(0,0,0)"

        ctx.fillRect(0,0,canvas.width,canvas.height)
        

        existingshapes.map((shape)=>{

            if(shape.type==="rec"){

                ctx.strokeStyle="rgba(255,255,255)"
                ctx.strokeRect(shape.x,shape.y,shape.width,shape.hieght);

            }

        })

     }


     async function  getshape(roomid:string){

        const res= await axios.get(`${Backend_url}chat/${roomid}`)
       
        const message=res.data.message

        const shapes =message.map((x:{message:string})=>{

            const messageData=JSON.parse(x.message)
            return messageData
        })

        return shapes;

        

     }