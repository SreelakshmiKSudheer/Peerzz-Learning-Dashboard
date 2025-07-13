import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ThemeToggle/>
      <div className='text-2xl bg-[var(--uni)]'>mklwgoqragvno;bnb</div>
      <button className='text-[var(--tri)] bg-[var(--quad)]'>Blah blah</button>
    </>
  )
}

export default App
