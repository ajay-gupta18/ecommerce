import { useEffect, useState } from 'react'
import './App.css'


import Navbar from './components/Navbar'

import Router from './router/Router'

function App() {
  // const [data, setData] = useState([]);
  // const getData = () => {
  //     fetch('https://fakestoreapi.com/products'
  //         , {
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'Accept': 'application/json'
  //             }
  //         }
  //     )
  //         .then(function (response) {
  //             // console.log(response)
  //             return response.json();
  //         })
  //         .then(function (response) {
  //             // console.log(response);
  //             setData(response)
  //         });
  // }
  // useEffect(() => {

  //       getData()
  //       // console.log(data)
  //       console.log('...fetching')

  // }, [])



  return (
    <div className='main-container'>
      <div className='nav-space'><Navbar /></div>
      <Router/>
      

    </div>
  )
}

export default App
