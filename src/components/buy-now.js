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
      renderer={props =>
        props.completed ? (
          <div className={buyNowButtonStyles.buttonContent}>
            <ReactModal
              isOpen={isModalOpen}
              onRequestClose={handleCloseModal}
              style={{
                overlay: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                },
                content: {
                  inset: "auto",
                  maxHeight: "90%",
                  maxWidth: "90%",
                  padding: 0,
                  display: "flex",
                },
              }}
              htmlOpenClassName={buyNowButtonStyles.modalOpen}
              contentLabel="Buy Now"
            >
              <div className={buyNowButtonStyles.modalContent}>
                <button
                  className={buyNowButtonStyles.modalCloseButton}
                  onClick={handleCloseModal}
                >
                  ✕
                </button>
                <div className={buyNowButtonStyles.notFound}>
                  <StaticImage
                    src="../images/zombit-not-found.png"
                    alt="Random Humbit"
                    width={240}
                    className={buyNowButtonStyles.wiggle}
                    placeholder="none"
                    formats={["png"]}
                    quality={100}
                  />
                  <h3>Instructions</h3>
                  <p>
                    To receive your random{" "}
                    <Select
                      defaultValue={"1 Humbit"}
                      className={buyNowButtonStyles.filter}
                      size="large"
                      onChange={setHumbitsAmount}
                    >
                      <Option key={1}>1 Humbit</Option>
                      <Option key={2}>2 Humbits</Option>
                      <Option key={3}>3 Humbits</Option>
                      <Option key={4}>4 Humbits</Option>
                      <Option key={5}>5 Humbits</Option>
                      <Option key={6}>6 Humbits</Option>
                      <Option key={7}>7 Humbits</Option>
                      <Option key={8}>8 Humbits</Option>
                      <Option key={9}>9 Humbits</Option>
                      <Option key={10}>10 Humbits</Option>
                    </Select>{" "}
                    , send EXACTLY
                  </p>
                  <p className={buyNowButtonStyles.strong}>
                    {20 * humbitsAmount}
                  </p>
                  <p>ADA to the following Cardano address:</p>
                  <p className={buyNowButtonStyles.strong}>
                    addr1v96u9w4a0qzzrmn0586y209ltvgz24jm7sr3y4m4rhxa42cpv6txk
                  </p>
                  <ul>
                    <li>
                      Never send ADA from an exchange! Your Humbits will be
                      lost. :(
                    </li>
                  </ul>
                </div>
              </div>
            </ReactModal>
            <button
              className={buyNowButtonStyles.button}
              onClick={() => {
                setIsModalOpen(true)
                setHumbitsAmount(1)
              }}
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
            </button>
          </div>
        ) : (
          <div className={buyNowButtonStyles.buttonContent}>
            <ComingSoon />
            <h2>
              {zeroPad(props.days)}:{zeroPad(props.hours)}:
              {zeroPad(props.minutes)}:{zeroPad(props.seconds)}
            </h2>
          </div>
        )
      }
    />
  )
}

export default BuyNow
