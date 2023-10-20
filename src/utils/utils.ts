import {IUser} from "../models";

export const getInitials = (user: IUser) => user.name.slice(0, 1) + user.lastName.slice(0, 1)