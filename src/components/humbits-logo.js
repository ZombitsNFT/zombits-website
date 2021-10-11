import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import * as humbitsLogoStyles from "./humbits-logo.module.scss"
import { Link } from "gatsby"

const HumbitsLogo = () => {
  return (
    <Link to="/">
      <StaticImage
        src="../images/humbits-logo.png"
        alt="Humbits"
        width={640}
        className={humbitsLogoStyles.pixelated}
        placeholder="none"
        formats={["png"]}
        quality={100}
      />
    </Link>
  )
}

export default HumbitsLogo
