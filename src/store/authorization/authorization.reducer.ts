import { IUser } from "../../models";
import { RST_AUTHORIZATION, SET_AUTHORIZATION } from "./authorization.actions";

export interface IState {
  readonly accessToken: string;
  readonly tokenType: string;
  readonly user: IUser;
}

export type TReducer = (state: IState, action: any) => IState;

const initialState: IState = {
  accessToken: "",
  tokenType: "",
  user: {
    id: 0,
    lastname: "",
    firstname: "",
    email: "",
    username: "",
  },
};

export const authorizationReducer: TReducer = (state: IState = initialState, action: any): IState => {
  switch (action.type) {
    case SET_AUTHORIZATION:
      return {
        accessToken: action.accessToken,
        tokenType: action.tokenType,
        user: action.user,
      };
    case RST_AUTHORIZATION:
      return { ...initialState };
    default:
      return state;
  }
};
