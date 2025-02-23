import axios from "axios";
import { backend_url } from "../../config";


async function getroomid(slug:string){

    const response= await axios.get(`http://localhost:3001/room/${slug}`)

    return response.data.roomid
}




export default async function  Chatroom({
    
    params} :{
        params:{
            slug:string
        }
    }){
 console.log("coonreol is here")
        const awaitedparams = await (params) ;
        console.log(awaitedparams.slug)
        const roomid=await getroomid(awaitedparams.slug)

        return <div>
            this ischat room
        </div>
        







}