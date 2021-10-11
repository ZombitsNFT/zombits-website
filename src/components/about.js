import React from "react"

import TwitterSocial from "./twitter-social"
import TelegramSocial from "./telegram-social"
import BuyNow from "./buy-now"
import * as aboutStyles from "./about.module.scss"
import DiscordSocial from "./discord-social"
import ComingSoon from "./coming-soon"

const About = () => {
  return (
    <div className={aboutStyles.about}>
      <h2 id="about" className={aboutStyles.h2}>
        About
      </h2>
      <p>
        Humbits and Zombits are NFT projects of 10,000 unique crypto
        collectibles on the Cardano blockchain.
      </p>
      <p>
        Only 10,000 Humbits and 10,000 Zombits are in existence, and each of
        them is unique in its own way &mdash; no two look the same.
      </p>
      <p>
        With each Humbit and Zombit comes a unique set of traits. Each trait has
        a specific rarity, making some collectibles rarer than others.
      </p>
      <p>Start collecting now!</p>
      <div className={aboutStyles.buyNow}>
        {/* <BuyNow /> */}
        <ComingSoon />
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
