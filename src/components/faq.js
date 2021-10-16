import React from "react"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { graphql, useStaticQuery } from "gatsby"

import * as faqStyles from "./faq.module.scss"

const Faq = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          marketplaceUrl
          discordUrl
          twitterUrl
          telegramUrl
        }
      }
    }
  `)

  return (
    <div className={faqStyles.faq}>
      <h2 id="faq" className={faqStyles.h2}>
        F.A.Q.
      </h2>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          style={{ backgroundColor: "#eee" }}
        >
          <Typography
            style={{
              fontFamily:
                "Connection III, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              fontSize: "1.25em",
            }}
          >
            How can I buy a Humbit?
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#fff" }}>
          <Typography
            style={{
              fontFamily:
                "Connection III, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              margin: "auto",
            }}
          >
            <p>
              To buy a Humbit, click the BUY NOW button <a href="/#">above</a>{" "}
              once the countdown has ended.
            </p>
            <p>
              Choose how many Humbits you'd like, and send the exact amount of
              ADA shown to the Cardano address shown.
            </p>
            <p>
              If you send an incorrect amount, the amount (minus the transaction
              fee) will be automatically refunded.
            </p>
            <p>Good luck! 🧟</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          style={{ backgroundColor: "#eee" }}
        >
          <Typography
            style={{
              fontFamily:
                "Connection III, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              fontSize: "1.25em",
            }}
          >
            Which wallets can I use?
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#fff" }}>
          <Typography
            style={{
              fontFamily:
                "Connection III, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              margin: "auto",
            }}
          >
            <p>
              <a href={"https://yoroi-wallet.com/"}>Yoroi</a>
            </p>
            <p>
              <a href={"https://namiwallet.io/"}>Nami</a>
            </p>
            <p>
              <a href={"https://daedaluswallet.io/"}>Daedalus</a>
            </p>
            <p>
              <a href={"https://adalite.io/"}>AdaLite</a>
            </p>
            <p>Never send ADA from an exchange!</p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          style={{ backgroundColor: "#eee" }}
        >
          <Typography
            style={{
              fontFamily:
                "Connection III, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              fontSize: "1.25em",
            }}
          >
            How can I buy a Zombit?
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#fff" }}>
          <Typography
            style={{
              fontFamily:
                "Connection III, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              margin: "auto",
            }}
          >
            <p>
              The Zombits sale is over! Missed the sale? No worries! Head to{" "}
              <a
                href={data.site.siteMetadata.marketplaceUrl}
                target="_blank"
                rel="noreferrer"
              >
                CNFT.io
              </a>{" "}
              to buy a Zombit now!
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          style={{ backgroundColor: "#eee" }}
        >
          <Typography
            style={{
              fontFamily:
                "Connection III, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              fontSize: "1.25em",
            }}
          >
            Are these really NFTs?
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#fff" }}>
          <Typography
            style={{
              fontFamily:
                "Connection III, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              margin: "auto",
            }}
          >
            <p>Yes!</p>
            <p>
              Humbits and Zombits were minted using a time-locked policy,
              meaning that no more Humbits or Zombits can be created (minted) or
              destroyed (burned) after a certain amount of time.
            </p>
            <p>
              That certain amount of time has passed for Zombits, and all 10,000
              Zombits have been minted, meaning there will only ever be one of
              each 10,000 Zombits!
            </p>
            <p>Therefore, by definition, all Zombits are NFTs.</p>
            <p>
              You can view both the{" "}
              <a
                href="https://pool.pm/policy/ad6290066292cfeef7376cd575e5d8367833ab3d8b2ac53d26ae4ecc"
                target="_blank"
                rel="noreferrer"
              >
                Zombits minting policy
              </a>
              , and the{" "}
              <a
                href="https://pool.pm/policy/d44cba92bdb8e40360c3979cdc2cf289cdc3aed44e4f3f2bf8aa6def"
                target="_blank"
                rel="noreferrer"
              >
                Humbits minting policy
              </a>
              .
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          style={{ backgroundColor: "#eee" }}
        >
          <Typography
            style={{
              fontFamily:
                "Connection III, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              fontSize: "1.25em",
            }}
          >
            Where are the metadata?
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor: "#fff" }}>
          <Typography
            style={{
              fontFamily:
                "Connection III, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
              margin: "auto",
            }}
          >
            <p>
              The metadata for each Humbit and Zombit are on-chain. The metadata
              contains IPFS links in order to keep the Humbits and Zombits
              immutable and retrievable forever.
            </p>
            <p>
              The metadata are in the minting transactions of the tokens. To see
              an example, view the{" "}
              <a
                href="https://cardanoscan.io/transaction/49d840383d2729886f146ca6d8fc4210c066c4810fec5847cb3a168ef9cf9f1b?tab=metadata"
                target="_blank"
                rel="noreferrer"
              >
                Zombits minting transaction
              </a>{" "}
              or any of the{" "}
              <a
                href="https://cardanoscan.io/tokenPolicy/d44cba92bdb8e40360c3979cdc2cf289cdc3aed44e4f3f2bf8aa6def"
                target="_blank"
                rel="noreferrer"
              >
                Humbits minting transactions
              </a>
              , scroll down to the metadata tab, and click on the metadata.
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Faq
