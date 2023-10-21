import { useMemo } from "react";
import { IPieChart } from "../models/chart";

function getObjectProperty(obj: any, keyPath: any) {
  const keys = keyPath.split('.');
  let result = obj;

  for (const key of keys) {
    if (result && result.hasOwnProperty(key)) {
      result = result[key];
    } else {
      return undefined;
    }
  }

  return result;
}

export const useChartsData = ({data, keyword}: IPieChart) => {
  return useMemo(() => {
    const regionCounts: any = {};

    data?.forEach((obj) => {
      const regionName = getObjectProperty(obj, keyword);

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
  }, [ data, keyword ]);
};
