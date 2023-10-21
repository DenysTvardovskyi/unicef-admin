export const serializeParams = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter((key) => !!key[1].length)
    .map(([ key, value ]) => {
      if (key === "pagination") {
        return value.map(((i: object) => Object.entries(i)
          .map(((i) => `${i[0]}=${i[1]}`))
          .join("&"))).join("&");
      }
      if (key === "filters") {

        return `$filter=` + value.map((i: object) => Object.entries(i)
          .map((i) => {
            return `${i[0]} ${i[1].length > 1 ? `in (${i[1].map((v: any) => (`'${v}'`))})` : `eq '${i[1]}'`}`;
          })
          .join(" and ")).join("&");
      }

      if (key === "sorters") {
        return `$orderBy=` + value.map(((i: object) => Object.entries(i)
          .map(((i) => `${i[0]} ${i[1]}`))
          .join(", "))).join(", ");
      }
    }).join("&");
};