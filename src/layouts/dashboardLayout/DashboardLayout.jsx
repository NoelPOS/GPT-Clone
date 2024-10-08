import React from 'react'
import './DashboardLayout.css'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='dashboardlayout'>
      <div>Menu</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
