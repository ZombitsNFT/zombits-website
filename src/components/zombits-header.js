import React from "react"

import ZombitsImage from "./zombits-image"
import ZombitsLogo from "./zombits-logo"
import * as zombitsHeaderStyles from "./zombits-header.module.scss"
import ComingSoon from "./coming-soon"
import TwitterSocial from "./twitter-social"
import TelegramSocial from "./telegram-social"

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
      <div className={zombitsHeaderStyles.social}>
        <TwitterSocial />
        <TelegramSocial />
      </div>
      <div className={zombitsHeaderStyles.comingSoon}>
        <ComingSoon />
      </div>
    </div>
  )
}

export default ZombitsHeader
