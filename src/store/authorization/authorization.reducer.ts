import { IUser } from "../../models";
import { RST_AUTHORIZATION, SET_AUTHORIZATION, SET_USER } from "./authorization.actions";

export interface IState {
  readonly accessToken: string;
  readonly user: IUser;
}

export type TReducer = (state: IState, action: any) => IState;

const initialState: IState = {
  accessToken: "",
  user: {
    id: 0,
    lastName: "",
    name: "",
    email: "",
    role: null,
    region: {
      name: ""
    }
  },
};

export const authorizationReducer: TReducer = (state: IState = initialState, action: any): IState => {
  switch (action.type) {
    case SET_AUTHORIZATION:
      return {
        accessToken: action.accessToken,
        user: action.user,
      };

    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case RST_AUTHORIZATION:
      return { ...initialState };
    default:
      return state;
  }
};
