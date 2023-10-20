type TArgument = undefined | null | boolean | number | string;

export const classes: (...args: TArgument[]) => string = (...args: TArgument[]): string => {
  return args.filter((arg: TArgument) => typeof arg === "string" && !!arg).join(" ");
};
