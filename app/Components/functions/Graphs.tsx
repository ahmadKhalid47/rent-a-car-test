import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function RevenueChart() {
  const chartRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(500); // initial width

  React.useEffect(() => {
    function handleResize() {
      if (chartRef.current) {
        setWidth(chartRef.current.offsetWidth);
      }
    }

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={chartRef} style={{ width: "100%" }}>
      <LineChart
        xAxis={[
          {
            data: [1, 2, 3, 5, 8, 10],
          },
        ]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            area: true,
            color: "#0094da",
          },
        ]}
        grid={{ vertical: true, horizontal: true }}
        width={width}
        height={300}
      />
    </div>
  );
}
