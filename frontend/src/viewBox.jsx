import { useState } from "react"
import Circle from "./Circle"


function ViewBox(){
    const [nodes, setNodes] = useState([])
    let count = 0

    const handleSVGonClick = e =>{
        console.log("("+e.pageX + ', '+e.pageY + ')')
        if(nodes.length == 0){
            setNodes([[e.pageX, e.pageY]])
        }
        else{

            setNodes( [...nodes, [ e.pageX,   e.pageY]])
        }
        // console.log("%ccount: ", 'color: #00ff00', count)
        // count = count +1
        console.table(nodes)
        // console.log("%cTHIS is the node value: ", 'color: #0000ff', nodes[0].x)
        // setNodes( prev => {
        //     ...prev, 
        //     // console.log('prev: ', ...prev)
        // })
    } 

    const handleHelper = () => {
        console.log('Helper button')
        console.log("%cTHIS is the node value: ", 'color: #0000ff', nodes[0][0])
        console.table(nodes[0])
    }

    return <div className="body" id="body">
        <button onClick={handleHelper}>Helper</button>
        <svg viewBox="7 120 1500 892" width="1500" height="892"  id="svg" onClick={e => handleSVGonClick(e)}>
            {
                
                nodes.map((node, index) => {
                    return <Circle key = {index} cx={node[0]} cy = {node[1]} />
                })
            }
             {/* <line x1="51" y1="51" x2="70" y2="70" stroke="black" strokeWidth="4" />
            <circle cx="10" cy="50" r="17" id="circle1"/>
            <circle cx="80" cy="100" r="17" />  */}
        </svg>
    </div>
}



export default ViewBox