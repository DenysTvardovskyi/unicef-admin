import { IStore } from "../store";
import { shallowEqual, useSelector } from "react-redux";

export const useStore = <T>(cb: (store: IStore) => T, se = shallowEqual): T => {
  return useSelector<IStore, T>(cb, se);
};
