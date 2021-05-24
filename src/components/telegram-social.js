import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

const TelegramSocial = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          telegramUrl
        }
      }
    }
  `)

  return (
    <a
      href={data.site.siteMetadata.telegramUrl}
      target="_blank"
      rel="noreferrer"
    >
      <StaticImage
        src="../images/telegram.png"
        alt="Telegram"
        width={32}
        placeholder="none"
      />
    </a>
  )
}

export default TelegramSocial
