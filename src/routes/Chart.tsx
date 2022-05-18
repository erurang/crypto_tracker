import { useOutletContext } from "react-router";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface IChartProps {
  coinId: string;
}

function Chart() {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => [
                new Date(price.time_open).getDate(), // 날짜
                price.open.toFixed(0), // 시작가
                price.high.toFixed(0), // 최고가
                price.low.toFixed(0), // 최저가
                price.close.toFixed(0), // 종가
              ]) as [],
            },
          ]}
          options={{
            chart: {
              background: "transparent",
              width: 500,
              height: 500,
              toolbar: {
                show: false,
              },
            },

            theme: {
              mode: "dark",
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#01FF00", // 상승 시 색상
                  downward: "#ED1C24", // 하락 시 색상
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
