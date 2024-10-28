import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Initial from './views/Initial'
import Footer from './components/common/Footer'
import Menu from './components/common/Menu'
import SearchPatient from './views/SearchPatient'
import Board from './views/Board'
import Register from './views/Register'
import MedicalRecord from './views/MedicalRecord'
import Evolution from './views/Evolution'
import NewEvolution from './views/NewEvolution'
import LaboratoryOder from './views/LaboratoryOder'
import DigitalPrescription from './views/DigitalPrescription'
import { useState } from 'react'

function App() {

  const user=localStorage.getItem("nombre")|| null
  const [userLog,setUser]=useState(user)
  const LoginUser=(userData)=>setUser(userData)
  return (
    <>
      <HashRouter>
        <Menu userLog={userLog} LoginUser={LoginUser}/>
        <Routes>
          <Route exact path="/" element={<Initial/>}/>
          <Route exact path="/Main" element={<SearchPatient/>} />
          <Route exact path="/Board" element={<Board/>} />
          <Route exact path="/Register" element={<Register/>} />
          <Route exact path="/Hc/:id" element={<MedicalRecord/>} />
          <Route exact path="/Evolution" element={<Evolution/>} />
          <Route exact path="/Evolution/New" element={<NewEvolution/>} />
          <Route exact path="/Evolution/LaboratoryOrder" element={<LaboratoryOder/>} />
          <Route exact path="/Evolution/DigitalPrescription" element={<DigitalPrescription/>} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  )
}

export default App
