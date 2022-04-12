import React from 'react'
import Layout from './Components/Layout/Layout'
import './App.scss'
import { Toaster } from 'react-hot-toast'
import 'aos/dist/aos.css';

function App() {
  return (
    <div className="app">
      <Layout />
      <div>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "white",
                color: "green",
              },
            },
            error: {
              style: {
                background: "white",
                color: "red",
              },
            },
          }}
        />

      </div>
    </div>
  )
}

export default App
