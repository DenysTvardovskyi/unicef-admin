import { useDispatch } from "react-redux";
import { useStore } from "./useStore";
import { RST_AUTHORIZATION, SET_AUTHORIZATION } from "../store/authorization/authorization.actions";
import { useLoader } from "./useLoader";
import { IUser } from "../models";
import { JWT } from "../utils";

type TUseAuthorization = () => {
  isAuthorized: boolean;
  accessToken: string;
  tokenType: string;
  user: IUser;
  setAuthorization: (token: string, type?: string, user?: IUser) => void;
  resetAuthorization: () => void;
};

export const useAuthorization: TUseAuthorization = () => {
  const loader = useLoader();
  const dispatch = useDispatch();
  const { accessToken, tokenType, user } = useStore((store) => store.authorization);

  const { isValid, isActive } = JWT.parseAndValidateToken(accessToken);

  const setAuthorization = (token: string, type: string = "Bearer", user: IUser | undefined): void => {
    dispatch({ type: SET_AUTHORIZATION, accessToken: token, tokenType: type, user: user });
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
    tokenType,
    user,
    setAuthorization,
    resetAuthorization,
  };
};
