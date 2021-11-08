import React from "react"

import ZombitsImage from "./zombits-image"
import ZombitsLogo from "./zombits-logo"
import * as zombitsHeaderStyles from "./zombits-header.module.scss"
import PlayNow from "./play-now"
import TwitterSocial from "./twitter-social"
import TelegramSocial from "./telegram-social"
import DiscordSocial from "./discord-social"

const ZombitsHeader = () => {
  return (
    <div className={zombitsHeaderStyles.headerContainer}>
      <div className={zombitsHeaderStyles.imagesContainer}>
        <ZombitsImage size={270} />
        <ZombitsImage size={320} />
        <ZombitsImage size={270} />
      </div>
      <div className={zombitsHeaderStyles.zombitsLogo}>
        <ZombitsLogo />
      </div>
      <h2 className={zombitsHeaderStyles.h2}>
        10,000 crypto collectibles on the Cardano blockchain
      </h2>
      <div className={zombitsHeaderStyles.playNow}>
        <PlayNow />
      </div>
      <div className={zombitsHeaderStyles.social}>
        <TwitterSocial />
        <DiscordSocial />
        <TelegramSocial />
      </div>
    </div>
  )
}

export default ZombitsHeader
