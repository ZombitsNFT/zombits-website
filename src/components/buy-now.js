import React from "react"
import ReactModal from "react-modal"
import axios from "axios"
import Countdown, { zeroPad } from "react-countdown"
import { StaticImage } from "gatsby-plugin-image"

import * as buyNowButtonStyles from "./buy-now.module.scss"
import ZombitsImage from "./zombits-image"

const BuyNow = () => {
  const [reservation, setReservation] = React.useState(undefined)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [remainingZombits, setRemainingZombits] = React.useState("...")
  const [purchasedZombit, setPurchasedZombit] = React.useState(undefined)
  const [timer, setTimer] = React.useState(undefined)

  React.useEffect(() => {
    axios
      .get("http://api.zombits.io/reservations/legendary/count")
      .then(result => {
        setRemainingZombits(result.data.legendary)
        // console.log("REMAINING", result.data.legendary)
      })
      .catch(_ => {})
  }, [remainingZombits])

  React.useEffect(() => {
    if (purchasedZombit !== undefined) {
      clearInterval(timer)
    }
    if (isModalOpen && reservation === undefined) {
      // Create reservation
      axios
        .post("http://api.zombits.io/reservations")
        .then(result => {
          setReservation(result.data)
          // console.log("POST /reservations", result.data)
          // Poll reservation status
          setTimer(
            setInterval(() => {
              axios
                .get(`http://api.zombits.io/reservations/${result.data.price}`)
                .then(result => {
                  // setPurchasedZombit(result.data)
                  // console.log("GET /reservations/price", result.data)
                  result.data.id = result.data.assetName.split("Zombit")[1]
                  setPurchasedZombit(result.data)
                })
                .catch(_ => {})
              // console.log("AAAAAAAAAA 1")
            }, 10_000)
          )
        })
        .catch(_ => {})
    }
  })

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setReservation(undefined)
    clearInterval(timer)
    setPurchasedZombit(undefined)
  }

  return (
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
          {reservation === undefined ? (
            <p>Loading...</p>
          ) : purchasedZombit === undefined ? (
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
              <p>To receive your random Zombit, send EXACTLY</p>
              <p className={buyNowButtonStyles.strong}>
                {(reservation.price / 1_000_000).toFixed(6)}
              </p>
              <p>ADA to the following Cardano address:</p>
              <p className={buyNowButtonStyles.strong}>
                {reservation.paymentAddress}
              </p>
              <Countdown
                date={new Date(reservation.expiresAt)}
                zeroPadTime={2}
                onComplete={handleCloseModal}
                renderer={props => {
                  return props.completed ? (
                    <p>Your Zombit reservation has expired.</p>
                  ) : (
                    <p>
                      Your Zombit is reserved for {zeroPad(props.minutes)}:
                      {zeroPad(props.seconds)} minutes.
                    </p>
                  )
                }}
              />
              <ul>
                <li>
                  Never send ADA from an exchange! Your Zombit will be lost.
                </li>
                <li>
                  If you send an incorrect amount, that amount (minus the
                  transaction fee) will be automatically refunded.
                </li>
              </ul>
            </div>
          ) : (
            <div className={buyNowButtonStyles.notFound}>
              <ZombitsImage zombitId={purchasedZombit.id} size={240} />
              <h2 className={buyNowButtonStyles.modalZombitName}>
                Zombit #{purchasedZombit.id}
              </h2>
              <h4
                className={
                  // Conditionally set rarity label styles
                  purchasedZombit.rarity === "Common"
                    ? `${buyNowButtonStyles.modalRarity} ${buyNowButtonStyles.commonRarity}`
                    : purchasedZombit.rarity === "Uncommon"
                    ? `${buyNowButtonStyles.modalRarity} ${buyNowButtonStyles.uncommonRarity}`
                    : purchasedZombit.rarity === "Rare"
                    ? `${buyNowButtonStyles.modalRarity} ${buyNowButtonStyles.rareRarity}`
                    : purchasedZombit.rarity === "Epic"
                    ? `${buyNowButtonStyles.modalRarity} ${buyNowButtonStyles.epicRarity}`
                    : purchasedZombit.rarity === "Legendary"
                    ? `${buyNowButtonStyles.modalRarity} ${buyNowButtonStyles.legendaryRarity}`
                    : `${buyNowButtonStyles.modalRarity} ${buyNowButtonStyles.theOnlyOneRarity}`
                }
              >
                {purchasedZombit.rarity}
              </h4>
              <p>Congratulations!</p>
              <p>You got Zombit #{purchasedZombit.id}. Such a beauty!</p>
              <p>Thank you for supporting Zombits!</p>
            </div>
          )}
        </div>
      </ReactModal>
      <button
        className={buyNowButtonStyles.button}
        onClick={() => {
          setIsModalOpen(true)
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
      <h3>{remainingZombits} Legendary Zombits still remain!</h3>
    </div>
  )
}

export default BuyNow
