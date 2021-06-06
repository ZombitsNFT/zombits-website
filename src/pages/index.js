import React from "react"

import Head from "../components/head"
import ZombitsHeader from "../components/zombits-header"
import "../styles/index.scss"
import Explorer from "../components/explorer"

const Home = () => {
  return (
    <div>
      <Head title="Coming Soon" />
      <ZombitsHeader />
      <Explorer />
    </div>
  )
}

export default Home
