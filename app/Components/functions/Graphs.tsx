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
        width={width}
        height={350}
        colors={["#2F4CDD"]}
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
        sx={{
          ".css-j6h5qe-MuiAreaElement-root": {
            fill: "url(#paint0_linear_45_2)",
          },
        }}
      >
        <Colorswitch />
      </LineChart>{" "}
    </div>
  );
}

const Colorswitch = () => {
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;

  return (
    <>
      <defs>
        <linearGradient
          id="paint0_linear_45_2"
          x1="300.25"
          y1="46.9999"
          x2="300.25"
          y2={`${svgHeight}px`}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0094DA" stopOpacity="0.8" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  );
};
