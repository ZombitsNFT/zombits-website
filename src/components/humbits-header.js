import React from "react"

import HumbitsImage from "./humbits-image"
import HumbitsLogo from "./humbits-logo"
import * as humbitsHeaderStyles from "./humbits-header.module.scss"
// import ComingSoon from "./coming-soon"
import TwitterSocial from "./twitter-social"
import TelegramSocial from "./telegram-social"
import DiscordSocial from "./discord-social"
import BuyNow from "./buy-now"

const HumbitsHeader = () => {
  return (
    <div className={humbitsHeaderStyles.headerContainer}>
      <div className={humbitsHeaderStyles.imagesContainer}>
        <HumbitsImage size={270} />
        <HumbitsImage size={320} />
        <HumbitsImage size={270} />
      </div>
      <div className={humbitsHeaderStyles.humbitsLogo}>
        <HumbitsLogo />
      </div>
      <h2 className={humbitsHeaderStyles.h2}>
        10,000 crypto collectibles on the Cardano blockchain
      </h2>
      {/* <div className={humbitsHeaderStyles.buyNow}>
        <BuyNow />
      </div> */}
      <div className={humbitsHeaderStyles.social}>
        <TwitterSocial />
        <DiscordSocial />
        <TelegramSocial />
      </div>
    </div>
  )
}

export default HumbitsHeader
