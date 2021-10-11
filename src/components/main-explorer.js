import React from "react"
import HumbitsExplorer from "./humbits-explorer"
import { Select } from "antd"

import * as mainExplorerStyles from "./main-explorer.module.scss"
import ZombitsExplorer from "./zombits-explorer"

const { Option } = Select

const MainExplorer = () => {
  const [shownProject, setShownProject] = React.useState("")

  return (
    <div className={mainExplorerStyles.explorer}>
      <h2 id="explore" className={mainExplorerStyles.h2}>
        Explore
      </h2>
      <p>
        Only 10,000 Humbits and 10,000 Zombits will ever exist backed by a{" "}
        <a
          href="https://cardanoscan.io/tokenPolicy/ad6290066292cfeef7376cd575e5d8367833ab3d8b2ac53d26ae4ecc"
          target="_blank"
          rel="noreferrer"
        >
          time-locked policy
        </a>
        . No two Humbits or Zombits are alike, and each collectible has a unique
        set of features, making some more valuable than others.
      </p>
      <p>Explore all collections below!</p>
      <div className={mainExplorerStyles.filters}>
        <Select
          className={mainExplorerStyles.filter}
          size="large"
          defaultValue="Humbits"
          onChange={setShownProject}
        >
          <Option key="Humbits">Humbits Collection</Option>
          <Option key="Zombits">Zombits Collection</Option>
        </Select>
      </div>
      {shownProject === "Zombits" ? <ZombitsExplorer /> : <HumbitsExplorer />}
    </div>
  )
}

export default MainExplorer
