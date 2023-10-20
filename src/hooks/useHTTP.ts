import axios, { AxiosError, AxiosRequestConfig, AxiosResponseHeaders } from "axios";
import { useLoader, useNotification } from "./index";
import { ILoaderTask } from "../components/Loader/Loader";

interface IRequestConfig extends AxiosRequestConfig {
  loader?: boolean | string;
  debug?: boolean;
}

export type ResponseHeaders =
  AxiosResponseHeaders
  | Partial<Record<string, string> & { "set-cookie"?: string[] | undefined; }>

type TRequest = <T>(config: IRequestConfig) => Promise<T>;

interface IUseHTTP {
  request: TRequest;
}

type TUseHTTP = () => IUseHTTP;

const log: (config: IRequestConfig, result: any) => void = (config: IRequestConfig, result: any): void => {
  const colors: { success: string, error: string } = {
    success: "green",
    error: "red",
  };

  let status: "success" | "error";

  if (result instanceof AxiosError) {
    status = "error";
  } else {
    status = "success";
  }

  const response: any = result instanceof AxiosError
    ? JSON.stringify(result.response, undefined, 2)
    : JSON.stringify(result.data, undefined, 2);

  // @ts-ignore
  const headers: string = Object.keys(config.headers).map((key) => `${key}: ${config.headers[key]}`).join("  \n");

  let body: string = "";

  if (config.data instanceof FormData) {
    config.data.forEach((b, a) => {
      body += `\n      ${a}: ${b}`;
    });
  } else {
    body = JSON.stringify(config.data, undefined, 2);
  }

  const output = `
  - status: ${status}
  - method: ${config.method}
  - url: ${config.url}
  - headers:
      ${headers}
  - body: ${body}
  - response: \n${response}
  `;

  console.log(`> request %c[status:${status}]`, `color: ${colors[status]}`, output);
};

export const useHTTP: TUseHTTP = (): IUseHTTP => {
  const loader = useLoader();
  const notification = useNotification();

  const request: TRequest = <T>(config: IRequestConfig): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const { loader: _loader, debug: _debug, ...axiosConfig } = config;

      let task: ILoaderTask;

      if (!!_loader) {
        let label: string = typeof _loader === "string" ? _loader : "";

        task = loader.create(label);

        loader.start(task);
      }

      axios.request<T>(axiosConfig)
        .then((response) => {
          if (!!_loader) {
            loader.stop(task);
          }

          if (!!_debug) {
            log(axiosConfig, response);
          }

          resolve(response.data);
        })
        .catch((error) => {
          if (!!_loader) {
            loader.stop(task);
          }

          if (!!_debug) {
            log(axiosConfig, error);
          }

          notification.error(error?.response?.data?.detail);

          reject(error);
        });
    });
  };

  return { request };
};
