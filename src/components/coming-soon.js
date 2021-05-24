import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import * as comingSoonButtonStyles from "./coming-soon.module.scss"

const ComingSoon = () => {
  return (
    <StaticImage
      src="../images/coming-soon.png"
      alt="Coming Soon"
      width={300}
      imgClassName={comingSoonButtonStyles.pixelated}
      placeholder="none"
      formats={["png"]}
      quality={100}
    />
  )
}

export default ComingSoon
