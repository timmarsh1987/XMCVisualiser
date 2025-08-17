import React from 'react'
import ReactDOM from 'react-dom/client'
import XMCViewer from './components/CHVisualiser/XMCViewer'
import './components/CHVisualiser/index.css'

// Mock context for testing
const mockContext = {
  client: {
    // Mock client properties
  },
  options: {
    entityId: 'test-entity',
    showGraphViewer: true
  },
  entity: {
    // Mock entity properties
  },
  theme: {
    // Mock Material-UI theme
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2'
      }
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <XMCViewer
      client={mockContext.client}
      options={mockContext.options}
      entity={mockContext.entity}
    />
  </React.StrictMode>,
) 