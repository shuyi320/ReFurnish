import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { Routes, Route, Navigate } from "react-router-dom";
import FurniturePage from './pages/FurniturePage';
import ReportForm from './components/ReportForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/FurniturePage" element={<FurniturePage />} />
        <Route path="/ReportForm" element={<ReportForm />} />
      </Routes>
        
    </>
  )
}

export default App
