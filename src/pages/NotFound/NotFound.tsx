import { FC } from "react";
import { Landing as LandingLayout } from "../../layouts";

interface IProps {}

export const NotFound: FC<IProps> = (): JSX.Element => {
  return (
    <LandingLayout>
      404, Not found!
    </LandingLayout>
  );
};
