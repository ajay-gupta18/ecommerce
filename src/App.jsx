import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Product from './components/Product'
import Navbar from './components/Navbar'
import ProductDetail from './components/sub-components/ProductDetail'

function App() {
  const [data, setData] = useState([]);
  const getData = () => {
      fetch('https://fakestoreapi.com/products'
          , {
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              }
          }
      )
          .then(function (response) {
              console.log(response)
              return response.json();
          })
          .then(function (response) {
              console.log(response);
              setData(response)
          });
  }
  useEffect(() => {
      getData()
  }, [])

  
  return (
    <div className='main-container'>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/product' element={<Product data={data}/>}></Route>
          <Route path='/product/:id' element={<ProductDetail product={data}/>}></Route>
        </Routes>
     
    </div>
  )
}

export default App
