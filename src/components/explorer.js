import React from "react"
import ReactModal from "react-modal"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Select } from "antd"
import InfiniteScroll from "react-infinite-scroll-component"

import ZombitsImage from "./zombits-image"
import * as explorerStyles from "./explorer.module.scss"

const { Option, OptGroup } = Select
const INCREMENT = 5

const Explorer = () => {
  const data = useStaticQuery(graphql`
    query {
      allZombitsJson {
        edges {
          node {
            id
            name
            features
            arweaveId
            image
            statisticalRarity
            rarity
          }
        }
      }
      allFeaturesJson {
        edges {
          node {
            name
            values {
              name
              count
            }
          }
        }
      }
      allFeatureCountsJson {
        edges {
          node {
            name
            value
            count
          }
        }
      }
      allRaritiesJson {
        edges {
          node {
            name
            count
          }
        }
      }
    }
  `)

  // To calculate statistical rarity: Multiply rarites of all features (including missing features, e.g. rarity of no pants), and multiply with rarity of feature count.
  // To get rarity names, sort Zombits in order of increasing rarity, divide 10,000 Zombits up into 6 groups of 1, 117, 317, 861, 2341, and 6363, and name them "The Only One", "Legendary", "Epic", "Rare", "Uncommon", and "Common" respectively.
  // (1, 9999*(e**0)/(e**0+e**1+e**2+e**3+e**4), 9999*(e**1)/(e**0+e**1+e**2+e**3+e**4), 9999*(e**2)/(e**0+e**1+e**2+e**3+e**4), 9999*(e**3)/(e**0+e**1+e**2+e**3+e**4), 9999*(e**4)/(e**0+e**1+e**2+e**3+e**4))

  const [filteredItems, setFilteredItems] = React.useState([])
  const [shownItems, setShownItems] = React.useState([])
  const [hasMoreItems, setHasMoreItems] = React.useState(true)

  const [idFilters, setIdFilters] = React.useState([])
  const [featureFilters, setFeatureFilters] = React.useState([])
  const [featureCountFilter, setFeatureCountFilter] = React.useState("0")
  const [rarityFilter, setRarityFilter] = React.useState("")

  const [selectedZombit, setSelectedZombit] = React.useState(undefined)

  // Filter Zombits
  React.useEffect(() => {
    const filterResult = data.allZombitsJson.edges.filter(
      edge =>
        featureFilters.every(feature => edge.node.features.includes(feature)) &&
        (idFilters.includes(edge.node.id) || !idFilters.length) &&
        (parseInt(featureCountFilter) === edge.node.features.length ||
          !parseInt(featureCountFilter)) &&
        (rarityFilter === edge.node.rarity || !rarityFilter)
    )

    setFilteredItems(filterResult)
    setShownItems(filterResult.slice(0, shownItems.length + INCREMENT))
  }, [
    data.allZombitsJson.edges,
    featureFilters,
    featureCountFilter,
    idFilters,
    rarityFilter,
  ])

  // Pass more data to infinite scroll
  const incrementShownItems = () => {
    if (shownItems.length > filteredItems.length) {
      setHasMoreItems(false)
    }
    setShownItems(filteredItems.slice(0, shownItems.length + INCREMENT))
  }

  // Generate dropdown options for Zombit IDs
  const idFilterOptions = data.allZombitsJson.edges.map(edge => (
    <Option key={edge.node.id}>Zombit #{edge.node.id}</Option>
  ))

  // Generate grouped dropdown options for features
  const featureFilterOptions = data.allFeaturesJson.edges.map(edge => (
    <OptGroup
      key={edge.node.name}
      label={`${edge.node.name} (${edge.node.values.length.toLocaleString(
        "en"
      )})`}
    >
      {edge.node.values.map(value => (
        <Option key={value.name}>
          {value.name}{" "}
          <span className={explorerStyles.percentage}>
            ({value.count.toLocaleString("en")})
          </span>
        </Option>
      ))}
    </OptGroup>
  ))

  // Generate dropdown options for feature count
  const featureCountFilterOptions = data.allFeatureCountsJson.edges.map(
    edge => (
      <Option key={edge.node.value}>
        {edge.node.name}{" "}
        <span className={explorerStyles.percentage}>
          ({edge.node.count.toLocaleString("en")})
        </span>
      </Option>
    )
  )

  // Generate dropdown options for rarities
  const raritiesFilterOptions = data.allRaritiesJson.edges.map(edge => (
    <Option key={edge.node.name}>
      {edge.node.name}{" "}
      <span className={explorerStyles.percentage}>
        ({edge.node.count.toLocaleString("en")})
      </span>
    </Option>
  ))

  const handleCloseModal = () => {
    setSelectedZombit(undefined)
  }

  return (
    <div className={explorerStyles.explorer}>
      <ReactModal
        isOpen={selectedZombit !== undefined}
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
        htmlOpenClassName={explorerStyles.modalOpen}
        contentLabel="Zombit Information"
      >
        {selectedZombit && (
          <div className={explorerStyles.modalContent}>
            <button
              className={`${explorerStyles.modalCloseButton}`}
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <ZombitsImage zombitId={selectedZombit.id} size={280} />
            <h2 className={explorerStyles.modalZombitName}>
              {selectedZombit.name}
            </h2>
            <h4
              className={
                // Conditionally set rarity label styles
                selectedZombit.rarity === "Common"
                  ? `${explorerStyles.modalRarity} ${explorerStyles.commonRarity}`
                  : selectedZombit.rarity === "Uncommon"
                  ? `${explorerStyles.modalRarity} ${explorerStyles.uncommonRarity}`
                  : selectedZombit.rarity === "Rare"
                  ? `${explorerStyles.modalRarity} ${explorerStyles.rareRarity}`
                  : selectedZombit.rarity === "Epic"
                  ? `${explorerStyles.modalRarity} ${explorerStyles.epicRarity}`
                  : selectedZombit.rarity === "Legendary"
                  ? `${explorerStyles.modalRarity} ${explorerStyles.legendaryRarity}`
                  : `${explorerStyles.modalRarity} ${explorerStyles.theOnlyOneRarity}`
              }
            >
              {selectedZombit.rarity}
            </h4>
            <p className={explorerStyles.bold}>
              {selectedZombit.features.length} features{" "}
              <span className={explorerStyles.percentage}>
                {
                  // Find rarity of its feature count
                  (100 *
                    data.allFeatureCountsJson.edges.find(
                      edge => edge.node.value === selectedZombit.features.length
                    ).node.count) /
                    10_000
                }
                %
              </span>
            </p>
            <ul className={explorerStyles.featureList}>
              {
                // Find rarities of its features
                selectedZombit.features.map(feature => {
                  const count = data.allFeaturesJson.edges
                    .flatMap(edge => edge.node.values)
                    .find(value => value.name === feature).count
                  return (
                    <li key={feature}>
                      <p className={explorerStyles.featureListItem}>
                        {feature}{" "}
                        <span className={explorerStyles.percentage}>
                          {(100 * count) / 10_000}%
                        </span>
                      </p>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )}
      </ReactModal>
      <h2 className={explorerStyles.h2}>Explore</h2>
      <p>
        Only 10,000 Zombits were ever minted using a{" "}
        <a
          href="https://cardanoscan.io/tokenPolicy/ad6290066292cfeef7376cd575e5d8367833ab3d8b2ac53d26ae4ecc"
          target="_blank"
          rel="noreferrer"
        >
          time-locked policy
        </a>
        . No two Zombits are alike, and each Zombit has a unique set of
        features, making some Zombits more valuable than others.
      </p>
      <p>Explore all Zombits below!</p>
      <div className={explorerStyles.filters}>
        <Select
          className={explorerStyles.filter}
          mode="multiple"
          allowClear
          size="large"
          placeholder="Search Zombits"
          onChange={setIdFilters}
        >
          {idFilterOptions}
        </Select>
        <Select
          className={explorerStyles.filter}
          mode="multiple"
          allowClear
          size="large"
          placeholder="Filter features"
          onChange={setFeatureFilters}
        >
          {featureFilterOptions}
        </Select>
        <Select
          className={explorerStyles.filter}
          size="large"
          defaultValue="0"
          onChange={setFeatureCountFilter}
        >
          <Option key={0}>Any number of features</Option>
          {featureCountFilterOptions}
        </Select>
        <Select
          className={explorerStyles.filter}
          size="large"
          defaultValue=""
          onChange={setRarityFilter}
        >
          <Option key="">Any rarity</Option>
          {raritiesFilterOptions}
        </Select>
      </div>
      {filteredItems.length > 0 && (
        <p className={explorerStyles.light}>
          {filteredItems.length.toLocaleString("en")}{" "}
          {filteredItems.length === 1 ? "result" : "results"}
        </p>
      )}
      <InfiniteScroll
        className={explorerStyles.scroll}
        dataLength={shownItems.length}
        next={incrementShownItems}
        hasMore={hasMoreItems}
      >
        {
          // Render Zombits list
          shownItems.map(edge => (
            <button
              className={explorerStyles.listItem}
              key={edge.node.id}
              onClick={() => {
                setSelectedZombit(edge.node)
              }}
            >
              <ZombitsImage zombitId={edge.node.id} size={240} />
              <h3>#{edge.node.id}</h3>
            </button>
          ))
        }
        {
          // No Zombits found
          filteredItems.length === 0 && (
            <div className={explorerStyles.notFound}>
              <StaticImage
                src="../images/zombit-not-found.png"
                alt="No Zombits found"
                width={240}
                className={explorerStyles.notFound}
                placeholder="none"
                formats={["png"]}
                quality={100}
              />
              <h3>No Zombits found</h3>
            </div>
          )
        }
      </InfiniteScroll>
    </div>
  )
}

export default Explorer
