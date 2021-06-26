import styled from "@emotion/styled"

interface Props {
  newConfirmed: number
  newDeaths: number
  newRecovered: number
}

const Wrapper = styled.div``

const GlobalInfo: React.FunctionComponent<Props> = ({
  newConfirmed,
  newDeaths,
  newRecovered,
}) => {
  return (
    <div>
      <h1>전세계 코로나 현황</h1>
      <h3>신규 확진자: {new Intl.NumberFormat().format(newConfirmed)}</h3>
      <h3>신규 사망자: {new Intl.NumberFormat().format(newDeaths)}</h3>
      <h3>신규 회복자: {new Intl.NumberFormat().format(newRecovered)}</h3>
    </div>
  )
}

export default GlobalInfo
