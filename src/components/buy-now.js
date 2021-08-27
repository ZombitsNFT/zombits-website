import React from "react"
import ReactModal from "react-modal"
import Countdown, { zeroPad } from "react-countdown"
import { StaticImage } from "gatsby-plugin-image"
import { Select } from "antd"

import * as buyNowButtonStyles from "./buy-now.module.scss"
const { Option } = Select

const BuyNow = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [randomNumber] = React.useState(Math.random() / 10)
  const [zombitsAmount, setZombitsAmount] = React.useState(1)
  const [timer] = React.useState(undefined)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    clearInterval(timer)
  }

  return (
    <Countdown
      date={new Date("29 August 2021, 17:00:00 EDT")}
      renderer={props => {
        return props.completed ? (
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
                    alt="Random Zombit"
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
                      defaultValue={"1 Zombit"}
                      className={buyNowButtonStyles.filter}
                      size="large"
                      onChange={setZombitsAmount}
                    >
                      <Option key={1}>1 Zombit</Option>
                      <Option key={2}>2 Zombits</Option>
                      <Option key={3}>3 Zombits</Option>
                      <Option key={4}>4 Zombits</Option>
                      <Option key={5}>5 Zombits</Option>
                      <Option key={6}>6 Zombits</Option>
                      <Option key={7}>7 Zombits</Option>
                      <Option key={8}>8 Zombits</Option>
                      <Option key={9}>9 Zombits</Option>
                      <Option key={10}>10 Zombits</Option>
                    </Select>{" "}
                    , send EXACTLY
                  </p>
                  <p className={buyNowButtonStyles.strong}>
                    {Math.round(
                      (10 + randomNumber) * zombitsAmount * 1_000_000
                    ) / 1_000_000}
                  </p>
                  <p>ADA to the following Cardano address:</p>
                  <p className={buyNowButtonStyles.strong}>
                    addr1v9w53uk45fa6h9ufjw8as235pa0n0h5j7n3d7mrfmduxjxseq4u4s
                  </p>
                  <Countdown
                    date={new Date(Date.now() + 600_000)}
                    zeroPadTime={2}
                    onComplete={handleCloseModal}
                    renderer={props => (
                      <p>
                        Your Zombits are reserved for {zeroPad(props.minutes)}:
                        {zeroPad(props.seconds)} minutes.
                      </p>
                    )}
                  />
                  <ul>
                    <li>
                      Never send ADA from an exchange! Your Zombits will be
                      lost.
                    </li>
                    <li>
                      If you send an incorrect amount, that amount (minus the
                      transaction fee) will be automatically refunded.
                    </li>
                    <li>
                      Due to the nature of NFTs, no refunds will be issued under
                      other circumstances.
                    </li>
                    <li>
                      The time taken to receive your Zombits may vary. Message
                      us on{" "}
                      <a
                        href="https://twitter.com/ZombitsNFT"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Twitter
                      </a>
                      ,{" "}
                      <a
                        href="https://discord.gg/TknQtZGEpg"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Discord
                      </a>
                      , or{" "}
                      <a
                        href="https://t.me/Zombits"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Telegram
                      </a>{" "}
                      if you have any questions or concerns!
                    </li>
                  </ul>
                </div>
              </div>
            </ReactModal>
            <button
              className={buyNowButtonStyles.button}
              onClick={() => {
                setIsModalOpen(true)
                setZombitsAmount(1)
              }}
            >
              <StaticImage
                src="../images/buy-now.png"
                alt="Coming Soon"
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
            <StaticImage
              src="../images/coming-soon.png"
              alt="Coming Soon"
              width={300}
              imgClassName={buyNowButtonStyles.pixelated}
              placeholder="none"
              formats={["png"]}
              quality={100}
            />
            <h2>
              {zeroPad(props.days)}:{zeroPad(props.hours)}:
              {zeroPad(props.minutes)}:{zeroPad(props.seconds)}
            </h2>
          </div>
        )
      }}
    />
  )
}

export default BuyNow
