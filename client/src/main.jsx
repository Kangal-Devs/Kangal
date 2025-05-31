import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Campaign } from './componentes/pages/campaign/campaign.jsx'
import { Groups } from './componentes/pages/groups/groups.jsx'
import { Games } from './componentes/pages/games/games.jsx'
import { Documents } from './componentes/pages/documents/documents.jsx'
import { Login } from './componentes/pages/login/login.jsx'
import { AboutUs } from './componentes/pages/about_us/about_us.jsx'
import { Home } from './componentes/pages/home/home.jsx'
import { Support } from './componentes/pages/support/support.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google'

const route = createBrowserRouter([{
  path:"/",
  element:<AboutUs/>
},
{
  path:"/support",
  element:<Support/>
},
{
  path:"/login",
  element:<Login/>
},
{
  path:"/home",
  element:<Home/>
},
{
  path:"/documents",
  element:<Documents/>
},
{
  path:"/games",
  element:<Games/>
},
{
  path:"/groups",
  element:<Groups/>
},
{
  path:"/campaign",
  element:<Campaign/>
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
< GoogleOAuthProvider clientId="195196788041-dg2k74ts1kb99qphd68aefnheik67ucp.apps.googleusercontent.com">
  <RouterProvider router={route}/>
  </GoogleOAuthProvider>
  </StrictMode>,
)
