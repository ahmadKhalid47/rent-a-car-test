import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useDrawingArea } from "@mui/x-charts/hooks";

const pData = [45, 140, 80, 170, 50, 180];
const xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const yLabels = ["$ 200k", "$ 150k", "$ 150k", "$ 100k", "$ 50k", "$ 0k"];

export default function RevenueChart() {
  const chartRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(500);

  React.useEffect(() => {
    function handleResize() {
      if (chartRef.current) {
        setWidth(chartRef.current.offsetWidth);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={chartRef} style={{ width: "100%" }} className="bg-pink-70">
      <LineChart
        className="custom-gradient-fill"
        width={width}
        height={350}
        colors={["#054b86"]}
        series={[{ data: pData, area: true }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ scaleType: "linear", data: yLabels }]}
        grid={{ vertical: true, horizontal: true }}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "top", horizontal: "left" },
            itemGap: 62,
          },
        }}
      ></LineChart>{" "}
    </div>
  );
}
