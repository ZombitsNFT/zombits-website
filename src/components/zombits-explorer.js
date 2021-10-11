import React from "react"
import ReactModal from "react-modal"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Select } from "antd"
import InfiniteScroll from "react-infinite-scroll-component"

import ZombitsImage from "./zombits-image"
import * as zombitsExplorerStyles from "./zombits-explorer.module.scss"

const { Option, OptGroup } = Select
const INCREMENT = 5

const ZombitsExplorer = () => {
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
          <span className={zombitsExplorerStyles.percentage}>
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
        <span className={zombitsExplorerStyles.percentage}>
          ({edge.node.count.toLocaleString("en")})
        </span>
      </Option>
    )
  )

  // Generate dropdown options for rarities
  const raritiesFilterOptions = data.allRaritiesJson.edges.map(edge => (
    <Option key={edge.node.name}>
      {edge.node.name}{" "}
      <span className={zombitsExplorerStyles.percentage}>
        ({edge.node.count.toLocaleString("en")})
      </span>
    </Option>
  ))

  const handleCloseModal = () => {
    setSelectedZombit(undefined)
  }

  return (
    <div className={zombitsExplorerStyles.explorer}>
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
        htmlOpenClassName={zombitsExplorerStyles.modalOpen}
        contentLabel="Zombit Information"
      >
        {selectedZombit && (
          <div className={zombitsExplorerStyles.modalContent}>
            <button
              className={zombitsExplorerStyles.modalCloseButton}
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <ZombitsImage zombitId={selectedZombit.id} size={280} />
            <h2 className={zombitsExplorerStyles.modalZombitName}>
              {selectedZombit.name}
            </h2>
            <h4
              className={
                // Conditionally set rarity label styles
                selectedZombit.rarity === "Common"
                  ? `${zombitsExplorerStyles.modalRarity} ${zombitsExplorerStyles.commonRarity}`
                  : selectedZombit.rarity === "Uncommon"
                  ? `${zombitsExplorerStyles.modalRarity} ${zombitsExplorerStyles.uncommonRarity}`
                  : selectedZombit.rarity === "Rare"
                  ? `${zombitsExplorerStyles.modalRarity} ${zombitsExplorerStyles.rareRarity}`
                  : selectedZombit.rarity === "Epic"
                  ? `${zombitsExplorerStyles.modalRarity} ${zombitsExplorerStyles.epicRarity}`
                  : selectedZombit.rarity === "Legendary"
                  ? `${zombitsExplorerStyles.modalRarity} ${zombitsExplorerStyles.legendaryRarity}`
                  : `${zombitsExplorerStyles.modalRarity} ${zombitsExplorerStyles.theOnlyOneRarity}`
              }
            >
              {selectedZombit.rarity}
            </h4>
            <p className={zombitsExplorerStyles.bold}>
              {selectedZombit.features.length} features{" "}
              <span className={zombitsExplorerStyles.percentage}>
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
            <ul className={zombitsExplorerStyles.featureList}>
              {
                // Find rarities of its features
                selectedZombit.features.map(feature => {
                  const count = data.allFeaturesJson.edges
                    .flatMap(edge => edge.node.values)
                    .find(value => value.name === feature).count
                  return (
                    <li key={feature}>
                      <p className={zombitsExplorerStyles.featureListItem}>
                        {feature}{" "}
                        <span className={zombitsExplorerStyles.percentage}>
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
      <div className={zombitsExplorerStyles.filters}>
        <Select
          className={zombitsExplorerStyles.filter}
          mode="multiple"
          allowClear
          size="large"
          placeholder="Search Zombits"
          onChange={setIdFilters}
        >
          {idFilterOptions}
        </Select>
        <Select
          className={zombitsExplorerStyles.filter}
          mode="multiple"
          allowClear
          size="large"
          placeholder="Filter features"
          onChange={setFeatureFilters}
        >
          {featureFilterOptions}
        </Select>
        <Select
          className={zombitsExplorerStyles.filter}
          size="large"
          defaultValue="0"
          onChange={setFeatureCountFilter}
        >
          <Option key={0}>Any number of features</Option>
          {featureCountFilterOptions}
        </Select>
        <Select
          className={zombitsExplorerStyles.filter}
          size="large"
          defaultValue=""
          onChange={setRarityFilter}
        >
          <Option key="">Any rarity</Option>
          {raritiesFilterOptions}
        </Select>
      </div>
      {filteredItems.length > 0 && (
        <p className={zombitsExplorerStyles.light}>
          {filteredItems.length.toLocaleString("en")}{" "}
          {filteredItems.length === 1 ? "result" : "results"}
        </p>
      )}
      <InfiniteScroll
        className={zombitsExplorerStyles.scroll}
        dataLength={shownItems.length}
        next={incrementShownItems}
        hasMore={hasMoreItems}
      >
        {
          // Render Zombits list
          shownItems.map(edge => (
            <button
              className={zombitsExplorerStyles.listItem}
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
            <div className={zombitsExplorerStyles.notFound}>
              <StaticImage
                src="../images/not-found.png"
                alt="No Zombits found"
                width={240}
                className={zombitsExplorerStyles.notFound}
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

export default ZombitsExplorer
