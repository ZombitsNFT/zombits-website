import React from "react"

import ZombitsImage from "../components/zombits-image"
import ZombitsLogo from "../components/zombits-logo"

const Home = () => {
  return (
    <div>
      <ZombitsLogo size={200} />
      <ZombitsImage size={200} />
      <ZombitsImage size={200} />
      <ZombitsImage size={200} />
    </div>
  )
}

export default Home
