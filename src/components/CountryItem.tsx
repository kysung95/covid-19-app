import { useState } from "react"
import styled from "@emotion/styled"
import { Country } from "../types"

interface Props {
  country: Country
  onItemClick: (country: Country) => void
}

interface ListContentProps {
  isActive: Boolean
}

const ListItem = styled.li`
  list-style-type: none;
  flex: 0 0 50%;
  text-align: center;
  cursor: pointer;

  @media (min-width: 420px) {
    flex: 0 0 33.33%;
  }
`

const ListContent = styled.div<ListContentProps>`
  background-color: ${props => (props.isActive ? "#EEADC6" : "#ea2371")};
  margin: 5px;
  padding: 10px 0;
  border-radius: 5px;
`

const CountryItem: React.FunctionComponent<Props> = ({
  country,
  onItemClick,
}) => {
  const [isActive, setIsActive] = useState<Boolean>(false)

  const handleOnClick = (country: Country) => {
    onItemClick(country)
    setIsActive(prev => !prev)
  }

  return (
    <ListItem key={country.ID} onClick={() => handleOnClick(country)}>
      <ListContent isActive={isActive}>
        <h4>{country.Country}</h4>
        <div>신규 확진자: {country.NewConfirmed}</div>
        <div>신규 사망자: {country.NewDeaths}</div>
        <div>신규 완치자: {country.NewRecovered}</div>
      </ListContent>
    </ListItem>
  )
}

export default CountryItem
