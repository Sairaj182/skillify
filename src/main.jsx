import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
function hello(){
  return <nav>
    <p id="title-1">Skill Swap Platform</p>
    <a href="#"><button>Login</button></a>
  </nav>;
}

export default hello;