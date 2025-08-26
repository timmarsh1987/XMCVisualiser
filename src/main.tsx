import React from 'react'
import ReactDOM from 'react-dom/client'
import { Providers } from './app/providers'
import { MarketplaceApp } from './app/components/MarketplaceApp'
import './app/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <MarketplaceApp />
    </Providers>
  </React.StrictMode>,
) 