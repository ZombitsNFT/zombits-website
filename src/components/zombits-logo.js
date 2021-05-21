import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import * as zombitsLogoStyles from "./zombits-logo.module.scss"

const ZombitsLogo = () => {
  return (
    <StaticImage
      src="../images/zombits-logo.png"
      alt="Zombits Logo"
      width={500}
      imgClassName={zombitsLogoStyles.pixelated}
      placeholder="none"
      formats={["png"]}
      quality={100}
    />
  )
}

export default ZombitsLogo
