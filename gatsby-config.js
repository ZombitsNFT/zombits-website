module.exports = {
  siteMetadata: {
    title: "Zombits",
    description:
      "Zombits is an NFT collection of 10,000, one-of-a-kind crypto collectibles on the Cardano blockchain. Coming soon.",
    keywords:
      "zombits, zombit, nft, non-fungible token, crypto, cryptocurrency, collectible, cardano, ada, blockchain",
    twitterUrl: "https://twitter.com/ZombitsNFT",
    telegramUrl: "https://t.me/Zombits",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["G-WZDZQWNV9Z"],
      },
    },
  ],
}
