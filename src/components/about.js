import React from "react"

import TwitterSocial from "./twitter-social"
import TelegramSocial from "./telegram-social"
import PlayNow from "./play-now"
import * as aboutStyles from "./about.module.scss"
import DiscordSocial from "./discord-social"
// import ComingSoon from "./coming-soon"

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
      {/* <div className={aboutStyles.playNow}>
        <PlayNow />
      </div> */}
      <div className={aboutStyles.social}>
        <TwitterSocial />
        <DiscordSocial />
        <TelegramSocial />
      </div>
      <span className={aboutStyles.light}>
        Zombits Policy ID:{" "}
        <a
          href="https://cardanoscan.io/tokenPolicy/ad6290066292cfeef7376cd575e5d8367833ab3d8b2ac53d26ae4ecc"
          target="_blank"
          rel="noreferrer"
        >
          ad6290066292cfeef7376cd575e5d8367833ab3d8b2ac53d26ae4ecc
        </a>
      </span>
      <br />
      <span className={aboutStyles.light}>
        Humbits Policy ID:{" "}
        <a
          href="https://cardanoscan.io/tokenPolicy/d44cba92bdb8e40360c3979cdc2cf289cdc3aed44e4f3f2bf8aa6def"
          target="_blank"
          rel="noreferrer"
        >
          d44cba92bdb8e40360c3979cdc2cf289cdc3aed44e4f3f2bf8aa6def
        </a>
      </span>
    </div>
  )
}

export default About
