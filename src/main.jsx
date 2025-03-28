import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './routers/AppRouter.jsx';
import "react-day-picker/dist/style.css";
import './styles/styles.scss';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
