import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import axios from "axios"
import { SocketProvider } from '../socket/SocketContext.jsx'
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
      <SocketProvider>
      <App />
      </SocketProvider>
      <Toaster />
      </PersistGate>
      </Provider>
  </StrictMode>,
)

