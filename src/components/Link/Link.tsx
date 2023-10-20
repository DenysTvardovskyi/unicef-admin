import { FC } from "react";
import { LinkProps, NavLink as RouterLink } from "react-router-dom";
import { classes } from "../../utils";

interface IProps extends LinkProps {}

export const Link: FC<IProps> = (props: IProps): JSX.Element => {
  return (
    <RouterLink
      {...props}
      style={({ isActive }) => isActive ? { backgroundColor: "rgba(0,0,0, 0.1)" } : undefined}
      className={classes("text-decoration-none", props.className)}
      end
    >
      {props.children}
    </RouterLink>
  );
};
