import{Button} from "@repo/ui/button"
import Link from "next/link"
export default function Landing(){




  return  <div className="w-screen h-screen bg-black flex justify-center items-center">


<div className="w-80 h-80 bg-white flex justify-center items-center flex-col text-black">
 

  <div><Link href="/signup"><Button size="lg" text="signup" variant="main" ></Button> </Link></div>
  <div><Link href="/signin"><Button size="lg" text="signin" variant="ghost"></Button></Link></div>
  <div>hy there</div>

</div>


  </div>
}