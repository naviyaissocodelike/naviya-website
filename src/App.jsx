import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import VaultHome from './components/VaultHome'
import Lucy from './projects/Lucy'
import DataOpportunity from './projects/DataOpportunity'

export default function App(){
  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<VaultHome />} />
          <Route path="/lucy" element={<Lucy />} />
          <Route path="/data-opportunity" element={<DataOpportunity />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
