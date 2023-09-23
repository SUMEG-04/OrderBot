import React from 'react'
import {Route, Routes } from 'react-router-dom'
import './App.css'
import Menu from './components/Menu'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Services from './components/Services'

const App = () => {
  return (
    <>
      <Menu/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/services' element={<Services/>}/>
      </Routes>
    </>
  )
}

export default App
