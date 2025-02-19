import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'lib-flexible/flexible'
import './index.css'
import {
  BrowserRouter as Router
} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>,
)
