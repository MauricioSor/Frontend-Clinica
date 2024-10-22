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

function App() {

  return (
    <>
      <HashRouter>
        <Menu />
        <Routes>
          <Route exact path="/" element={<Initial/>}/>
          <Route exact path="/Main" element={<SearchPatient/>} />
          <Route exact path="/Board" element={<Board/>} />
          <Route exact path="/Register" element={<Register/>} />
          <Route exact path="/Hc" element={<MedicalRecord/>} />
          <Route exact path="/Evolution" element={<Evolution/>} />
          <Route exact path="/Evolution/New" element={<NewEvolution/>} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  )
}

export default App
