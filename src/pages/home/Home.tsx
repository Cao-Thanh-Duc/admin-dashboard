import BigChart from "../../components/bigChart/bigChart";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import {

  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      {/* <div className="box box1">
        <TopBox />
      </div> */}
      <div className="box box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box6">
        {/* <ChartBox {...chartBoxRevenue} /> */}
      </div>
      <div className="box box6">
        {/* <ChartBox {...chartBoxRevenue} /> */}
      </div>
      <div className="box box6">
        {/* <ChartBox {...chartBoxRevenue} /> */}
      </div>
      <div className="box box6">
        {/* <ChartBox {...chartBoxRevenue} /> */}
      </div>
      <div className="box box7">
        <BigChart />
      </div>
      
    </div>
  );
};

export default Home;
