import { useMemo } from "react";
import { useHTTP } from "./useHTTP";
import { useAuthorization } from "./useAuthorization";
import { AxiosRequestHeaders } from "axios";
import { IUser } from "../models";
import { IGroup } from "../models/group";
import { ICustomer } from "../models/customer";
import { serializeParams } from "../utils/serializer";
import { IRegion } from "../models/region";
import { INewsletter } from "../models/newletter";

const API_URL: string = "https://sdy3dwxcmk.eu-central-1.awsapprunner.com/api";

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

interface IApiRegionGetConfig extends IApiConfig {
  params?: {
    page: number;
    pageSize: number;
  };
}

interface IApiCustomerGetConfig extends IApiConfig {
  params?: {
    page: number;
    pageSize: number;
  };
}

interface IApiGroupsGetConfig extends IApiConfig {
  params?: {
    page: number;
    pageSize: number;
  };
}

interface IApiNewsletterGetConfig extends IApiConfig {
  params?: {
    page: number;
    pageSize: number;
  };
}

interface IApiGroupsUsersGetConfig extends IApiConfig {
  id: string;
  params?: {
    page: number;
    pageSize: number;
  };
}

interface IApiGroupsOneConfig extends IApiConfig {
  id: string;
}

interface IApiNewsletterOneConfig extends IApiConfig {
  id: string;
}

interface IApiGroupsCustomersConfig extends IApiConfig {
  id: string;
  params?: {
    page: number;
    pageSize: number;
  };
}

interface IApiGroupsCreateConfig extends IApiConfig {
  name: string;
  description: string;
  minChildAge: number;
  maxChildAge: number;
  minChildCount: number;
  maxChildCount: number;
  customerTraffics: string[];
  recommendationDays: string[];
  recommendationFrequencies: string[];
  conversationStates: string[];
}

interface IApiNewsletterCreateConfig extends IApiConfig {
  name: string;
  type: "text" | "exercice" | "advice";
  content: string;
  frequency: "daily" | "weekly";
  groupId: number;
}

interface IApiGroupsDeleteConfig extends IApiConfig {
  id: string;
}

interface IApiGroupsDownloadConfig extends IApiConfig {
  id: string;
}

interface IApiNewsletterDeleteConfig extends IApiConfig {
  id: string;
}

interface IApiGroupsUpdateConfig extends IApiConfig {
  id: string;
  body: IApiGroupsCreateConfig;
}

interface IApiNewsletterUpdateConfig extends IApiConfig {
  id: string;
  body: INewsletter;
}

interface IApiUsersGetConfig extends IApiConfig {
  params?: {
    page: number;
    pageSize: number;
  };
}

interface IApiUsersCreateConfig extends IApiConfig {
  name: string;
  lastName: string;
  email: string;
}

interface IApiGUsersOneConfig extends IApiConfig {
  id: string;
}

interface IApiUsersDeleteConfig extends IApiConfig {
  id: string;
}

interface IApiUsersUpdateConfig extends IApiConfig {
  id: string;
  user: IUser;
}

interface IApiAuthorizationPasswordResetConfig extends IApiConfig {}

export interface IUseApi {
  authorization: {
    signIn: (config: IApiAuthorizationSignInConfig) => Promise<{ accessToken: string, user: IUser }>;
    signOut: (config: IApiAuthorizationSignOutConfig) => Promise<void>;
    password: {
      reset: (config: IApiAuthorizationPasswordResetConfig) => Promise<void>
    }
  };
  account: {
    get: (config: IApiAccountGetConfig) => Promise<IUser>;
  };
  users: {
    get: (config: IApiCustomerGetConfig) => Promise<{ items: ICustomer[], totalCount: number, page: number, pageSize: number }>;
    one: (config: IApiGUsersOneConfig) => Promise<{ items: ICustomer[], totalCount: number, page: number, pageSize: number }>;
  };
  staff: {
    get: (config: IApiUsersGetConfig) => Promise<IUser[]>;
    create: (config: IApiUsersCreateConfig) => Promise<IUser>;
    delete: (config: IApiUsersDeleteConfig) => Promise<void>;
    update: (config: IApiUsersUpdateConfig) => Promise<IUser>;
  };
  groups: {
    get: (config: IApiGroupsGetConfig) => Promise<IGroup[]>;
    one: (config: IApiGroupsOneConfig) => Promise<{ items: IGroup[], totalCount: number, page: number, pageSize: number }>;
    customers: (config: IApiGroupsCustomersConfig) => Promise<{ items: ICustomer[], totalCount: number, page: number, pageSize: number }>;
    create: (config: IApiGroupsCreateConfig) => Promise<IGroup>;
    delete: (config: IApiGroupsDeleteConfig) => Promise<void>;
    download: (config: IApiGroupsDownloadConfig) => Promise<void>;
    update: (config: IApiGroupsUpdateConfig) => Promise<IGroup>;
  };
  groupUsers: {
    get: (config: IApiGroupsUsersGetConfig) => Promise<{ items: ICustomer[], totalCount: number, page: number, pageSize: number }>;
  };
  regions: {
    get: (config: IApiRegionGetConfig) => Promise<{ items: IRegion[], totalCount: number, page: number, pageSize: number }>
  };
  newsletters: {
    get: (config: IApiNewsletterGetConfig) => Promise<{ items: INewsletter[], totalCount: number, page: number, pageSize: number }>;
    one: (config: IApiNewsletterOneConfig) => Promise<{ items: INewsletter[], totalCount: number, page: number, pageSize: number }>;
    create: (config: IApiNewsletterCreateConfig) => Promise<INewsletter>;
    delete: (config: IApiNewsletterDeleteConfig) => Promise<void>;
    update: (config: IApiNewsletterUpdateConfig) => Promise<INewsletter>;
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

          http.request<{ token: string, user: IUser }>({
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
      password: {
        reset: ({ loader }) => {
          return http.request<void>({
            method: "PUT",
            url: `${API_URL}/users/current/password/resetting`,
            headers,
            loader: !!loader ? loader : false,
          });

        },
      },
      signOut: ({ loader }) => {
        return http.request<void>({
          method: "POST",
          url: `${API_URL}/account/logout`,
          headers,
          loader: !!loader ? loader : false,
        });

      },
    },
    account: {
      get: ({}) => {
        return http.request<IUser>({
          method: "GET",
          url: `${API_URL}/users/current`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
    },
    users: {
      get: ({ params }) => {
        return http.request<{ items: ICustomer[], totalCount: number, page: number, pageSize: number }>({
          method: "GET",
          url: `${API_URL}/customers`,
          headers,
          params,
          paramsSerializer: {
            serialize: serializeParams,
          },
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      one: ({ id }) => {
        return http.request<{ items: ICustomer[], totalCount: number, page: number, pageSize: number }>({
          method: "GET",
          url: `${API_URL}/customers?$filter=id eq ${id}`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
    },
    staff: {
      get: ({ params }) => {
        return http.request<IUser[]>({
          method: "GET",
          url: `${API_URL}/users`,
          headers,
          params,
          paramsSerializer: {
            serialize: serializeParams,
          },
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      create: ({ name, lastName, email }) => {
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
      delete: ({ id }) => {
        return http.request<void>({
          method: "DELETE",
          url: `${API_URL}/users/${id}`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      update: ({ id, user }) => {
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
      get: ({ params }) => {
        return http.request<IGroup[]>({
          method: "GET",
          url: `${API_URL}/groups`,
          headers,
          params,
          paramsSerializer: {
            serialize: serializeParams,
          },
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      one: ({ id }) => {
        return http.request<{ items: IGroup[], totalCount: number, page: number, pageSize: number }>({
          method: "GET",
          url: `${API_URL}/groups?$filter=id eq ${id}`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      customers: ({ params, id }) => {
        return http.request<{ items: ICustomer[], totalCount: number, page: number, pageSize: number }>({
          method: "GET",
          url: `${API_URL}/groups/${id}/customers`,
          headers,
          params,
          paramsSerializer: {
            serialize: serializeParams,
          },
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      create: ({ loader, debug, ...body }) => {
        return http.request<IGroup>({
          method: "POST",
          url: `${API_URL}/groups`,
          headers,
          data: { ...body },
          loader: !!loader ? loader : false,
        });
      },
      delete: ({ id }) => {
        return http.request<void>({
          method: "DELETE",
          url: `${API_URL}/groups/${id}`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      download: ({ id }) => {
        return http.request<void>({
          method: "GET",
          url: `${API_URL}/groups/${id}/analytics/excel`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      update: ({ id, body }) => {
        return http.request<IGroup>({
          method: "PUT",
          url: `${API_URL}/groups/${id}`,
          headers,
          data: { ...body },
          // loader: !!loader ? loader : "Loading users...",
        });
      },
    },
    groupUsers: {
      get: ({ id, params }) => {
        return http.request<{ items: ICustomer[], totalCount: number, page: number, pageSize: number }>({
          method: "GET",
          url: `${API_URL}/groups/${id}/customers`,
          headers,
          params,
          paramsSerializer: {
            serialize: serializeParams,
          },
          // loader: !!loader ? loader : "Loading users...",
        });
      },
    },
    regions: {
      get: ({ params }) => {
        return http.request<{ items: IRegion[], totalCount: number, page: number, pageSize: number }>({
          method: "GET",
          url: `${API_URL}/regions`,
          headers,
          params,
          paramsSerializer: {
            serialize: serializeParams,
          },
          // loader: !!loader ? loader : "Loading users...",
        });
      },
    },
    newsletters: {
      get: ({ params }) => {
        return http.request<{ items: INewsletter[], totalCount: number, page: number, pageSize: number }>({
          method: "GET",
          url: `${API_URL}/groups`,
          headers,
          params,
          paramsSerializer: {
            serialize: serializeParams,
          },
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      one: ({ id }) => {
        return http.request<{ items: INewsletter[], totalCount: number, page: number, pageSize: number }>({
          method: "GET",
          url: `${API_URL}/groups?$filter=id eq ${id}`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      create: ({ loader, debug, ...body }) => {
        return http.request<INewsletter>({
          method: "POST",
          url: `${API_URL}/groups`,
          headers,
          data: { ...body },
          loader: !!loader ? loader : false,
        });
      },
      delete: ({ id }) => {
        return http.request<void>({
          method: "DELETE",
          url: `${API_URL}/groups/${id}`,
          headers,
          // loader: !!loader ? loader : "Loading users...",
        });
      },
      update: ({ id, body }) => {
        return http.request<INewsletter>({
          method: "PUT",
          url: `${API_URL}/groups/${id}`,
          headers,
          data: { ...body },
          // loader: !!loader ? loader : "Loading users...",
        });
      },
    },
  };
};
