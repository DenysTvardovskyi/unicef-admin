import React, { FC } from "react";
import { classes } from "../../utils";
import styles from "./Landing.module.scss";

interface IProps {
  main?: {
    className?: string;
  };
  children?: React.ReactNode | React.ReactNode[];
}

export const Landing: FC<IProps> = ({ main, children }: IProps): JSX.Element => {
  return (
    <div className={classes("d-flex flex-column align-items-stretch", styles.container)}>
      <main className={classes("d-flex flex-column", styles.main, main?.className)}>
        {children}
      </main>
    </div>
  );
};
