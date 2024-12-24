import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss";

const data = [
  { name: "Áo khoác", value: 200, color: "#0088FE" },
  { name: "Áo nỉ", value: 300, color: "#00C49F" },
  { name: "Quần jeans ", value: 250, color: "#FFBB28" },
  { name: "Áo thun ", value: 200, color: "#FF8042" },
  { name: "Quần nỉ  ", value: 200, color: "#66CCFF" },
  { name: "Khác  ", value: 200, color: "#FF8042" },
];

const PieChartBox = () => {
  return (
    <div className="pieChartBox">
      <h2 >Danh mục mua nhiều</h2>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
