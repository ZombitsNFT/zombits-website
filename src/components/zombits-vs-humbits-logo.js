import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import * as zombitsVsHumbitsLogoStyles from "./zombits-vs-humbits-logo.module.scss"
import { Link } from "gatsby"

const ZombitsVsHumbitsLogo = () => {
  return (
    <Link to="/">
      <StaticImage
        src="../images/zombits-vs-humbits-logo.png"
        alt="Zombits VS Humbits"
        width={640}
        className={zombitsVsHumbitsLogoStyles.pixelated}
        placeholder="none"
        formats={["png"]}
        quality={100}
      />
    </Link>
  )
}

export default ZombitsVsHumbitsLogo
