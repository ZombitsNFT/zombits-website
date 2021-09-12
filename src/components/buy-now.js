import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

import * as buyNowButtonStyles from "./buy-now.module.scss"

const BuyNow = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          marketplaceUrl
        }
      }
    }
  `)

  return (
    <div className={buyNowButtonStyles.buttonContent}>
      <a
        href={data.site.siteMetadata.marketplaceUrl}
        target="_blank"
        rel="noreferrer"
      >
        <StaticImage
          src="../images/buy-now.png"
          alt="Buy Now"
          width={300}
          imgClassName={buyNowButtonStyles.pixelated}
          placeholder="none"
          formats={["png"]}
          quality={100}
        />
      </a>
    </div>
  )
}

export default BuyNow
