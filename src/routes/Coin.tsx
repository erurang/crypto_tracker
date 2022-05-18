import {
  Link,
  Outlet,
  useParams,
  useLocation,
  useMatch,
} from "react-router-dom";
import { useQuery } from "react-query";

import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IRouteState {
  state: {
    name: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as IRouteState;

  const { isLoading: infoLoading, data: infoData,error : infoError } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId as string)
  );
  const { isLoading: tickersLoading, data: tickersData,error :tickersError } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId as string)
  );

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  if(infoError || tickersError) {
    alert('서버에서 데이터를 가져오는데 실패했습니다.')
  }

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      <Link to={`/${coinId}/chart`} state={{ name: state?.name }}>
        Chart
      </Link>
      <Link to={`/${coinId}/price`} state={{ name: state?.name }}>
        Price
      </Link>
      <Outlet context={{ coinId, name: state?.name }} />
    </Container>
  );
}

export default Coin;
