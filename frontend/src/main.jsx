import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './routes/homepage/HomePage.jsx'
import Dashboard from './routes/dashboard/Dashboard.jsx'
import Chat from './routes/chat/Chat.jsx'
import Signin from './routes/signin/Signin.jsx'
import Login from './routes/login/Login.jsx'
import RootLayout from './layouts/rootLayout/RootLayout.jsx'
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/login' element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/chat/:id' element={<Chat />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
