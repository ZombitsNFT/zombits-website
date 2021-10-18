import React from "react"
import ReactModal from "react-modal"
import { StaticImage } from "gatsby-plugin-image"
import { Select } from "antd"
import Countdown, { zeroPad } from "react-countdown"
import axios from "axios"

import * as buyNowButtonStyles from "./buy-now.module.scss"
import ComingSoon from "./coming-soon"
const { Option } = Select

const BuyNow = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [humbitsAmount, setHumbitsAmount] = React.useState(1)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Countdown
      date={1634504400000}
      renderer={props => (
        <div className={buyNowButtonStyles.buttonContent}>
          <ComingSoon />
          <h2>
            {zeroPad(props.days)}:{zeroPad(props.hours)}:
            {zeroPad(props.minutes)}:{zeroPad(props.seconds)}
          </h2>
        </div>
      )}
    />
  )
}

export default BuyNow
