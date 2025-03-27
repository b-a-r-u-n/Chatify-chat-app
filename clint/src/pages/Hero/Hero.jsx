import React from 'react'
import { Navbar } from '../../components'
import { Outlet } from 'react-router-dom'

const Hero = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Hero
