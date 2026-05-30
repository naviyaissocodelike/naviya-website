import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VaultHome from './components/VaultHome'
import Lucy from './projects/Lucy'

export default function App(){
  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<VaultHome />} />
          <Route path="/lucy" element={<Lucy />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
