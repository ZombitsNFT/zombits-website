import React from "react"
import Countdown, { zeroPad } from "react-countdown"

import * as buyNowButtonStyles from "./buy-now.module.scss"
import ComingSoon from "./coming-soon"

const BuyNow = () => {
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
