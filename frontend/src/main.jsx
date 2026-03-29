import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import store from './redux/store.jsx'
import axios from "axios"


axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
      </Provider>
  </StrictMode>,
)
