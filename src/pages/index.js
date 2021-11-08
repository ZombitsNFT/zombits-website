import React from "react"

import Head from "../components/head"
// import ZombitsHeader from "../components/zombits-header"
import ZombitsVsHumbitsHeader from "../components/zombits-vs-humbits-header"
import "../styles/index.scss"
import About from "../components/about"
import Roadmap from "../components/roadmap"
import Faq from "../components/faq"
import MainExplorer from "../components/main-explorer"

const Home = () => {
  return (
    <div>
      <Head title="Home" />
      <ZombitsVsHumbitsHeader />
      <About />
      <Faq />
      <Roadmap />
      <MainExplorer />
    </div>
  )
}

export default Home
