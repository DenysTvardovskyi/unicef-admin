import { useMemo } from "react";
import { IPieChart } from "../models/chart";

export const useChartsData = (params: IPieChart) => {
  return useMemo(() => {
    const regionCounts: any = {};

    params.users?.forEach((obj) => {
      const regionName = obj.region.name;

      if (regionCounts[regionName]) {
        regionCounts[regionName]++;
      } else {
        regionCounts[regionName] = 1;
      }
    });

    return Object.keys(regionCounts).map((regionName) => ({
      name: regionName,
      count: regionCounts[regionName],
    }));
  }, [ params.users ]);
};
