import { useOutletContext } from "react-router";

interface IChartProps {
    coinId : string
}

function Chart() {
    const {coinId} = useOutletContext<IChartProps>(); 

    return <h1>chart</h1>
}

export default Chart