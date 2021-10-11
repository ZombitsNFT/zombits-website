import React from "react"
import ReactModal from "react-modal"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Select } from "antd"
import InfiniteScroll from "react-infinite-scroll-component"

import HumbitsImage from "./humbits-image"
import * as humbitsExplorerStyles from "./humbits-explorer.module.scss"

const { Option, OptGroup } = Select
const INCREMENT = 5

const HumbitsExplorer = () => {
  const data = useStaticQuery(graphql`
    query {
      allHumbitsJson {
        edges {
          node {
            id
            name
            givenName
            features
            image
            statisticalRarity
            rarity
          }
        }
      }
      allHumbitsFeaturesJson {
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
      allHumbitsFeatureCountsJson {
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
  // To get rarity names, sort Humbits in order of increasing rarity, divide 10,000 Humbits up into 6 groups of 1, 117, 317, 861, 2341, and 6363, and name them "The Only One", "Legendary", "Epic", "Rare", "Uncommon", and "Common" respectively.
  // (1, 9999*(e**0)/(e**0+e**1+e**2+e**3+e**4), 9999*(e**1)/(e**0+e**1+e**2+e**3+e**4), 9999*(e**2)/(e**0+e**1+e**2+e**3+e**4), 9999*(e**3)/(e**0+e**1+e**2+e**3+e**4), 9999*(e**4)/(e**0+e**1+e**2+e**3+e**4))

  const [filteredItems, setFilteredItems] = React.useState([])
  const [shownItems, setShownItems] = React.useState([])
  const [hasMoreItems, setHasMoreItems] = React.useState(true)

  const [idFilters, setIdFilters] = React.useState([])
  const [nameFilters, setNameFilters] = React.useState([])
  const [featureFilters, setFeatureFilters] = React.useState([])
  const [featureCountFilter, setFeatureCountFilter] = React.useState("0")
  const [rarityFilter, setRarityFilter] = React.useState("")

  const [selectedHumbit, setSelectedHumbit] = React.useState(undefined)

  // Filter Humbits
  React.useEffect(() => {
    const filterResult = data.allHumbitsJson.edges.filter(
      edge =>
        featureFilters.every(feature => edge.node.features.includes(feature)) &&
        (idFilters.includes(edge.node.id) || !idFilters.length) &&
        (nameFilters.includes(edge.node.givenName) || !nameFilters.length) &&
        (parseInt(featureCountFilter) === edge.node.features.length ||
          !parseInt(featureCountFilter)) &&
        (rarityFilter === edge.node.rarity || !rarityFilter)
    )

    setFilteredItems(filterResult)
    setShownItems(filterResult.slice(0, shownItems.length + INCREMENT))
  }, [
    data.allHumbitsJson.edges,
    featureFilters,
    featureCountFilter,
    idFilters,
    rarityFilter,
    nameFilters,
  ])

  // Pass more data to infinite scroll
  const incrementShownItems = () => {
    if (shownItems.length > filteredItems.length) {
      setHasMoreItems(false)
    }
    setShownItems(filteredItems.slice(0, shownItems.length + INCREMENT))
  }

  // Generate dropdown options for Humbit IDs
  const idFilterOptions = data.allHumbitsJson.edges.map(edge => (
    <Option key={edge.node.id}>Humbit #{edge.node.id}</Option>
  ))

  // Generate dropdown options for Humbit IDs
  const nameFilterOptions = data.allHumbitsJson.edges
    .map(edge => (
      <Option key={edge.node.givenName}>{edge.node.givenName}</Option>
    ))
    .sort((a, b) => (a.key > b.key ? 1 : -1))

  // Generate grouped dropdown options for features
  const featureFilterOptions = data.allHumbitsFeaturesJson.edges.map(edge => (
    <OptGroup
      key={edge.node.name}
      label={`${edge.node.name} (${edge.node.values.length.toLocaleString(
        "en"
      )})`}
    >
      {edge.node.values.map(value => (
        <Option key={value.name}>
          {value.name}{" "}
          <span className={humbitsExplorerStyles.percentage}>
            ({value.count.toLocaleString("en")})
          </span>
        </Option>
      ))}
    </OptGroup>
  ))

  // Generate dropdown options for feature count
  const featureCountFilterOptions = data.allHumbitsFeatureCountsJson.edges.map(
    edge => (
      <Option key={edge.node.value}>
        {edge.node.name}{" "}
        <span className={humbitsExplorerStyles.percentage}>
          ({edge.node.count.toLocaleString("en")})
        </span>
      </Option>
    )
  )

  // Generate dropdown options for rarities
  const raritiesFilterOptions = data.allRaritiesJson.edges.map(edge => (
    <Option key={edge.node.name}>
      {edge.node.name}{" "}
      <span className={humbitsExplorerStyles.percentage}>
        ({edge.node.count.toLocaleString("en")})
      </span>
    </Option>
  ))

  const handleCloseModal = () => {
    setSelectedHumbit(undefined)
  }

  return (
    <div className={humbitsExplorerStyles.explorer}>
      <ReactModal
        isOpen={selectedHumbit !== undefined}
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
        htmlOpenClassName={humbitsExplorerStyles.modalOpen}
        contentLabel="Humbit Information"
      >
        {selectedHumbit && (
          <div className={humbitsExplorerStyles.modalContent}>
            <button
              className={humbitsExplorerStyles.modalCloseButton}
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <HumbitsImage humbitId={selectedHumbit.id} size={280} />
            <h2 className={humbitsExplorerStyles.modalHumbitName}>
              {selectedHumbit.name}
            </h2>
            <h3 className={humbitsExplorerStyles.modalHumbitGivenName}>
              {selectedHumbit.givenName}
            </h3>
            <h4
              className={
                // Conditionally set rarity label styles
                selectedHumbit.rarity === "Common"
                  ? `${humbitsExplorerStyles.modalRarity} ${humbitsExplorerStyles.commonRarity}`
                  : selectedHumbit.rarity === "Uncommon"
                  ? `${humbitsExplorerStyles.modalRarity} ${humbitsExplorerStyles.uncommonRarity}`
                  : selectedHumbit.rarity === "Rare"
                  ? `${humbitsExplorerStyles.modalRarity} ${humbitsExplorerStyles.rareRarity}`
                  : selectedHumbit.rarity === "Epic"
                  ? `${humbitsExplorerStyles.modalRarity} ${humbitsExplorerStyles.epicRarity}`
                  : selectedHumbit.rarity === "Legendary"
                  ? `${humbitsExplorerStyles.modalRarity} ${humbitsExplorerStyles.legendaryRarity}`
                  : `${humbitsExplorerStyles.modalRarity} ${humbitsExplorerStyles.theOnlyOneRarity}`
              }
            >
              {selectedHumbit.rarity}
            </h4>
            <p className={humbitsExplorerStyles.bold}>
              {selectedHumbit.features.length} features{" "}
              <span className={humbitsExplorerStyles.percentage}>
                {
                  // Find rarity of its feature count
                  (100 *
                    data.allHumbitsFeatureCountsJson.edges.find(
                      edge => edge.node.value === selectedHumbit.features.length
                    ).node.count) /
                    10_000
                }
                %
              </span>
            </p>
            <ul className={humbitsExplorerStyles.featureList}>
              {
                // Find rarities of its features
                selectedHumbit.features.map(feature => {
                  const count = data.allHumbitsFeaturesJson.edges
                    .flatMap(edge => edge.node.values)
                    .find(value => value.name === feature).count
                  return (
                    <li key={feature}>
                      <p className={humbitsExplorerStyles.featureListItem}>
                        {feature}{" "}
                        <span className={humbitsExplorerStyles.percentage}>
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
      <div className={humbitsExplorerStyles.filters}>
        <Select
          className={humbitsExplorerStyles.filter}
          mode="multiple"
          allowClear
          size="large"
          placeholder="Search Humbits"
          onChange={setIdFilters}
        >
          {idFilterOptions}
        </Select>
        <Select
          className={humbitsExplorerStyles.filter}
          mode="multiple"
          allowClear
          size="large"
          placeholder="Search names"
          onChange={setNameFilters}
        >
          {nameFilterOptions}
        </Select>
        <Select
          className={humbitsExplorerStyles.filter}
          mode="multiple"
          allowClear
          size="large"
          placeholder="Filter features"
          onChange={setFeatureFilters}
        >
          {featureFilterOptions}
        </Select>
        <Select
          className={humbitsExplorerStyles.filter}
          size="large"
          defaultValue="0"
          onChange={setFeatureCountFilter}
        >
          <Option key={0}>Any number of features</Option>
          {featureCountFilterOptions}
        </Select>
        <Select
          className={humbitsExplorerStyles.filter}
          size="large"
          defaultValue=""
          onChange={setRarityFilter}
        >
          <Option key="">Any rarity</Option>
          {raritiesFilterOptions}
        </Select>
      </div>
      {filteredItems.length > 0 && (
        <p className={humbitsExplorerStyles.light}>
          {filteredItems.length.toLocaleString("en")}{" "}
          {filteredItems.length === 1 ? "result" : "results"}
        </p>
      )}
      <InfiniteScroll
        className={humbitsExplorerStyles.scroll}
        dataLength={shownItems.length}
        next={incrementShownItems}
        hasMore={hasMoreItems}
      >
        {
          // Render Humbits list
          shownItems.map(edge => (
            <button
              className={humbitsExplorerStyles.listItem}
              key={edge.node.id}
              onClick={() => {
                setSelectedHumbit(edge.node)
              }}
            >
              <HumbitsImage humbitId={edge.node.id} size={240} />
              <h3>#{edge.node.id}</h3>
            </button>
          ))
        }
        {
          // No Humbits found
          filteredItems.length === 0 && (
            <div className={humbitsExplorerStyles.notFound}>
              <StaticImage
                src="../images/not-found.png"
                alt="No Humbits found"
                width={240}
                className={humbitsExplorerStyles.notFound}
                placeholder="none"
                formats={["png"]}
                quality={100}
              />
              <h3>No Humbits found</h3>
            </div>
          )
        }
      </InfiniteScroll>
    </div>
  )
}

export default HumbitsExplorer
