import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/opacity.css"

import * as zombitsImageStyles from "./zombits-image.module.scss"

const ZombitsImage = ({
  zombitId = Math.floor(Math.random() * 10_000) + 1,
  size,
}) => {
  return (
    <LazyLoadImage
      src={`/zombits/Zombit${zombitId}.png`}
      alt={`Zombit #${zombitId}`}
      width={size}
      className={zombitsImageStyles.pixelated}
      effect="opacity"
    />
  )
}

export default ZombitsImage
