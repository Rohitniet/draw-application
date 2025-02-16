export function Auth({issignin}:{
    issignin:boolean
}){


    return <div  className="w-screen h-screen flex justify-center items-center flex-col">
<div className=" bg-white text-black text-xl w-24 border border-r-8">{issignin? "signin":"signup"}</div>
        <div className=" p-4 m-4 bg-slate-400 flex items-center justify-center flex-col w-72 h-72">

            <div> <input type="text" className="border border-r-2 m-2 p-2" placeholder="email" /></div>
            <div> <input type="text" className="border border-r-2 m-2 p-2" placeholder="password" /></div>
            <div> <input type="text" className="border border-r-2 m-22 p-2" placeholder="username" /></div>

            <div><button className="bg-red-300 p-2 m-2"  >{issignin? "signin":"signup"}</button></div>
        </div>


    </div>
}