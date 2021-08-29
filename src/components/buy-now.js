import React from "react"
import ReactModal from "react-modal"
import Countdown, { zeroPad } from "react-countdown"
import { StaticImage } from "gatsby-plugin-image"
import { Select } from "antd"

import * as buyNowButtonStyles from "./buy-now.module.scss"
const { Option } = Select

const BuyNow = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [zombitsAmount, setZombitsAmount] = React.useState(1)
  const [timer] = React.useState(undefined)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    clearInterval(timer)
  }

  return <div className={buyNowButtonStyles.buttonContent}></div>
}

export default BuyNow
