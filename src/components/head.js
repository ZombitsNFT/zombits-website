import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from "react-helmet"

const Head = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          keywords
        }
      }
    }
  `)
  return (
    <Helmet
      title={`${title} | ${data.site.siteMetadata.title}`}
      htmlAttributes={{ lang: "en" }}
      meta={[
        { name: "description", content: data.site.siteMetadata.description },
        { name: "keywords", content: data.site.siteMetadata.keywords },
      ]}
    />
  )
}

export default Head
