import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore, Store } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/es/storage";
import thunk from "redux-thunk";
import { authorizationReducer, IState as IAuthorizationReducerState } from "./authorization/authorization.reducer";

const middlewares: any[] = [ thunk ];

export const configureStore: () => Store<IStore, any> = (): Store<IStore, any> => {
  const rootReducer: any = combineReducers<any>({
    authorization: authorizationReducer,
  });

  const persistConfig: any = {
    key: "root",
    blacklist: [],
    stateReconciler: autoMergeLevel2,
    timeout: 0,
    storage,
  };

  const persistedReducer: any = persistReducer(persistConfig, rootReducer);
  const enhancer: any = compose<any>(composeWithDevTools(applyMiddleware(...middlewares)));

  return createStore(persistedReducer, undefined, enhancer);
};

export interface IStore {
  authorization: IAuthorizationReducerState;
}

export const store: Store<IStore, any> = configureStore();
export const persistor = persistStore(store);
