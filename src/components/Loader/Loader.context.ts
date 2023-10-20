import React from "react";
import { ILoaderTask } from "./Loader";

export interface ILoaderContext {
  visible: boolean;
  create: (label?: string) => ILoaderTask & { start: () => void, stop: () => void };
  start: (task: ILoaderTask) => void;
  stop: (task: ILoaderTask) => void;
  reset: () => void;
}

export const LoaderContext = React.createContext<ILoaderContext>({
  visible: false,
  create: () => ({ key: "", start: () => {}, stop: () => {} }),
  start: () => {},
  stop: () => {},
  reset: () => {},
});
