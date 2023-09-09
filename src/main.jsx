import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ContextProvider } from './components/Context'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <div> */}
    <ContextProvider>
      <App />
    </ContextProvider>
    {/* </div> */}
  </React.StrictMode>,
)
