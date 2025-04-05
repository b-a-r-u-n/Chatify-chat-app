import React from 'react'
import { Navbar } from '../../components'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Hero = () => {

  const themeColor = useSelector(state => state.theme.themeColor);

  return (
    <div data-theme={themeColor}>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Hero
