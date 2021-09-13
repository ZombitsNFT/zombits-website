import React from "react"

import TwitterSocial from "./twitter-social"
import TelegramSocial from "./telegram-social"
import BuyNow from "./buy-now"
import * as aboutStyles from "./about.module.scss"
import DiscordSocial from "./discord-social"

const About = () => {
  return (
    <div className={aboutStyles.about}>
      <h2 id="about" className={aboutStyles.h2}>
        About
      </h2>
      <p>
        Zombits is an NFT project of 10,000 unique crypto collectibles on the
        Cardano blockchain.
      </p>
      <p>
        Only 10,000 Zombits are in existence, and Each Zombit is unique in its
        own way &mdash; no two look the same.
      </p>
      <p>
        With each Zombit comes a unique set of traits. Each trait has a specific
        rarity, making some Zombits rarer than others.
      </p>
      <p>Start collecting now!</p>
      <div className={aboutStyles.buyNow}>
        <BuyNow />
      </div>
      <div className={aboutStyles.social}>
        <TwitterSocial />
        <DiscordSocial />
        <TelegramSocial />
      </div>
    </div>
  )
}

export default About
