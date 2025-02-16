"use client "

 interface  Buttonprop{

  size:"sm"|"md"|"lg"
  variant:"main"| "ghost"
  onclick?:()=>void
  text:string
  classname?:string

}
const variantType = {
 main: "bg-blue-500 text-white",  // For primary button
  ghost: "bg-gray-500 text-white",  // For secondary button
};

const sizeType = {
  sm: "py-1 px-3 text-sm",   // Small size button
  md: "py-2 px-4 text-md",   // Medium size button
  lg: "py-3 px-6 text-lg",   // Large size button
};


const defaulttype= " p-2 m-2 border border-black-2 text-black "

export function Button( prop:Buttonprop ){

  




  return (
    <button className={` ${variantType[prop.variant]} ${prop.size} ${defaulttype}`}  onClick={prop.onclick}>{prop.text}</button>
  )
}
