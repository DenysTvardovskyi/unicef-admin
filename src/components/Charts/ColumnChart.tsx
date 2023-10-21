import { Column } from "@ant-design/plots";
import { useChartsData } from "../../hooks/useChartsData";
import { IPieChart } from "../../models/chart";
import { FC } from "react";

export const ColumnChart: FC<IPieChart> = (params: IPieChart) => {
  const chartsData = useChartsData(params);

  const config: any = {
    data: chartsData,
    xField: 'name',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
  };
  return <Column {...config} />;
};
