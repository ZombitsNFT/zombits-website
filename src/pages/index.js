import React from "react"

import Head from "../components/head"
import ZombitsHeader from "../components/zombits-header"
import "../styles/index.scss"
import About from "../components/about"
import Faq from "../components/faq"
import Explorer from "../components/explorer"

const Home = () => {
  return (
    <div>
      <Head title="Coming Soon" />
      <ZombitsHeader />
      <About />
      <Faq />
      <Explorer />
    </div>
  )
}

export default Home
