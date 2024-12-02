import React from 'react'
import "./styles/allpage.css"
import Task from '../components/Task/Task';



const AllPage:React.FC = () => {
  const colors: string[] = ["gray", "blue", "green", "brown"];
  let colorIndex: number = 0
  const task = [1, 2,3,4,5,6,7,8,9,10,22,34];
  return (
    <div className="all-page">
      {
        task.map((index)=>{
          const color = colors[colorIndex % colors.length]
          colorIndex++;
          return <Task key={index} color={color}/>
        })
      }
    </div>
  );
}

export default AllPage