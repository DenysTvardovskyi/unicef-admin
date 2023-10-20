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

interface IApiAuthorizationSignUpConfig extends IApiConfig {
  email: string;
  fullname: string;
  password: string;
}

interface IApiAuthorizationSignInConfig extends IApiConfig {
  username: string;
  password: string;
}

interface IApiAuthorizationSignOutConfig extends IApiConfig {}

interface IApiAccountGetConfig extends IApiConfig {}

export interface IUseApi {
  authorization: {
    signUp: (config: IApiAuthorizationSignUpConfig) => Promise<void>;
    signIn: (config: IApiAuthorizationSignInConfig) => Promise<{ accessToken: string, tokenType: string, user: IUser }>;
    signOut: (config: IApiAuthorizationSignOutConfig) => Promise<void>;
  };
  account: {
    get: (config: IApiAccountGetConfig) => Promise<IUser>;
  };
}

type TUseApi = () => IUseApi;

export const useApi: TUseApi = (): IUseApi => {
  const http = useHTTP();
  const { isAuthorized, accessToken, tokenType } = useAuthorization();

  const headers: AxiosRequestHeaders = useMemo<AxiosRequestHeaders>(() => {
    const _headers: any = {};

    if (isAuthorized) {
      _headers["Authorization"] = `${tokenType} ${accessToken}`;
    }

    _headers["Access-Control-Allow-Origin"] = "*";
    _headers["Content-Type"] = "application/json";

    return _headers;
  }, [ isAuthorized, accessToken, tokenType ]);

  return {
    authorization: {
      signUp: ({ email, fullname, debug, password, loader }) => {
        const body = {
          email: email,
          fullname: fullname,
          password: password,
        };
        return http.request<void>({
          method: "POST",
          url: `${API_URL}/account/register`,
          headers,
          data: body,
          debug,
          loader: !!loader ? loader : "Processing sign up...",
        });
      },
      signIn: ({ loader, debug, password, username }) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();

          formData.append("username", username);
          formData.append("password", password);

          http.request<{ access_token: string, token_type: string, account: IUser }>({
            method: "POST",
            url: `${API_URL}/account/login`,
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
            loader: !!loader ? loader : "Processing sign in...",
            debug,
          })
            .then((data) => {
              const { access_token, token_type, account } = data;

              return resolve({
                accessToken: access_token,
                tokenType: token_type,
                user: account,
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
          url: `${API_URL}/account`,
          headers,
          loader: !!loader ? loader : "Loading users...",
        });
      },
    },
  };
};
