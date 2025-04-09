
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MovementProvider } from './context/MovementContext.tsx'

createRoot(document.getElementById("root")!).render(
  <MovementProvider>
    <App />
  </MovementProvider>
);
