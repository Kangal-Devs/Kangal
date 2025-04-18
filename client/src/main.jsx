import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AboutUs } from './componentes/pages/about_us/about_us.jsx'
import { Support } from './componentes/pages/support/support.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

const route = createBrowserRouter([{
  path:"/",
  element:<AboutUs/>
},
{
  path:"/support",
  element:<Support/>
},

])

createRoot(document.getElementById('root')).render(
  <StrictMode>

  <RouterProvider router={route}/>
  </StrictMode>,
)
