import React, { useState, useEffect } from "react"
import CountryList from "./components/CountryList"
import GlobalInfo from "./components/GlobalInfo"
import type { ResponseData, Country } from "./types"
import { Global, css } from "@emotion/react"
import BarChart from "./components/BarChart"

const App: React.FunctionComponent = () => {
  const [data, setData] = useState<ResponseData | undefined>(undefined)
  const [activeCountries, setActiveCountries] = useState<Country[]>([])

  const fetchData = async () => {
    const result = await fetch("https://api.covid19api.com/summary")
    const data: ResponseData = await result.json()

    setData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onCountryClick = (country: Country) => {
    const countryIndex = activeCountries.findIndex(
      activeCountry => activeCountry.ID === country.ID
    )

    if (countryIndex > -1) {
      //중복 제거 처리
      const newActiveCountries = [...activeCountries]
      newActiveCountries.splice(countryIndex, 1)
      setActiveCountries(newActiveCountries)
    } else {
      setActiveCountries([...activeCountries, country])
    }
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

      {data ? (
        <>
          <GlobalInfo
            newConfirmed={data?.Global.NewConfirmed}
            newDeaths={data?.Global.NewDeaths}
            newRecovered={data?.Global.NewRecovered}
          />

          {activeCountries.length ? (
            <BarChart countries={activeCountries} />
          ) : null}

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
