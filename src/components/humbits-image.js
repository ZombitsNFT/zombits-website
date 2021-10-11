import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/opacity.css"

import * as humbitsImageStyles from "./humbits-image.module.scss"

const HumbitsImage = ({
  humbitId = Math.floor(Math.random() * 10_000) + 1,
  size,
}) => {
  return (
    <LazyLoadImage
      src={`/humbits/Humbit${humbitId}.png`}
      alt={`Humbit #${humbitId}`}
      width={size}
      height={size}
      className={humbitsImageStyles.pixelated}
      effect="opacity"
    />
  )
}

export default HumbitsImage
