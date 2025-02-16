import axios from "axios";
import { backend_url } from "../../config";


async function getroomid(slug:string){

    const response= await axios.get(`${backend_url}/room/${slug}`)

    return response.data.room.id
}




export default async function  Chatroom({
    
    params} :{
        params:{
            slug:string
        }
    }){

        const slug =params.slug ;
        const roomid=await getroomid(slug)
        







}