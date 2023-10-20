import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import * as Page from "../../pages";

interface IProps {}

export const Router: FC<IProps> = (): JSX.Element => {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Page.Home />} />
        <Route path="/sign-in" element={<Page.SignIn />} />
        <Route path="/sign-up" element={<Page.SignUp />} />
        <Route path="*" element={<Page.NotFound />} />
      </Routes>
    </HashRouter>
  );
};
