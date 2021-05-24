import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

const TwitterSocial = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          twitterUrl
        }
      }
    }
  `)

  return (
    <a
      href={data.site.siteMetadata.twitterUrl}
      target="_blank"
      rel="noreferrer"
    >
      <StaticImage
        src="../images/twitter.png"
        alt="Twitter"
        width={32}
        placeholder="none"
      />
    </a>
  )
}

export default TwitterSocial
