import React, { useState } from "react";
import { LoaderContext } from "./Loader.context";
import crypto from "crypto-js";
import { Player } from "@lottiefiles/react-lottie-player";
import animation from "./Loader.animation.json";
import { classes } from "../../utils";
import styles from "./Loader.module.scss";

export interface IProps {
  children?: React.ReactNode | React.ReactNode[];
  debug?: boolean;
}

export interface ILoaderTask {
  key: string;
  label?: string;
}

export interface ILoaderTaskObject extends ILoaderTask {
  start: () => void;
  stop: () => void;
}

export type TLoaderPull = Array<{ isActive: boolean, startedAt: number } & ILoaderTask>;

export const Loader: React.FC<IProps> = ({ children }: IProps): JSX.Element => {
  const [ pull, setPull ] = useState<TLoaderPull>([]);

  const generateUniqueKey: () => string = (): string => {
    const key: string = crypto.lib.WordArray.random(16).toString();
    const isFound: boolean = !!pull.find((task) => task.key === key);

    if (isFound) {
      return generateUniqueKey();
    }

    return key;
  };

  const create: (label?: string) => ILoaderTaskObject = (label): ILoaderTaskObject => {
    const key: string = generateUniqueKey();

    setPull((prevState) => [ ...prevState, { key, label, isActive: false, startedAt: 0 } ]);

    return { key, label, start: () => start({ key, label }), stop: () => stop({ key, label }) };
  };

  const start: (task: ILoaderTask) => void = (task) => {
    setPull((prevState) => {
      const isFound: boolean = !!prevState.find((item) => item.key === task.key);

      if (isFound) {
        return [
          ...prevState.filter((item) => item.key !== task.key),
          { ...task, isActive: true, startedAt: (new Date()).getTime() },
        ];
      }

      return prevState;
    });
  };

  const stop: (task: ILoaderTask) => void = (task): void => {
    setPull((prevState) => {
      const _task = prevState.find((item) => item.key === task.key);

      if (!!_task) {
        const now = (new Date()).getTime();
        const duration = now - _task.startedAt;

        if (duration >= 1000) {
          return prevState.filter((item) => item.key !== task.key);
        }

        const timeout = setTimeout(() => {
          stop(task);
          clearTimeout(timeout);
        }, 1000 - duration);

        return prevState;
      }

      return prevState;
    });
  };

  const reset: () => void = (): void => {
    setPull([]);
  };

  const visible: boolean = !!pull.filter(({ isActive }) => isActive).length;

  return (
    <LoaderContext.Provider value={{ visible, create, start, stop, reset }}>
      <div className={styles.container}>
        {children}
        <div className={classes(styles.wrapper, visible && styles.visible)}>
          {visible && !!pull.filter(({ isActive }) => isActive).length && (
            <Player src={animation} style={{ width: 100 }} autoplay loop />
          )}
          <span className={styles.message}>
            {visible && pull.filter(({ isActive }) => isActive)[0]?.label}
          </span>
        </div>
      </div>
    </LoaderContext.Provider>
  );
};
