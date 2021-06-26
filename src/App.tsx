import React, { useState, useEffect } from "react"
import CountryList from "./components/CountryList"
import GlobalInfo from "./components/GlobalInfo"
import type { ResponseData, Country } from "./types"
import { Global, css } from "@emotion/react"

const App: React.FunctionComponent = () => {
  const [data, setData] = useState<ResponseData | undefined>(undefined)
  const [activeCountries, setActiveCountries] = useState<Country[]>([])

  const fetchData = async () => {
    const result = await fetch("https://api.covid19api.com/summary")
    const data: ResponseData = await result.json()

    setData(data)
    console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onCountryClick = (country: Country) => {
    setActiveCountries([...activeCountries, country])
  }

  return (
    <div>
      <Global
        styles={css`
          body {
            background-color: #262626;
            color: #fdfdfd;
          }
        `}
      />

      {activeCountries.map(aCountry => (
        <span>{aCountry.Country}</span>
      ))}

      {data ? (
        <>
          <GlobalInfo
            newConfirmed={data?.Global.NewConfirmed}
            newDeaths={data?.Global.NewDeaths}
            newRecovered={data?.Global.NewRecovered}
          />

          <CountryList
            countries={data.Countries}
            onItemClick={onCountryClick}
          />
        </>
      ) : (
        <h1>Loading..</h1>
      )}
    </div>
  )
}

export default App
