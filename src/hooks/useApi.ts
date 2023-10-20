import { useMemo } from "react";
import { useHTTP } from "./useHTTP";
import { useAuthorization } from "./useAuthorization";
import { AxiosRequestHeaders } from "axios";
import { IUser } from "../models";

const API_URL: string = import.meta.env.VITE_BASE_URL!;

interface IApiConfig {
  loader?: boolean | string;
  debug?: boolean;
}

interface IApiAuthorizationSignInConfig extends IApiConfig {
  email: string;
  password: string;
}

interface IApiAuthorizationSignOutConfig extends IApiConfig {}

interface IApiAccountGetConfig extends IApiConfig {}

export interface IUseApi {
  authorization: {
    signIn: (config: IApiAuthorizationSignInConfig) => Promise<{ accessToken: string, user: IUser }>;
    signOut: (config: IApiAuthorizationSignOutConfig) => Promise<void>;
  };
  account: {
    get: (config: IApiAccountGetConfig) => Promise<IUser>;
  };
}

type TUseApi = () => IUseApi;

export const useApi: TUseApi = (): IUseApi => {
  const http = useHTTP();
  const { isAuthorized, accessToken } = useAuthorization();

  const headers: AxiosRequestHeaders = useMemo<AxiosRequestHeaders>(() => {
    const _headers: any = {};

    if (isAuthorized) {
      _headers["Authorization"] = `Bearer ${accessToken}`;
    }

    _headers["Access-Control-Allow-Origin"] = "*";
    _headers["Content-Type"] = "application/json";

    return _headers;
  }, [ isAuthorized, accessToken ]);

  return {
    authorization: {
      signIn: ({ loader, debug, password, email }) => {
        return new Promise((resolve, reject) => {

          http.request<{ rawToken: string, user: IUser }>({
            method: "POST",
            url: `${API_URL}/authentication`,
            headers,
            data: {
              password,
              email,
            },
            loader: !!loader ? loader : "Processing sign in...",
            debug,
          })
            .then((data) => {
              const { token, user } = data;

              return resolve({
                accessToken: token,
                user,
              });
            })
            .catch(reject);
        });
      },
      signOut: ({ loader }) => {
        return http.request<void>({
          method: "POST",
          url: `${API_URL}/account/logout`,
          headers,
          loader: !!loader ? loader : "Processing sign out...",
        });

      },
    },
    account: {
      get: ({ loader }) => {
        return http.request<IUser>({
          method: "GET",
          url: `${API_URL}/users/current`,
          headers,
          loader: !!loader ? loader : "Loading users...",
        });
      },
    },
  };
};
