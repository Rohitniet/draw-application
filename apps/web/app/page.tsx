
"use client"
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function Home() {

  const [roomid ,setroomid] =useState("")
  const router =useRouter();


  return (<div style={{
    display:"flex",
    flexDirection:"column",
    width:"100vw",
    height:"100vh",
    justifyContent:"center",
    alignItems:"center"
  }}>

    <div>



<input value={roomid} onChange={(e) => {
  setroomid(e.target.value)
}}   placeholder="enetr room id" type="text"/>





<button  onClick={()=>{
router.push(`/room/${roomid}`)
}}> join</button>

</div>
   
  </div>
   
  );
}
