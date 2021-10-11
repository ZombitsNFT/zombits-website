module.exports = {
  siteMetadata: {
    title: "Humbits & Zombits",
    description:
      "Humbits & Zombits is an NFT collection of 10,000, one-of-a-kind crypto collectibles on the Cardano blockchain.",
    keywords:
      "humbits, humbit, zombits, zombit, nft, non-fungible token, crypto, cryptocurrency, collectible, cardano, ada, blockchain",
    twitterUrl: "https://twitter.com/ZombitsNFT",
    telegramUrl: "https://t.me/Zombits",
    discordUrl: "https://discord.gg/TknQtZGEpg",
    marketplaceUrl:
      "https://cnft.io/marketplace.php?verified=true&project=Zombits",
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
