import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import {Home, SignIn, NotFound} from "../../pages";
import { withCheckAuthorization } from "../../hocs";

interface IProps {}

export const Router: FC<IProps> = (): JSX.Element => {
  const PageHomeWithCheckAuthorization = withCheckAuthorization(Home);

  return (
    <HashRouter >
      <Routes>
        <Route path="/" element={<PageHomeWithCheckAuthorization/>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};
