import { useContext } from "react";
import { ILoaderContext, LoaderContext } from "../components";

type TUseLoader = () => ILoaderContext;

export const useLoader: TUseLoader = (): ILoaderContext => {
  const { visible, create, start, stop, reset } = useContext<ILoaderContext>(LoaderContext);

  return { visible, create, start, stop, reset };
};
