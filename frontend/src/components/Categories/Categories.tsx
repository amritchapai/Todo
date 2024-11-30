import React from 'react'
import "./categories.css"

interface CategoriesProps{
    text: string,
    action?: ()=>void,
    color?: string
}

const Categories:React.FC<CategoriesProps>= ({text, color}) => {
  return (
    <div className={`category-card ${color}`}>
      <span>{text}</span>
    </div>
  );
}

export default Categories