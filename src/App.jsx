import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CoinsProvider } from './contexts/CoinsContext'
import VaultHome from './components/VaultHome'
import Lucy from './projects/Lucy'
import DataOpportunity from './projects/DataOpportunity'
import AIDiffusion from './projects/AIDiffusion'

export default function App(){
  return (
    <BrowserRouter>
      <CoinsProvider>
        <div className="app-root">
          <Routes>
            <Route path="/" element={<VaultHome />} />
            <Route path="/lucy" element={<Lucy />} />
            <Route path="/data-opportunity" element={<DataOpportunity />} />
            <Route path="/ai-diffusion" element={<AIDiffusion />} />
            <Route path="/ai-diffusion-essay" element={<AIDiffusion />} />
          </Routes>
        </div>
      </CoinsProvider>
    </BrowserRouter>
  )
}
