import { useEffect, useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify';


import Navbar from './components/Navbar'

import Router from './router/Router'

function App() {
  return (
    <div className='main-container'>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
        transition:Slide
      />
      <div className='nav-space'><Navbar /></div>
      <Router />


    </div>
  )
}

export default App
