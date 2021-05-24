import React from "react"
import { navigate } from "gatsby-link"

const NotFound = () => {
  React.useEffect(() => {
    navigate("/")
  }, [])
  return null
}

export default NotFound
