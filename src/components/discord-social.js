import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

const DiscordSocial = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          discordUrl
        }
      }
    }
  `)

  return (
    <a
      href={data.site.siteMetadata.discordUrl}
      target="_blank"
      rel="noreferrer"
    >
      <StaticImage
        src="../images/discord.png"
        alt="Discord"
        width={32}
        placeholder="none"
      />
    </a>
  )
}

export default DiscordSocial
