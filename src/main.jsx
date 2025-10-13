import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

try{
  const rootEl = document.getElementById('root')
  if (!rootEl) throw new Error('Missing root element')
  createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}catch(err){
  // Surface the error to the DOM so deployments don't show a silent blank page
  console.error('App render error:', err)
  document.body.innerHTML = `<pre style="white-space:pre-wrap;padding:20px;font-family:monospace;color:#b91c1c;background:#fff6f6">App render error:\n${String(err)}</pre>`
}
