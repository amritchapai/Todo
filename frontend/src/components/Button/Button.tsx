import React from 'react'
import "./button.css"

interface buttonProps{
  text: string,
  handler :()=> void
  className? : string
}

const Button:React.FC<buttonProps>= (props)=> {
  return (
        <button className={`${props.className}`} onClick={props.handler}>{props.text}</button>
  )
}

export default Button