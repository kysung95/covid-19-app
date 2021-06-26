import React, { useState, useEffect } from "react"
import CountryList from "./components/CountryList"
import GlobalInfo from "./components/GlobalInfo"
import type { ResponseData } from "./types"

const App: React.FunctionComponent = () => {
  const [data, setData] = useState<ResponseData | undefined>(undefined)

  const fetchData = async () => {
    const result = await fetch("https://api.covid19api.com/summary")
    const data: ResponseData = await result.json()

    setData(data)
    console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {data ? (
        <>
          <GlobalInfo
            newConfirmed={data?.Global.NewConfirmed}
            newDeaths={data?.Global.NewDeaths}
            newRecovered={data?.Global.NewRecovered}
          />

          <CountryList countries={data.Countries} />
        </>
      ) : (
        <h1>Loading..</h1>
      )}
    </div>
  )
}

export default App
