import React from "react"

import Head from "../components/head"
// import ZombitsHeader from "../components/zombits-header"
import HumbitsHeader from "../components/humbits-header"
import "../styles/index.scss"
import About from "../components/about"
import Roadmap from "../components/roadmap"
import Faq from "../components/faq"
import MainExplorer from "../components/main-explorer"

const Home = () => {
  return (
    <div>
      <Head title="Coming Soon" />
      {/* <ZombitsHeader /> */}
      <HumbitsHeader />
      <About />
      <Roadmap />
      <Faq />
      <MainExplorer />
    </div>
  )
}

export default Home
