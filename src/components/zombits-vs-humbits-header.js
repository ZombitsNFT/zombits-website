import React from "react"

import HumbitsImage from "./humbits-image"
import HumbitsLogo from "./zombits-vs-humbits-logo"
import * as zombitsVsHumbitsHeaderStyles from "./zombits-vs-humbits-header.module.scss"
import TwitterSocial from "./twitter-social"
import TelegramSocial from "./telegram-social"
import DiscordSocial from "./discord-social"
import PlayNow from "./play-now"

const ZombitsVsHumbitsHeader = () => {
  return (
    <div className={zombitsVsHumbitsHeaderStyles.headerContainer}>
      <div className={zombitsVsHumbitsHeaderStyles.imagesContainer}>
        <HumbitsImage size={270} />
        <HumbitsImage size={320} />
        <HumbitsImage size={270} />
      </div>
      <div className={zombitsVsHumbitsHeaderStyles.humbitsLogo}>
        <HumbitsLogo />
      </div>
      <h2 className={zombitsVsHumbitsHeaderStyles.h2}>
        10,000 crypto collectibles on the Cardano blockchain
      </h2>
      <div className={zombitsVsHumbitsHeaderStyles.playNow}>
        <PlayNow />
      </div>
      <div className={zombitsVsHumbitsHeaderStyles.social}>
        <TwitterSocial />
        <DiscordSocial />
        <TelegramSocial />
      </div>
    </div>
  )
}

export default ZombitsVsHumbitsHeader
