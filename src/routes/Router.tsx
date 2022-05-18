import { BrowserRouter,Routes,Route } from "react-router-dom";
import Chart from "./Chart";
import Coin from "./Coin";
import Coins from "./Coins";
import Price from "./Price";

function Router() {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path="/" element={<Coins />}></Route>
            <Route path="/:coinId" element={<Coin />}>
                <Route index element={<Chart />}></Route>
                <Route path="chart" element={<Chart />}></Route>
                <Route path="price" element={<Price />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default Router;
