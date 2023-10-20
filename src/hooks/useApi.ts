import { useMemo } from "react";
import { useHTTP } from "./useHTTP";
import { useAuthorization } from "./useAuthorization";
import { AxiosRequestHeaders } from "axios";
import { IUser } from "../models";
import { IGroup } from "../models/group";
import { ICustomer } from "../models/customer";

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

interface IApiGroupsGetConfig extends IApiConfig {}
interface IApiGroupsOneConfig extends IApiConfig {
  id: string;
}
interface IApiGroupsCustomersConfig extends IApiConfig {
  id: string;
}
interface IApiGroupsCreateConfig extends IApiConfig {
  name: string
  description: string
  minChildAge: number
  maxChildAge: number
  minChildCount: number
  maxChildCount: number
  customerTraffics: string[]
  recommendationDays: string[]
  recommendationFrequencies: string[]
  conversationStates: string[]
}
interface IApiGroupsDeleteConfig extends IApiConfig {
  id: string;
}
interface IApiGroupsUpdateConfig extends IApiConfig {
  id: string;
}

interface IApiUsersGetConfig extends IApiConfig {}

interface IApiUsersCreateConfig extends IApiConfig {
  name: string;
  lastName: string;
  email: string;
}

interface IApiUsersDeleteConfig extends IApiConfig {
  id: string;
}

interface IApiUsersUpdateConfig extends IApiConfig {
  id: string;
  user: IUser;
}

export interface IUseApi {
  authorization: {
    signIn: (config: IApiAuthorizationSignInConfig) => Promise<{ accessToken: string, user: IUser }>;
    signOut: (config: IApiAuthorizationSignOutConfig) => Promise<void>;
  };
  account: {
    get: (config: IApiAccountGetConfig) => Promise<IUser>;
  };
  users: {
    get: (config: IApiUsersGetConfig) => Promise<IUser[]>;
    create: (config: IApiUsersCreateConfig) => Promise<IUser>;
    delete: (config: IApiUsersDeleteConfig) => Promise<void>;
    update: (config: IApiUsersUpdateConfig) => Promise<IUser>;
  };
  groups: {
    get: (config: IApiGroupsGetConfig) => Promise<IGroup[]>;
    one: (config: IApiGroupsOneConfig) => Promise<IGroup[]>;
    customers: (config: IApiGroupsCustomersConfig) => Promise<ICustomer[]>;
    create: (config: IApiGroupsCreateConfig) => Promise<IGroup>;
    delete: (config: IApiGroupsDeleteConfig) => Promise<void>;
    update: (config: IApiGroupsUpdateConfig) => Promise<IGroup>;
  }
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
          // loader: !!loader ? loader : "Loading users...",
        });
      },
    },
    users: {
      get: ({ loader }) => {
        return http.request<IUser[]>({
          method: "GET",
          url: `${API_URL}/users`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      create: ({ name, lastName, email, loader }) => {
        return http.request<IUser>({
          method: "POST",
          url: `${API_URL}/users`,
          headers,
          data: {
            name,
            lastName,
            email,
          },
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      delete: ({ id, loader }) => {
        return http.request<void>({
          method: "DELETE",
          url: `${API_URL}/users/${id}`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      update: ({ id, user, loader }) => {
        return http.request<IUser>({
          method: "PUT",
          url: `${API_URL}/users/${id}`,
          headers,
          data: { ...user },
          // loader: !!loader ? loader : "Loading users...",
        });
      },
    },
    groups: {
      get: ({ loader }) => {
        return http.request<IGroup[]>({
          method: "GET",
          url: `${API_URL}/groups`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      one: ({ id,loader }) => {
        return http.request<IGroup[]>({
          method: "GET",
          url: `${API_URL}/groups?$filter=id eq ${id}`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      customers: ({ id, loader }) => {
        return http.request<ICustomer[]>({
          method: "GET",
          url: `${API_URL}/groups${id}/customers`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      create: ({ loader, debug, ...body }) => {
        return http.request<IGroup>({
          method: "POST",
          url: `${API_URL}/groups`,
          headers,
          data: {...body},
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      delete: ({ id, loader }) => {
        return http.request<void>({
          method: "DELETE",
          url: `${API_URL}/groups/${id}`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      update: ({ id, user, loader }) => {
        return http.request<IGroup>({
          method: "PUT",
          url: `${API_URL}/groups/${id}`,
          headers,
          data: { ...user },
          // loader: !!loader ? loader : "Loading users...",
        });
      },
    },
  };
};
