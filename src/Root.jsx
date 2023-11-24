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
