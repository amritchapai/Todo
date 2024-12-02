import React from 'react'
import "./button.css"

interface buttonProps {
  text: string;
  handler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}
const Button: React.FC<buttonProps> = (props) => {
  return (
    <button
      className={`button ${props.className}`}
      onClick={(e) => props.handler(e)} 
    >
      {props.text}
    </button>
  );
};

export default Button