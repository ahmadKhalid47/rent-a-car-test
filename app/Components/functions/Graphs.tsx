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
        // colors={["#054b86"]}
        series={[{ data: pData, area: true }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ scaleType: "linear", data: yLabels }]}
        grid={{ vertical: true, horizontal: true }}
        sx={{
          fill: "url(#myGradient) !important",
        }}
      >
        <defs>
          <linearGradient id="myGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0 }} />
            <stop
              offset="100%"
              style={{ stopColor: "#0094da", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </LineChart>
    </div>
  );
}
