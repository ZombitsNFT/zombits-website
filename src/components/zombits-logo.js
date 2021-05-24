import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import * as zombitsLogoStyles from "./zombits-logo.module.scss"
import { Link } from "gatsby"

const ZombitsLogo = () => {
  return (
    <Link to="/">
      <StaticImage
        src="../images/zombits-logo.png"
        alt="Zombits"
        width={640}
        imgClassName={zombitsLogoStyles.pixelated}
        placeholder="none"
        formats={["png"]}
        quality={100}
      />
    </Link>
  )
}

export default ZombitsLogo
