import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BudgetsContextProvider} from "./contexts/BudgetsContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BudgetsContextProvider>
    <App />
    </BudgetsContextProvider>
    
  </React.StrictMode>,
)
