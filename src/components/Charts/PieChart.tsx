import { Pie } from "@ant-design/plots";
import { useChartsData } from "../../hooks/useChartsData";
import { IPieChart } from "../../models/chart";
import { FC } from "react";

export const PieChart: FC<IPieChart> = (params: IPieChart) => {
  const data = useChartsData(params);

  const config: any = {
    appendPadding: 10,
    data,
    angleField: "count",
    colorField: "name",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};
