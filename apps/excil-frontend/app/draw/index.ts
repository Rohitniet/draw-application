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


export function draw(canvas:HTMLCanvasElement ){

    const ctx= canvas.getContext("2d")


    
    const existingshapes:shapes[]=[]
    
        
    
    
      if(!ctx){
        return ;
         }
    
    
         ctx.fillStyle="rgba(0,0,0)"
         ctx.fillRect(0,0,canvas.width,canvas.height)


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

            existingshapes.push({
                type:"rec",
                x:startX,
                y:startY,
                width,
                hieght
            })
            

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
