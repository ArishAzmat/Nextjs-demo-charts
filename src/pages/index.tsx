import { useEffect, useState } from "react";
import useSWR from "swr";
import DonutChart from "./DonutChart";
import Highcharts from "highcharts";
import BarChart from "./BarGraph";
import { Grid, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

interface StockObj {
  sector: string;
  price: Number;
}
function HomePage() {
  const [donutData, setDonutData] = useState([]);
  const [barData, setBarData] = useState({ categories: [], data: [] });
  const getPosts = async () => {
    const res = await fetch(
      "https://personal-website-d74afku9x-contrahacker.vercel.app/api/example-data"
    );
    const posts = await res.json();
    return posts;
  };

  const { data, error, isLoading } = useSWR("/api/user", getPosts);
  console.log(data, error, isLoading);
  useEffect(() => {
    if (data) {
      let { data: response } = data;
      const colors = Highcharts.getOptions().colors;
      let barDataTemp: any = { categories: [], data: [] };
      let donutDataTemp: any = [];
      const groupBySector = response?.reduce((group: any, item: any) => {
        const { sector } = item;
        group[sector] = group[sector] ?? [];
        group[sector].push(item);
        return group;
      }, {});

      groupBySector &&
        Object.keys(groupBySector).forEach((s, i) => {
          donutDataTemp.push({
            name: s,
            y: groupBySector[s].length,
            color: colors && colors[i],
          });
        });
      response?.length > 0 &&
        response.forEach((data: StockObj, i: Number) => {
          barDataTemp.categories.push(data?.sector);
          barDataTemp.data.push(data?.price);
        });
      setDonutData(donutDataTemp);
      setBarData(barDataTemp);
    }
  }, [data]);
  if (error)
    return (
      <Box>
        <Typography textAlign={"center"}>
          {data?.error?.message || "Something went wrong."}
        </Typography>
      </Box>
    );
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography textAlign={"center"}>Ethica Invest</Typography>
      <Grid container p={8}>
        <Grid item md={6}>
          {isLoading ? (
            <Skeleton variant="circular" width={"70%"} height={"100%"} />
          ) : (
            <DonutChart chartData={donutData} />
          )}
        </Grid>
        <Grid item md={6}>
          {isLoading ? (
            <Skeleton variant="rectangular" width={"100%"} height={"400px"} />
          ) : (
            <BarChart categories={barData.categories} data={barData.data} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
