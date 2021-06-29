import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import * as buyNowButtonStyles from "./buy-now.module.scss"

const BuyNow = () => {
  return (
    <button className={buyNowButtonStyles.button} onClick={() => {}}>
      <StaticImage
        src="../images/buy-now.png"
        alt="Coming Soon"
        width={300}
        imgClassName={buyNowButtonStyles.pixelated}
        onMouseEnter={e =>
          (e.currentTarget.src = "../images/buy-now-inverse.png")
        }
        placeholder="none"
        formats={["png"]}
        quality={100}
      />
    </button>
  )
}

export default BuyNow
