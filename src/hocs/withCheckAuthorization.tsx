import { FC } from "react";
import { SignIn } from "../pages";
import { useAuthorization } from "../hooks";

type TWithCheckAuthorization = <T>(Component: FC<JSX.IntrinsicAttributes & T>) => FC<JSX.IntrinsicAttributes & T>;

export const withCheckAuthorization: TWithCheckAuthorization = (Page) => {
  return (props) => {
    const { isAuthorized } = useAuthorization();

    if (!isAuthorized) {
      return <SignIn />;
    }

    return <Page {...props} />;
  };
};
