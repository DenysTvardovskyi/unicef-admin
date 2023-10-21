import { Bar } from "@ant-design/plots";
import { useChartsData } from "../../hooks/useChartsData";
import { IPieChart } from "../../models/chart";
import { FC } from "react";
import {constants} from "../../styles/constants";

export const LineChart: FC<IPieChart> = (params: IPieChart) => {
  const chartsData = useChartsData(params);

  const config: any = {
    data: chartsData,
    xField: 'count',
    yField: 'name',
    seriesField: 'year',
    legend: {
      position: 'top-left',
    },
    color: () => constants.blue
  };
  return <Bar {...config} />;
};
