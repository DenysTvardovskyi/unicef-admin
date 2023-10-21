import { FC } from "react";
import { useAuthorization } from "../hooks";
import { AccessDenied } from "../pages";

type TWithCheckRole =
  <T>(Component: FC<JSX.IntrinsicAttributes & T>, role: "Admin" | "SuperAdmin" ) => FC<JSX.IntrinsicAttributes & T>;

export const withCheckRole: TWithCheckRole = (Page, role) => {
  return (props) => {
    const { user } = useAuthorization();

    if (user?.role !== role) {
      return <AccessDenied/>;
    }

    return <Page {...props} />;
  };
};