import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Initial from './views/Initial'
import Footer from './components/common/Footer'
import Menu from './components/common/Menu'

function App() {

  return (
    <>
      <HashRouter>
        <Menu />
        <Routes>
          <Route exact path="/" element={<Initial/>}/>
          <Route exact path="" element={{}} />
          <Route exact path="" element={{}} />
          <Route exact path="" element={{}} />
          <Route exact path="" element={{}} />
          <Route exact path="" element={{}} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  )
}

export default App
