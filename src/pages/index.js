import React from "react"

import Head from "../components/head"
import ZombitsHeader from "../components/zombits-header"
import "../styles/index.scss"
import About from "../components/about"
import Roadmap from "../components/roadmap"
import Faq from "../components/faq"
import Explorer from "../components/explorer"

const Home = () => {
  return (
    <div>
      <Head title="NFTs on Cardano" />
      <ZombitsHeader />
      <About />
      <Roadmap />
      <Faq />
      <Explorer />
    </div>
  )
}

export default Home
