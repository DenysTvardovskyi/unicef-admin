import { useDispatch } from "react-redux";
import { useStore } from "./useStore";
import { RST_AUTHORIZATION, SET_AUTHORIZATION, SET_USER } from "../store/authorization/authorization.actions";
import { useLoader } from "./useLoader";
import { IUser } from "../models";
import { JWT } from "../utils";

type TUseAuthorization = () => {
  isAuthorized: boolean;
  accessToken: string;
  user: IUser;
  setAuthorization: (token: string, type?: string, user?: IUser) => void;
  resetAuthorization: () => void;
  setUser: (user: IUser) => void;
};

export const useAuthorization: TUseAuthorization = () => {
  const loader = useLoader();
  const dispatch = useDispatch();
  const { accessToken, user } = useStore((store) => store.authorization);

  const { isValid, isActive } = JWT.parseAndValidateToken(accessToken);

  const setAuthorization = (token: string, user: IUser | undefined): void => {
    dispatch({ type: SET_AUTHORIZATION, accessToken: token, user: user });
  };

  const setUser = (user: IUser | undefined): void => {
    dispatch({ type: SET_USER, user: user });
  };

  const resetAuthorization = (): void => {
    const logout = loader.create("Processing logout...");
    logout.start();

    const ref = setTimeout(() => {
      dispatch({ type: RST_AUTHORIZATION });
      logout.stop();
      clearTimeout(ref);
    }, 1000);
  };

  return {
    isAuthorized: isValid() && isActive(),
    accessToken,
    user,
    setAuthorization,
    setUser,
    resetAuthorization,
  };
};
