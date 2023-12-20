import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ScaleLoader } from 'react-spinners'
import { useSelector } from 'react-redux'

const override= {
    position: 'absolute',
    top: '0',
    left: '0',
    textAlign: 'center',
    right: '0',
    bottom: '0',
    background: "rbg(0 0 0 / 30%)",
    zIndex: '9909'
}
const Layout = () => {
    
    const statusLoading = useSelector(state => state.globalLoading.status)
  return (
    <div>
    <ScaleLoader loading={statusLoading} cssOverride={override} color='#329f8d'/>
      <Outlet/>
      <ToastContainer/>
    </div>
  )
}

export default Layout
