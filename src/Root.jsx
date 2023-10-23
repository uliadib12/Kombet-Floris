import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Topbar from './component/Topbar'
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <Topbar/>
      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default Root
