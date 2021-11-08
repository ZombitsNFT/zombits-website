import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import * as playNowButtonStyles from "./play-now.module.scss"

const PlayNow = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          gameUrl
        }
      }
    }
  `)

  return (
    <a href={data.site.siteMetadata.gameUrl} target="_blank" rel="noreferrer">
      <StaticImage
        src="../images/play-now.png"
        alt="Play Now"
        width={300}
        imgClassName={playNowButtonStyles.pixelated}
        placeholder="none"
        formats={["png"]}
        quality={100}
      />
    </a>
  )
}

export default PlayNow
