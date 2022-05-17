import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import {useQuery} from "react-query"
import { fetchCoins } from "../api";


const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
    font-size: 48px;
    color : ${props => props.theme.accentColor};
`

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    const {isLoading, data} = useQuery<ICoin[]>("allCoins",fetchCoins)
    console.log(isLoading,data)

    // const [coins, setCoins] = useState<ICoin[]>([])

    // useEffect(() => {
    //     (async() => {
    //         const res = await fetch("https://api.coinpaprika.com/v1/coins")
    //         const json = await res.json()
    //         setCoins(json.slice(0,100))
    //     })()
    // },[])

    return (
        <Container>
          <Header>
            <Title>코인</Title>
          </Header>
          <CoinsList>
            {data?.slice(0,100).map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`}
                    state= {{name : coin.name}}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                    {coin.name} &rarr;</Link>
              </Coin>
            ))}
          </CoinsList>
        </Container>
      );
}

export default Coins