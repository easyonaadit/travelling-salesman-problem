import { useState } from 'react'
import ViewBox from './viewBox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <header>
        <h1>Travelling Salesman Problem</h1>
        <button id="run">Run</button>
    </header>
    <ViewBox />
    
    </>
  )
}

export default App
